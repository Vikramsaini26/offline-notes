import Dexie from 'dexie'

class NotesDatabase extends Dexie {
  notes!: any;
  syncQueue!: any

  constructor() {
    super('NotesApp');
    this.version(1).stores({
      notes: 'id, title, content, updatedAt, synced',
      syncQueue: '++id, action, noteId, data',
    });
  }
}

const db = new NotesDatabase();
export default db;