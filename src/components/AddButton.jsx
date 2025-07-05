import { Plus } from 'lucide-react'

const AddButton = ({openModal}) => {
  return ( 
    <button
      onClick={() => openModal()}
      className="
        text-greendarkest dark:text-greenlightest font-bold transition-all duration-150
        flex items-center gap-1 px-4 bg-greenlightest hover:bg-greenlight h-10
        dark:bg-greendarkest dark:hover:bg-greendark rounded-lg justify-center text-sm"
    >
      NEW <Plus className="size-4" strokeWidth={3}/>
    </button>
  )
}

export default AddButton;