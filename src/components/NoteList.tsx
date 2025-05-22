import type { Note } from "../types";

interface NoteListProps {
  notes: Note[];
  onSelect: (note: Note) => void;
  onDelete: (id: string) => void;
}

function NoteList({ notes, onSelect, onDelete }: NoteListProps) {
  return (
    <div className="note-list">
      {notes.map(note => (
        <div key={note.id} className="note-item">
          <h3 onClick={() => onSelect(note)}>{note.title}</h3>
          <p>{new Date(note.updatedAt).toLocaleString()}</p>
          <p>{note.synced ? 'Synced' : 'Unsynced'}</p>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default NoteList;