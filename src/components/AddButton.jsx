import { Plus } from 'lucide-react'

const AddButton = ({openModal}) => {
  return ( 
    <button
      onClick={() => openModal()}
      className="
        font-bold tracking-widest transition-all duration-150 bg-accent text-background hover:opacity-80
        flex items-center gap-1 px-4 h-9 font-outfit rounded-lg justify-center text-sm"
    >
      NEW <Plus className="size-4" strokeWidth={3}/>
    </button>
  )
}

export default AddButton;