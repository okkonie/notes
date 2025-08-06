import './index.css'
import { useState, useEffect, use } from 'react'
import DarkModeToggle from './components/DarkModeToggle'
import SignOutButton from './components/SignOutButton'
import { UserAuth } from './contexts/AuthContext'
import Notes from './components/Notes'
import NoteModal from './components/NoteModal'
import AddButton from './components/AddButton'
import { supabase } from '.././supabaseClient'
import { Search } from 'lucide-react'

const App = () => {

  const {session} = UserAuth()
  const user = session?.user

  const [notes, setNotes] = useState([])
  const [filteredNotes, setFilteredNotes] = useState([])
  const [title, setTitle] = useState('')
  const [search, setSearch] = useState('')
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

useEffect(() => {
  const filteredNotes = notes.filter(note => {
    if (!search) return true
    const lowerSearch = search.toLowerCase()
    return (
      note.title.toLowerCase().includes(lowerSearch) ||
      note.content.toLowerCase().includes(lowerSearch)
    )
  })
  setFilteredNotes(filteredNotes)
}, [search, notes])

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
      bg-background text-text transition-all duration-150"
    >
      <div className='py-5 gap-3 items-center w-full flex max-w-5xl justify-between flex-wrap px-2 h-[10svh] min-h-20'>
        <p className='font-bold text-2xl tracking-widest font-outfit'>NOTE
          <span className='text-accent'>5</span>
          </p>
        <div className='flex gap-2 items-center'>
          <SignOutButton />
          <DarkModeToggle />
        </div>
      </div>

      <div className='py-5 items-center justify-center flex w-full max-w-5xl h-[10svh] min-h-20 gap-3'>
        <div className='w-[75%] max-w-lg h-10 border border-border rounded-full flex items-center p-3 relative'>
          <Search size={16}/>
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className='absolute left-0 right-0 top-0 bottom-0 pl-10 bg-transparent rounded-full' />
        </div>
        <AddButton openModal={openModal} />
      </div>

      <div className='flex w-full max-w-5xl'> 
        <Notes notes={filteredNotes} openModal={openModal} handleDelete={handleDelete} convertTime={convertTime}/>
      </div>
      {isModalOpen && 
        <NoteModal closeModal={closeModal} title={title} setTitle={setTitle} content={content} setContent={setContent} editingNote={editingNote} handleSubmit={handleSubmit}/>
      }
    </div>
  )
}

export default App