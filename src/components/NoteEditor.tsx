
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Note } from './NoteCard';
import { X, Save, Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NoteEditorProps {
  note: Note | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (note: Note) => void;
}

const folderColors = [
  { value: 'ghibli-green', label: 'Green' },
  { value: 'ghibli-blue', label: 'Blue' },
  { value: 'ghibli-peach', label: 'Peach' },
  { value: 'ghibli-purple', label: 'Purple' },
  { value: 'ghibli-tan', label: 'Tan' },
  { value: 'ghibli-brown', label: 'Brown' },
];

const NoteEditor: React.FC<NoteEditorProps> = ({ note, isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [folderColor, setFolderColor] = useState('ghibli-green');
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setFolderColor(note.folderColor);
      setFavorite(note.favorite || false);
    } else {
      setTitle('');
      setContent('');
      setFolderColor('ghibli-green');
      setFavorite(false);
    }
  }, [note]);

  const handleSave = () => {
    if (!title.trim()) return;
    
    const updatedNote: Note = {
      id: note?.id || crypto.randomUUID(),
      title,
      content,
      folderColor,
      createdAt: note?.createdAt || new Date().toISOString(),
      favorite,
    };
    
    onSave(updatedNote);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{note ? 'Edit Note' : 'New Note'}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 pt-4">
          <div className="flex items-center gap-4">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Note title"
              className="text-lg font-medium"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setFavorite(!favorite)}
              className={cn(favorite && 'text-amber-500')}
            >
              <Star className={cn('h-5 w-5', favorite && 'fill-amber-500')} />
            </Button>
          </div>
          
          <div>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              className="min-h-[200px] resize-none"
            />
          </div>
          
          <div>
            <Select value={folderColor} onValueChange={setFolderColor}>
              <SelectTrigger>
                <SelectValue placeholder="Select a color" />
              </SelectTrigger>
              <SelectContent>
                {folderColors.map((color) => (
                  <SelectItem key={color.value} value={color.value}>
                    <div className="flex items-center">
                      <div 
                        className={`w-4 h-4 rounded-full mr-2`}
                        style={{ backgroundColor: `var(--${color.value.replace('ghibli-', '')})` }}
                      />
                      {color.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" /> Cancel
          </Button>
          <Button onClick={handleSave}>
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default NoteEditor;
