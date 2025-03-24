import { useEffect, useState } from "react";
import { useSupabase } from "../context/SupabaseContext"

const TopNav = () => {

const supabase = useSupabase();
const [groupName, setGroupName] = useState("")

const fetchAllGroups = async () => {
  try {
    const {data, error} = await supabase 
      .from('Groups')
      .select('*')
              console.log("TopNav", data[0].group_name)
              setGroupName(data[0].group_name)
  } catch(e) {
    console.log(e)
  } finally {
    console.log("DONE")
  }
}

useEffect(() => {
  fetchAllGroups()
}, [])

  return (
<div className="rounded-b-2xl navbar bg-base-200">
  <div className="flex-1">
    <a className="text-xl btn btn-ghost">{'Follow Group'}</a>
  </div>
  <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
        <li>
          <a className="justify-between">
            Profile
            <span className="badge">New</span>
          </a>
        </li>
        <li><a>Settings</a></li>
        <li
          onClick={async () => {
            await supabase.auth.signOut()
          }}
        ><a>Logout</a></li>
      </ul>
    </div>
</div>
  )
}

export default TopNav