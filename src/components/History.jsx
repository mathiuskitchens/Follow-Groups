import { HistorySkeleton } from "./Skeletons"
import { useSupabase } from "../context/SupabaseContext"
import { useEffect, useState } from "react";

const History = () => {

  const supabase = useSupabase();
  const [groupData, setGroupData] = useState('')


  const fetchAllGroups = async () => {
    try {
      const {data, error} = await supabase 
        .from('Groups')
        .select('*')
                console.log(data[0]?.group_name)
                setGroupData(data[0]?.group_name)
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
    <>
    <h1>{}</h1>
    <HistorySkeleton />
    </>
  )
}

export default History