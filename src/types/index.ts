export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  synced: boolean;
}

export interface SyncQueueItem {
  id?: number;
  action: 'create' | 'update' | 'delete';
  noteId: string;
  data?: Partial<Note>;
}