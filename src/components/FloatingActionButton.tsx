
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FloatingActionButtonProps {
  onClick: () => void;
  className?: string;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({ onClick, className }) => {
  return (
    <Button
      onClick={onClick}
      className={cn(
        'fixed bottom-8 right-8 md:bottom-10 md:right-10 rounded-full w-14 h-14 p-0 floating-button',
        'bg-ghibli-green hover:bg-ghibli-green-light shadow-lg',
        className
      )}
    >
      <img src="/images/leaf.svg" alt="New Note" className="w-8 h-8" />
    </Button>
  );
};

export default FloatingActionButton;
