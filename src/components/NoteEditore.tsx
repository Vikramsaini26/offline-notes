import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import type { Note } from '../types';
interface NoteEditorProps {
  note: Note | null;
  onSave: (id: string, updates: Partial<Note>) => void;
  onCreate: () => void;
}

function NoteEditor({ note, onSave, onCreate }: NoteEditorProps) {
  const [title, setTitle] = useState<string>(note?.title || '');
  const [content, setContent] = useState<string>(note?.content || '');

  const handleSave = () => {
    if (!note) {
      onCreate();
    } else {
      onSave(note.id, { title, content });
    }
  };

  return (
    <div className="note-editor">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note Title"
        onBlur={handleSave}
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note in Markdown..."
        onBlur={handleSave}
      />
      <div className="preview">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default NoteEditor;