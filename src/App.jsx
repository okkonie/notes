import './index.css'
import DarkModeToggle from './components/DarkModeToggle'
import SignOutButton from './components/SignOutButton'
import { UserAuth } from './contexts/AuthContext'

const App = () => {
  const { session } = UserAuth();

  return (
    <div className="flex justify-center min-h-svh w-full overflow-auto bg-bg dark:bg-dbg transition-all duration-150 text-black dark:text-white">
      <div className='h-20 items-center w-full flex max-w-4xl justify-between'>
        <p className='text-black dark:text-white font-medium tracking-wide'>signed in as {session?.user?.email}</p>
        <div className='flex gap-2'>
          <DarkModeToggle />
          <SignOutButton />
        </div>
      </div>
      
    </div>
  )
}

export default App