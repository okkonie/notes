import { Plus } from 'lucide-react'

const AddButton = ({openModal}) => {
  return ( 
    <button
      onClick={() => openModal()}
      className="
        font-bold tracking-widest transition-all duration-150 bg-accent text-background hover:opacity-80
        flex items-center gap-1 px-4 h-10 font-outfit rounded-full justify-center text-sm"
    >
      NEW
    </button>
  )
}

export default AddButton;