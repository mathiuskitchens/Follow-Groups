import { HomeSkeleton } from './Skeletons';
import { useEffect, useState } from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useSupabase } from '../context/SupabaseContext';
import { getGroupsForUser, getPrayersByGroupId } from '../services/supabase';
import PrayerCard from './PrayerCard';

const Home = () => {
  const supabase = useSupabase();
  const [session, setSession] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPrayerGroupInfo, setCurrentPrayerGroupInfo] = useState({
    name: '',
    id: '',
  });
  const [currentPrayersList, setCurrentPrayersList] = useState([]);
  const [myGroups, setMyGroups] = useState([{}]);
  const [currentScreen, setCurrentScreen] = useState('Home');

  const fetchAllGroups = async () => {
    console.log('Current userId before fetching groups:', userId);
    const response = await getGroupsForUser(userId);
    console.log('Full response from getGroupsForUser:', response);

    if (response.error) {
      console.log('Error fetching groups:', response.error);
    } else {
      console.log('Groups data received:', response.data);
      setMyGroups(response.data);
    }
  };

  useEffect(() => {
    console.log('Supabase from HOME', supabase);

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        console.log(session);
        setSession(session);
        setUserId(session.user.id);
        setLoading(false);
        console.log('loading:', loading, 'session: ', session);
      } else {
        console.log('no session');
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (userId) {
      fetchAllGroups();
    }
  }, [userId]);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchPrayersForList = async (groupId) => {
    const result = await getPrayersByGroupId(groupId);
    console.log(result);
    setCurrentPrayersList(result.data);
  };

  if (loading) {
    return <HomeSkeleton />;
  }

  if (!session) {
    return <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />;
  }

  if (currentScreen == 'Home') {
    return (
      <>
        <h1 className="flex justify-center my-4 text-xl">My Prayer Groups</h1>
        <ul className="">
          {myGroups.map((g) => (
            <button
              onClick={() => {
                setCurrentPrayerGroupInfo({
                  name: g.group_name,
                  id: g.group_id,
                });
                fetchPrayersForList(g.group_id);
                setCurrentScreen('Prayers');
                // document.getElementById('my_modal_1').showModal()
              }}
              key={g.group_id}
              className="w-5/6 p-4 mx-8 my-2 text-lg rounded-lg bg-base-200 hover:bg-base-300"
            >
              <h1>{g.group_name}</h1>
            </button>
          ))}
        </ul>

        {/* <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">{currentPrayerGroupInfo.name}</h3>
          <p className="py-4">Group ID: {currentPrayerGroupInfo.id}</p>
          <div className="modal-action">
            <form method="dialog">
          
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    
   */}
      </>
    );
  }
  if (currentScreen == 'Prayers') {
    return (
      <>
        <div className="m-4 text-sm breadcrumbs">
          <ul>
            <li>
              <a onClick={()=>setCurrentScreen("Home")}>Groups</a>
            </li>
            <li>
              <a>{currentPrayerGroupInfo.name}</a>
            </li>
          </ul>
        </div>
        <ul className="m-2 mb-20">
          {currentPrayersList.map((p) => (
            <PrayerCard key={p.id} prayer={p} />
          ))}
        </ul>
      </>
    );
  }
};

export default Home;
