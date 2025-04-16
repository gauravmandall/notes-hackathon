
import React, { useState, useEffect } from 'react';
import { Sidebar, SidebarContent as SidebarContainer, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import Search from '@/components/Search';
import FloatingActionButton from '@/components/FloatingActionButton';
import FolderList, { Folder } from '@/components/FolderList';
import NotesGrid from '@/components/NotesGrid';
import SidebarContent from '@/components/SidebarContent';
import NoteEditor from '@/components/NoteEditor';
import { Note } from '@/components/NoteCard';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

// Sample data
const initialFolders: Folder[] = [
  { id: 'work', name: 'Work', color: 'green', count: 5 },
  { id: 'personal', name: 'Personal', color: 'blue', count: 3 },
  { id: 'ideas', name: 'Ideas', color: 'peach', count: 2 },
  { id: 'recipes', name: 'Recipes', color: 'purple', count: 4 },
  { id: 'travel', name: 'Travel', color: 'tan', count: 1 },
  { id: 'books', name: 'Books', color: 'brown', count: 2 },
];

const initialNotes: Note[] = [
  {
    id: '1',
    title: 'Meeting with Totoro',
    content: 'Remember to bring umbrellas and acorns for the forest spirits. They seem to really like those!',
    folderColor: 'ghibli-green',
    createdAt: '2023-04-10T10:30:00Z',
    favorite: true,
  },
  {
    id: '2',
    title: 'Spirited Away Ideas',
    content: 'Character designs for the new project. Think about incorporating more natural elements like flowing water and wind.',
    folderColor: 'ghibli-blue',
    createdAt: '2023-04-08T14:15:00Z',
  },
  {
    id: '3',
    title: 'Howl\'s Moving Castle Sketch',
    content: 'The castle should have more mechanical parts that move organically, like they\'re breathing. Add more steam and gears.',
    folderColor: 'ghibli-peach',
    createdAt: '2023-04-05T09:45:00Z',
    favorite: true,
  },
  {
    id: '4',
    title: 'Kiki\'s Delivery Service',
    content: 'Recipe for the herbal cookies that Kiki delivers. Need to get fresh lavender and honey from the market.',
    folderColor: 'ghibli-purple',
    createdAt: '2023-04-01T16:20:00Z',
  },
  {
    id: '5',
    title: 'Ponyo Adventure',
    content: 'Ideas for the seaside scene: more bubbles and small fish details around the coral reef.',
    folderColor: 'ghibli-tan',
    createdAt: '2023-03-28T11:10:00Z',
  },
  {
    id: '6',
    title: 'Nausicaä Valley Notes',
    content: 'Research more about different types of moss and fungi for the toxic jungle. Look at reference photos of real forests.',
    folderColor: 'ghibli-brown',
    createdAt: '2023-03-25T15:30:00Z',
  },
];

const Index = () => {
  const [folders, setFolders] = useState<Folder[]>(initialFolders);
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [filteredNotes, setFilteredNotes] = useState<Note[]>(initialNotes);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedSidebarItem, setSelectedSidebarItem] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  
  const { toast } = useToast();
  const isMobile = useIsMobile();
  
  // Filter notes based on selected folder, sidebar item, and search query
  useEffect(() => {
    let filtered = [...notes];
    
    // Filter by sidebar selection
    if (selectedSidebarItem === 'favorites') {
      filtered = filtered.filter(note => note.favorite);
    } else if (selectedSidebarItem === 'recent') {
      filtered = [...filtered].sort((a, b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      ).slice(0, 5);
    }
    
    // Filter by folder
    if (selectedFolder) {
      const folder = folders.find(f => f.id === selectedFolder);
      if (folder) {
        filtered = filtered.filter(note => note.folderColor === `ghibli-${folder.color}`);
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(query) || 
        note.content.toLowerCase().includes(query)
      );
    }
    
    setFilteredNotes(filtered);
  }, [notes, selectedFolder, selectedSidebarItem, searchQuery, folders]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };
  
  const handleSelectFolder = (folderId: string) => {
    setSelectedFolder(selectedFolder === folderId ? null : folderId);
  };
  
  const handleSelectSidebarItem = (id: string) => {
    setSelectedSidebarItem(id);
    setSelectedFolder(null);
  };
  
  const handleNewNote = () => {
    setSelectedNote(null);
    setIsEditorOpen(true);
  };
  
  const handleEditNote = (note: Note) => {
    setSelectedNote(note);
    setIsEditorOpen(true);
  };
  
  const handleSaveNote = (note: Note) => {
    if (notes.some(n => n.id === note.id)) {
      // Update existing note
      setNotes(notes.map(n => n.id === note.id ? note : n));
      toast({
        title: "Note updated",
        description: "Your note has been updated successfully.",
      });
    } else {
      // Add new note
      setNotes([...notes, note]);
      
      // Update folder count
      const folderColorMap: Record<string, string> = {
        'ghibli-green': 'green',
        'ghibli-blue': 'blue',
        'ghibli-peach': 'peach',
        'ghibli-purple': 'purple',
        'ghibli-tan': 'tan',
        'ghibli-brown': 'brown',
      };
      
      const folderColor = folderColorMap[note.folderColor];
      setFolders(folders.map(folder => 
        folder.color === folderColor 
          ? { ...folder, count: folder.count + 1 } 
          : folder
      ));
      
      toast({
        title: "Note created",
        description: "Your new note has been created.",
      });
    }
  };
  
  // Calculate title based on current selection
  const getTitle = () => {
    if (selectedFolder) {
      const folder = folders.find(f => f.id === selectedFolder);
      return folder ? folder.name : 'Notes';
    }
    
    switch (selectedSidebarItem) {
      case 'favorites':
        return 'Favorite Notes';
      case 'recent':
        return 'Recent Notes';
      default:
        return 'All Notes';
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="bg-ghibli-gray/30 backdrop-blur-sm border-r border-ghibli-green-light/30">
          <SidebarContainer>
            <SidebarContent
              selectedItem={selectedSidebarItem}
              onSelectItem={handleSelectSidebarItem}
            />
          </SidebarContainer>
        </Sidebar>
        
        <div className="flex-1 flex flex-col p-4 sm:px-8 sm:py-6 animate-fade-in">
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <SidebarTrigger>
                {isMobile ? (
                  <Button variant="ghost" size="icon" className="mr-2">
                    <Menu className="h-5 w-5" />
                  </Button>
                ) : null}
              </SidebarTrigger>
              <h1 className="text-2xl font-medium">{getTitle()}</h1>
            </div>
            <Search onSearch={handleSearch} className="w-full max-w-sm" />
          </header>
          
          <main className="flex-1 flex flex-col gap-8">
            {selectedSidebarItem === 'all' && !selectedFolder && (
              <FolderList
                folders={folders}
                selectedFolder={selectedFolder}
                onSelectFolder={handleSelectFolder}
              />
            )}
            
            <NotesGrid
              notes={filteredNotes}
              onNoteClick={handleEditNote}
              className="pb-20" // Space for floating button
            />
          </main>
          
          <FloatingActionButton onClick={handleNewNote} />
          
          <NoteEditor
            note={selectedNote}
            isOpen={isEditorOpen}
            onClose={() => setIsEditorOpen(false)}
            onSave={handleSaveNote}
          />
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;
