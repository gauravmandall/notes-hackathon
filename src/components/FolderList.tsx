
import React from 'react';
import { Button } from '@/components/ui/button';
import FolderIcon from './FolderIcon';
import { cn } from '@/lib/utils';

export interface Folder {
  id: string;
  name: string;
  color: 'green' | 'blue' | 'peach' | 'purple' | 'tan' | 'brown';
  count: number;
}

interface FolderListProps {
  folders: Folder[];
  selectedFolder: string | null;
  onSelectFolder: (folderId: string) => void;
  className?: string;
}

const FolderList: React.FC<FolderListProps> = ({
  folders,
  selectedFolder,
  onSelectFolder,
  className,
}) => {
  return (
    <div className={cn('space-y-2', className)}>
      <h2 className="text-lg font-medium ml-1 mb-3">Folders</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {folders.map((folder) => (
          <Button
            key={folder.id}
            variant="outline"
            className={cn(
              'folder-item h-auto flex flex-col items-center justify-center p-4 gap-2 hover:bg-ghibli-gray/20',
              selectedFolder === folder.id && 'bg-ghibli-gray/30 border-ghibli-green'
            )}
            onClick={() => onSelectFolder(folder.id)}
          >
            <FolderIcon color={folder.color} />
            <span className="text-sm font-medium mt-1">{folder.name}</span>
            <span className="text-xs text-muted-foreground">{folder.count} notes</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FolderList;
