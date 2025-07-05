import { Edit, Trash } from 'lucide-react'

const Notes = ({notes, openModal, handleDelete, convertTime}) => {
  return (
    <div  className='flex flex-col w-full'>
      <div className="mt-12 columns-1 sm:columns-2 gap-3 mx-2">
        {notes.map((note) => (
          <div key={note.id} className="mb-3 rounded-md justify-between flex flex-col overflow-hidden bg-white dark:bg-neutral-900 border-2 border-border dark:border-dborder">
            <div>
              <h3 className="text-lg font-bold pt-4 px-4">{note.title}</h3>
              <p className="text-gray-700 dark:text-gray-300 p-4 whitespace-normal break-words">{note.content}</p>
            </div>
            <div className="text-sm mt-2 flex justify-between bg-border dark:bg-dborder items-center">
              <p className='opacity-70 text-xs font-medium pl-4'>{convertTime(note.timestamp)}</p>
              <div className='flex'>
                <button
                  onClick={() => openModal(note)}
                  className="opacity-70 hover:opacity-100 py-4 pl-4 pr-2"
                >
                  <Edit size={16}/>
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="opacity-70 hover:opacity-100 p-4"
                >
                  <Trash size={16}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notes
