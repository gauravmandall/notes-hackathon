
import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bookmark } from 'lucide-react';

export interface Note {
  id: string;
  title: string;
  content: string;
  folderColor: string;
  createdAt: string;
  favorite?: boolean;
}

interface NoteCardProps {
  note: Note;
  onClick: () => void;
  className?: string;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, onClick, className }) => {
  const { title, content, folderColor, createdAt, favorite } = note;
  
  return (
    <Card 
      onClick={onClick}
      className={cn(
        'note-card cursor-pointer overflow-hidden',
        `border-${folderColor}/60`,
        className
      )}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-medium line-clamp-1">{title}</CardTitle>
          {favorite && <Bookmark className="h-5 w-5 text-amber-500 fill-amber-500" />}
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <p className="text-sm text-muted-foreground line-clamp-3">{content}</p>
      </CardContent>
      <CardFooter className="pt-2 text-xs text-muted-foreground">
        {new Date(createdAt).toLocaleDateString()}
      </CardFooter>
    </Card>
  );
};

export default NoteCard;
