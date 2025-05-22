import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import debounce from 'lodash.debounce';
import db from './db/db';
import { syncNotes } from './api/api';
import NoteList from './components/NoteList';
import SyncStatus from './components/SyncStatus';
import SearchBar from './components/SearchBar';
import './App.css';
import type { Note } from './types/index';
import NoteEditor from './components/NoteEditore';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [searchQuery, setSearchQuery] = useState<string>('');


  useEffect(() => {
    db.notes.toArray().then(setNotes);
  }, []);


  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncNotes();
    };
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);


  const createNote = async (): Promise<void> => {
    const newNote: Note = {
      id: uuidv4(),
      title: 'New Note',
      content: '',
      updatedAt: new Date().toISOString(),
      synced: false,
    };
    await db.notes.add(newNote);
    await db.syncQueue.add({ action: 'create', noteId: newNote.id, data: newNote });
    setNotes([...notes, newNote]);
    setSelectedNote(newNote);
  };


  const updateNote = debounce(async (id: string, updates: Partial<Note>): Promise<void> => {
    const updatedNote: Partial<Note> = { ...updates, updatedAt: new Date().toISOString(), synced: false };
    await db.notes.update(id, updatedNote);
    await db.syncQueue.add({ action: 'update', noteId: id, data: updatedNote });
    setNotes(notes.map(note => (note.id === id ? { ...note, ...updatedNote } : note)));
    if (isOnline) syncNotes();
  }, 500);


  const deleteNote = async (id: string): Promise<void> => {
    await db.notes.delete(id);
    await db.syncQueue.add({ action: 'delete', noteId: id });
    setNotes(notes.filter(note => note.id !== id));
    if (selectedNote?.id === id) setSelectedNote(null);
    if (isOnline) syncNotes();
  };


  const filteredNotes: Note[] = notes.filter(note =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app">
      <header>
        <h1>Notes App</h1>
        <SyncStatus isOnline={isOnline} />
        <SearchBar onSearch={setSearchQuery} />
      </header>
      <main>
        <NoteList notes={filteredNotes} onSelect={setSelectedNote} onDelete={deleteNote} />
        <NoteEditor note={selectedNote} onSave={updateNote} onCreate={createNote} />
      </main>
    </div>
  );
}

export default App;