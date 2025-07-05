import React, { useRef, useEffect } from 'react';
import { X } from 'lucide-react';

const NoteModal = ({ closeModal, title, setTitle, content, setContent, editingNote, handleSubmit }) => {
  const titleRef = useRef(null);
  const contentRef = useRef(null);

  // Autofocus title input on mount
  useEffect(() => {
    titleRef.current?.focus();
  }, []);

  // Global Escape key handler to close modal
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [closeModal]);

  // Navigate down to textarea from title input
  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      contentRef.current?.focus();
    }
  };

  // Navigate up to title input from textarea
  const handleKeyUp = (e) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      titleRef.current?.focus();
    }

    // Ctrl + Enter submits from textarea
    if (e.ctrlKey && e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-neutral-900 mx-2 flex flex-col rounded-lg shadow-md p-6 w-full max-w-md relative">
        <button onClick={closeModal} className="absolute top-3 right-3 text-gray-400 hover:text-gray-600">
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {editingNote ? 'Edit Note' : 'New Note'}
        </h2>
        <input
          ref={titleRef}
          onKeyDown={handleKeyDown}
          className='p-2 mt-4 rounded text-sm bg-white dark:bg-neutral-900 border-black/30 
            border dark:border-white/20 text-black placeholder:text-black/60 
            dark:placeholder:text-white/60 dark:text-white'
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          ref={contentRef}
          onKeyUp={handleKeyUp}
          className='p-2 mt-4 rounded text-sm bg-white dark:bg-neutral-900 border-black/30 
            border dark:border-white/20 text-black placeholder:text-black/60 
            dark:placeholder:text-white/60 dark:text-white'
          placeholder="content"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="text-greendarkest dark:text-greenlightest font-bold mt-8 transition-all duration-150
            flex items-center gap-1 px-4 py-2 bg-greenlight hover:bg-greenlightest
            dark:bg-greendark dark:hover:bg-greendarkest rounded justify-center text-sm"
        >
          {editingNote ? 'Update Note' : 'Add Note'}
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
