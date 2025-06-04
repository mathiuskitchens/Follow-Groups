import { HistorySkeleton } from './Skeletons';
import { useSupabase } from '../context/SupabaseContext';
import { useEffect, useState } from 'react';

const Profile = () => {
  const supabase = useSupabase();
  const [groupData, setGroupData] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [id, setId] = useState(0);

  async function getUser(id) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', id);
    return data[0];
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
        const { data } = session;
        setId(data.session.user.id);
        const userInfo = await getUser(data.session.user.id);
        setName(userInfo.name);
        console.log(userInfo);
      } else {
        console.log('no session');
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchAllGroups();
    fetchUserInfo();
  }, []);

  return (
    <>
      <h1 className="flex justify-center my-4 text-xl">Profile</h1>

      <div className="flex justify-center mx-auto avatar">
        <div className="w-48 rounded-xl">
          <img src="https://media.licdn.com/dms/image/v2/D5603AQG1BitDgYpEeQ/profile-displayphoto-shrink_800_800/B56ZUNOmfIGoAk-/0/1739683686739?e=1754524800&v=beta&t=1LxsuojSYN33Yvx3H2ffdn-HIqEoArxFuaMF9IQKLm8" />
        </div>
      </div>
      <h3 className='m-6 text-center'>Total Prayers: 12</h3>
      <h3 className='m-6 text-center'>Groups: 2</h3>

    </>
  );
};

export default Profile;
