import './index.css'
import DarkModeToggle from './components/DarkModeToggle'
import { useState } from 'react'
import { UserAuth } from './contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLogin, setIsLogin] = useState(true)
  const [visible, setVisible] = useState(true)

  const { session, signUpNewUser, logIn } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await signUpNewUser(email, password)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.error || 'Signup failed. Please try again.')
      }
    } catch (error) {
      setError(error.message || 'An unexpected error occurred during signup.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogIn = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await logIn(email, password)
      if (result.success) {
        navigate('/')
      } else {
        setError(result.error || 'Login failed. Please try again.')
      }
    } catch (error) {
      setError(error.message || 'An unexpected error occurred during login.')
    } finally {
      setLoading(false)
    }
  }

  const handleSwitch = () => {
    setVisible(false)
    setError('')
    setTimeout(() => {
      setIsLogin((prev) => !prev)
      setVisible(true)
    }, 150) 
  }

  return (
    <div className="flex justify-center items-center min-h-svh w-full overflow-auto bg-background transition-all duration-150">
      <div className='gap-2 w-full flex flex-col max-w-2xl items-end p-2 relative'>
        <DarkModeToggle />
        <div
          className={`
            w-full p-10 rounded-lg 
            transition-opacity duration-300 border border-border dark:border-dborder
            ${visible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
          }
        >
          <form onSubmit={isLogin ? handleLogIn : handleSignUp}>
            <div className='flex flex-col'>
              <input 
                placeholder="email" 
                className='p-2 mt-4 rounded text-sm bg-transparent border-border 
                border dark:border-dborder text-black placeholder:text-black/60 
                dark:placeholder:text-white/60 dark:text-white font-outfit'
                type="email" 
                onChange={(e) => setEmail(e.target.value)}
              />

              <input 
                placeholder="password" 
                className='p-2 mt-4 rounded text-sm bg-transparent border-border 
                border dark:border-dborder text-black placeholder:text-black/60 
                dark:placeholder:text-white/60 dark:text-white font-outfit'
                type="password"
                onChange={(e) => setPassword(e.target.value)} 
              />

              <button 
                type="submit" 
                disabled={loading} 
                className='p-2 mt-8 w-full transition-all duration-150
                bg-greenlightest hover:bg-greenlight dark:bg-greendark dark:hover:bg-greendarkest 
                rounded text-greendarkest dark:text-greenlight font-semibold font-outfit'
              >
                {loading ? (isLogin ? 'Logging in...' : 'Signing up...') : (isLogin ? 'LOG IN' : 'SIGN UP')}
              </button>

            </div>
          </form>
          <p className='text-black dark:text-white text-center py-4 font-normal font-outfit'>
            {isLogin ? 'Dont have an account? ' : 'Already have an account? '}
            <button onClick={handleSwitch} className='text-greendark hover:text-greendarkest dark:text-greenlight dark:hover:text-greenlightest'>
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
          {error && 
            <p className='bg-red-500 rounded text-white font-normal absolute bottom-5 right-5 py-1 px-3 text-sm text-center'>{error}</p>
          }
        </div>
      </div>
    </div>
  )
}

export default Auth