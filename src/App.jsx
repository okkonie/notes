import './index.css'
import DarkModeToggle from './components/DarkModeToggle'

const App = () => {
  return (
    <div className="min-h-svh w-full overflow-auto bg-slate-300 dark:bg-slate-900">
      <DarkModeToggle />
    </div>
  )
}

export default App