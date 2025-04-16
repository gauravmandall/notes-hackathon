
import React from 'react';
import { cn } from '@/lib/utils';
import { Folder } from 'lucide-react';

const folderColors = {
  green: 'text-ghibli-green hover:text-ghibli-green-light',
  blue: 'text-ghibli-blue hover:text-ghibli-blue-light',
  peach: 'text-ghibli-peach hover:text-ghibli-peach-light',
  purple: 'text-ghibli-purple hover:text-ghibli-purple-light',
  tan: 'text-ghibli-tan hover:text-ghibli-tan-light',
  brown: 'text-ghibli-brown hover:text-ghibli-gray',
};

type FolderColor = keyof typeof folderColors;

interface FolderIconProps {
  color: FolderColor;
  className?: string;
}

const FolderIcon: React.FC<FolderIconProps> = ({ color, className }) => {
  return (
    <div className={cn('transition-all duration-300', className)}>
      <Folder className={cn('w-8 h-8', folderColors[color])} strokeWidth={1.5} />
    </div>
  );
};

export default FolderIcon;
