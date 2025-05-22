import axios from 'axios';
import db from '../db/db';
import type { SyncQueueItem } from '../types';

const API_URL = 'http://localhost:3001/notes';

export const syncNotes = async (): Promise<void> => {
  const queue: SyncQueueItem[] = await db.syncQueue.toArray();
  for (const item of queue) {
    try {
      if (item.action === 'create' && item.data) {
        await axios.post(API_URL, item.data);
        await db.notes.update(item.noteId, { synced: true });
      } else if (item.action === 'update' && item.data) {
        await axios.put(`${API_URL}/${item.noteId}`, item.data);
        await db.notes.update(item.noteId, { synced: true });
      } else if (item.action === 'delete') {
        await axios.delete(`${API_URL}/${item.noteId}`);
      }
      await db.syncQueue.delete(item.id!);
    } catch (error) {
      console.error('Sync error:', error);
    }
  }
};