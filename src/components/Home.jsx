import { HomeSkeleton } from "./Skeletons"
import { useEffect, useState } from "react"
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { useSupabase } from "../context/SupabaseContext"

const Home = () => {

  const supabase = useSupabase();
  const [session, setSession] = useState(null)
  const [userId, setUserId] = useState(null)
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(true);

  const fetchAllGroups = async () => {
    try {
      const {data, error} = await supabase 
        .from('Prayers')
        .select('*')
                console.log(data)
    } catch(e) {
      console.log(e)
    } finally {
      console.log("DONE")
    }
  }


  useEffect(() => {
      console.log("Supabase from HOME", supabase)

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUserId(session.user.id)
      setEmail(session.user.user_metadata.email)
      setLoading(false)
    })

    fetchAllGroups()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (!session && !loading) {
    return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />)
  }
  else {
    return (
      <>
      <h1 className="flex justify-center my-4 text-xl">Hello {email}!</h1>
      <HomeSkeleton />
      </>
    )
  }



}

export default Home