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
    <a className="text-xl btn btn-ghost">{groupName ? groupName : 'Follow Group'}</a>
  </div>
</div>
  )
}

export default TopNav