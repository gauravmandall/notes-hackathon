
import React from 'react';
import { cn } from '@/lib/utils';
import NoteCard, { Note } from './NoteCard';

interface NotesGridProps {
  notes: Note[];
  onNoteClick: (note: Note) => void;
  className?: string;
}

const NotesGrid: React.FC<NotesGridProps> = ({ notes, onNoteClick, className }) => {
  if (notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <img src="/images/leaf.svg" alt="No Notes" className="w-16 h-16 mb-4 opacity-50" />
        <h3 className="text-lg font-medium">No notes found</h3>
        <p className="text-muted-foreground">Create your first note by clicking the leaf button.</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4', className)}>
      {notes.map((note) => (
        <NoteCard
          key={note.id}
          note={note}
          onClick={() => onNoteClick(note)}
        />
      ))}
    </div>
  );
};

export default NotesGrid;
