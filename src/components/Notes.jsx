import { Edit, Trash } from 'lucide-react'

const Notes = ({notes, openModal, handleDelete, convertTime}) => {
  return (
    <div  className='flex flex-col w-full pb-10'>
      <div className="mt-8 columns-1 sm:columns-2 gap-3 mx-2">
        {notes.map((note) => (
          <div key={note.id} className="mb-3 rounded-md justify-between flex flex-col overflow-hidden bg-card/70 border-2 border-card text-text">
            <div>
              <h3 className="text-lg font-medium font-outfit pt-4 px-4">{note.title}</h3>
              <p className="p-4 font-normal font-outfit whitespace-pre-wrap break-words">{note.content}</p>
            </div>
            <div className="text-sm mt-2 flex justify-end items-center">
              <p className='text/70 text-xs font-normal font-outfit pr-4'>{convertTime(note.timestamp)}</p>
              <div className='flex'>
                <button
                  onClick={() => openModal(note)}
                  className="text-text/70 hover:text-text transition-all duration-150 py-4 pl-4 pr-2"
                >
                  <Edit size={16}/>
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="text-text/70 hover:text-text transition-all duration-150 p-4"
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
