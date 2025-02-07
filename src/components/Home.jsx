import { HomeSkeleton } from './Skeletons';
import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSupabase } from '../context/SupabaseContext';

const Home = () => {
  const supabase = useSupabase();
  const [session, setSession] = useState(null);
  const [userId, setUserId] = useState(null);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(true);
  const [myPrayers, setMyPrayers] = useState([{}]);

  const fetchAllGroups = async () => {
    try {
      const { data, error } = await supabase.from('Prayers').select('*');
      console.log(data);
      if (error) {
        console.error('Error fetching prayers:', error)
      } else {
        setMyPrayers(data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      console.log('DONE');
    }
  };

  useEffect(() => {
    console.log('Supabase from HOME', supabase);

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log(session);
        setSession(session);
        setUserId(session.user.id);
        setEmail(session.user.user_metadata.email);
        setLoading(false);
        console.log('loading:', loading, 'session: ', session);
      } else {
        console.log('no session');
      }
    });

    fetchAllGroups();
    console.log("myPrayers", myPrayers)

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session && !loading) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  } else {
    return (
      <>
        <h1 className="flex justify-center my-4 text-xl">Hello {email}!</h1>
        {loading ? (
         <HomeSkeleton /> ) : 
          (
            <ul className=''>
              {myPrayers.map((p) => (
                <li key={p.id} className='mx-4 rounded-lg text-md bg-base-200'>
                  <p>{p.date}</p>
                  
                  <p style={{ textDecoration: p.answered ? 'line-through' : 'none'}}>{p.prayer_text}</p>
                  <input 
                  type='checkbox'
                  checked={p.answered}
                  onChange={() => console.log(p.answered)}
                  />
                </li>
              ))}
            </ul>
          )
         }
      </>
    );
  }
};

export default Home;
