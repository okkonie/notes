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
    <div className="flex gap-2 h-10 p-1 items-center rounded-lg ring-1 ring-border dark:ring-dborder">
      <p className="text-sm font-medium px-3">{session?.user?.email}</p>
      <button
        onClick={handleSingOut}
        className="
          size-8 flex items-center justify-center rounded-md group
          transition-colors duraiton-150 hover:bg-red-700/20 dark:hover:bg-red-400/15
        "
      >
        <LogOut className='size-5 text-red-700 dark:text-red-400'/>
      </button>
    </div>
  )
}

export default SignOutButton