import { UserAuth } from "../contexts/AuthContext"
import { LogOut } from 'lucide-react'
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {

  const { session, signOut } = UserAuth();
  const navigate = useNavigate();

  const handleSingOut = async (e) => {
    e.preventDefault()
    try {
      await signOut()
      navigate('/auth')
    } catch (error) {
      console.error(error)
    }
  }

  return(
    <button
      onClick={handleSingOut}
      className="
        size-10 flex items-center justify-center rounded-md border 
        bg-bg border-blackt dark:bg-dbg dark:border-whitet
        transition-colors duraiton-150
      "
    >
      <LogOut className='size-5 dark:text-white text-black'/>
    </button>
  )
}

export default SignOutButton