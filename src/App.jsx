import './index.css'
import { useState, useEffect } from 'react'
import DarkModeToggle from './components/DarkModeToggle'
import SignOutButton from './components/SignOutButton'
import { UserAuth } from './contexts/AuthContext'
import Notes from './components/Notes'
import NoteModal from './components/NoteModal'
import AddButton from './components/AddButton'
import { supabase } from '.././supabaseClient'

const App = () => {
  const {session} = UserAuth()
  const user = session?.user

  const [notes, setNotes] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [editingNote, setEditingNote] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    fetchNotes()
  }, [])

  useEffect(() => {
    const handleKeyPress = (event) => {
      const isTyping = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA';

      if (event.code === 'KeyN' && !isTyping) {
        event.preventDefault(); // stop it from affecting next focused element
        openModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  const convertTime = (time) => {
    const options = {
      hour: '2-digit',
      minute: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour12: false 
    };
    const theTime = new Date(time)
    return theTime.toLocaleTimeString('default', options)
  } 

  const fetchNotes = async () => {
    if (!user?.id) return
    const { data, error } = await supabase
      .from('note')
      .select('*')
      .eq('user_id', user.id)
      .order('timestamp', { ascending: false })

    if (!error) setNotes(data)
  }

  const openModal = (note = null) => {
    if (note) {
      setEditingNote(note)
      setTitle(note.title)
      setContent(note.content)
    } else {
      setEditingNote(null)
      setTitle('')
      setContent('')
    }
    setIsModalOpen(true)
    console.log(isModalOpen)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setTitle('')
    setContent('')
    setEditingNote(null)
  }

  const handleSubmit = async () => {
    if (!title || !content) return

    if (editingNote) {
      await supabase
        .from('note')
        .update({ title, content })
        .eq('id', editingNote.id)
        .eq('user_id', user.id)
    } else {
      await supabase.from('note').insert([
        {
          title,
          content,
          user_id: user.id,
        },
      ])
    }

    closeModal()
    fetchNotes()
  }

  const handleDelete = async (id) => {
    await supabase.from('note').delete().eq('id', id).eq('user_id', user.id)
    fetchNotes()
  }

  return (
    <div className="
      flex flex-col items-center min-h-svh w-full overflow-auto
     bg-white dark:bg-neutral-900 transition-all duration-150 
     text-black dark:text-white"
    >
      <div className='py-5 gap-3 items-center w-full flex max-w-4xl justify-between flex-wrap px-2'>
        <p className='text-black dark:text-white font-bold text-2xl tracking-widest'>note
          <span className='text-greenbase dark:text-greenlight'>5</span>
          </p>
        <div className='flex gap-2 items-center'>
          <AddButton openModal={openModal}/>
          <SignOutButton />
          <DarkModeToggle />
        </div>
      </div>
      <div className='flex w-full max-w-4xl'> 
        <Notes notes={notes} openModal={openModal} handleDelete={handleDelete} convertTime={convertTime}/>
      </div>
      {isModalOpen && 
        <NoteModal closeModal={closeModal} title={title} setTitle={setTitle} content={content} setContent={setContent} editingNote={editingNote} handleSubmit={handleSubmit}/>
      }
    </div>
  )
}

export default App