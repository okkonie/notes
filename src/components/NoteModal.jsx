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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-background mx-2 flex flex-col rounded-lg shadow-md p-6 w-full max-w-md relative text-text border-2 border-border">
        <button onClick={closeModal} className="absolute top-3 right-3">
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {editingNote ? 'Edit Note' : 'New Note'}
        </h2>
        <input
          ref={titleRef}
          onKeyDown={handleKeyDown}
          className='p-2 mt-4 rounded text-sm border-border
            border bg-background placeholder:text-secondtext'
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          ref={contentRef}
          onKeyUp={handleKeyUp}
          className='p-2 mt-4 rounded text-sm border-border
            border bg-background placeholder:text-secondtext'
          placeholder="content"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          onClick={handleSubmit}
          className="bg-accent text-background font-bold mt-8 transition-all duration-150
            flex items-center gap-1 px-4 py-2 hover:opacity-80 rounded justify-center text-sm"
        >
          {editingNote ? 'Update Note' : 'Add Note'}
        </button>
      </div>
    </div>
  );
};

export default NoteModal;
