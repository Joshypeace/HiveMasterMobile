import { RelatedEntity } from "./finances";

// /src/types/notes.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  type: NoteType;
  relatedEntity?: RelatedEntity;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  authorId: string;
  authorName: string;
}

export type NoteType = 
  | 'general' 
  | 'inspection' 
  | 'harvest' 
  | 'maintenance' 
  | 'health_check' 
  | 'weather' 
  | 'other';

export interface NoteFormData {
  title: string;
  content: string;
  type: NoteType;
  relatedEntity?: RelatedEntity;
  tags: string[];
}

export interface NoteStats {
  totalNotes: number;
  notesByType: NotesByType[];
  recentNotes: Note[];
}

export interface NotesByType {
  type: NoteType;
  count: number;
}