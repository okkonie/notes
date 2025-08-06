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
    <div className="flex gap-2 h-10 p-1 items-center rounded-lg border border-border">
      <p className="text-sm font-normal font-outfit px-3">{session?.user?.email}</p>
      <button
        onClick={handleSingOut}
        className="
          size-8 flex items-center justify-center rounded-md
          transition-colors duraiton-150 hover:bg-border/50
        "
      >
        <LogOut className='size-5 text-text'/>
      </button>
    </div>
  )
}

export default SignOutButton