
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { BookOpen, Star, Clock, Settings } from 'lucide-react';

interface SidebarItem {
  id: string;
  icon: React.ReactNode;
  label: string;
}

interface SidebarContentProps {
  selectedItem: string;
  onSelectItem: (id: string) => void;
  className?: string;
}

const SidebarContent: React.FC<SidebarContentProps> = ({ 
  selectedItem, 
  onSelectItem,
  className 
}) => {
  const items: SidebarItem[] = [
    { id: 'all', icon: <BookOpen className="sidebar-icon" />, label: 'All Notes' },
    { id: 'favorites', icon: <Star className="sidebar-icon" />, label: 'Favorites' },
    { id: 'recent', icon: <Clock className="sidebar-icon" />, label: 'Recent' },
  ];

  return (
    <div className={cn('flex flex-col h-full', className)}>
      <div className="flex justify-center mb-8">
        <img src="/images/totoro.svg" alt="Spirited Notes" className="w-24 h-24" />
      </div>
      
      <div className="space-y-2 px-2">
        {items.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              'w-full justify-start p-2 text-left',
              selectedItem === item.id ? 'bg-ghibli-green-light' : 'hover:bg-ghibli-gray/30'
            )}
            onClick={() => onSelectItem(item.id)}
          >
            {item.icon}
            <span className="ml-2">{item.label}</span>
          </Button>
        ))}
      </div>
      
      <div className="mt-auto px-2 mb-4">
        <Button
          variant="ghost"
          className="w-full justify-start p-2 text-left hover:bg-ghibli-gray/30"
        >
          <Settings className="sidebar-icon" />
          <span className="ml-2">Settings</span>
        </Button>
      </div>
    </div>
  );
};

export default SidebarContent;
