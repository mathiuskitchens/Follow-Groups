import { HistorySkeleton } from './Skeletons';
import { useSupabase } from '../context/SupabaseContext';
import { useEffect, useState } from 'react';

const History = () => {
  const supabase = useSupabase();
  const [groupData, setGroupData] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(true);

  async function getUser(id) {
    const { data, error } = await supabase.from('profiles').select("*").eq("id", id)
    return data[0]
  }

  const fetchAllGroups = async () => {
    try {
      const { data, error } = await supabase.from('Groups').select('*');
      console.log(data[0]?.group_name);
      setGroupData(data[0]?.group_name);
    } catch (e) {
      console.log(e);
    } finally {
      console.log('DONE');
    }
  };

  async function fetchUserInfo() {
    try {
      const session = await supabase.auth.getSession();
    
      if (session) {
          const { data } = session
          setId(data.session.user.id)
          const userInfo = await getUser(data.session.user.id)
          setName(userInfo.name)
          console.log(userInfo)
        

      } else {
        console.log('no session');
      }
    } catch (e) {
      console.log(e)
    }
      setLoading(false);
    };
  

  useEffect(() => {
    fetchAllGroups()
    fetchUserInfo()
  }, []);

  return (
    <>
      <h1>{}</h1>
      {loading ? 
        <HistorySkeleton /> : 
        <>
        <h1 className="flex justify-center my-4 text-xl">Welcome back {name}</h1>
        <HistorySkeleton />
        </>
        }
    </>
  );
};

export default History;
