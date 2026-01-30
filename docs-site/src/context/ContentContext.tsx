import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

// Types
export interface DocItem {
  id: string;
  title: string;
  content: string; // Markdown content
  description?: string;
  tags?: string[];
}

export interface DocSection {
  id: string;
  title: string;
  items: DocItem[];
  icon?: string;
  description?: string;
}

interface ContentContextType {
  pitchDeckUrl: string | null;
  demoVideoUrl: string | null;
  docSections: DocSection[];
  updatePitchDeck: (file: File) => void;
  updateDemoVideo: (url: string | File) => void;
  addDocSection: (title: string) => void;
  addDocItem: (sectionId: string, title: string, content: string) => void;
  updateDocItem: (sectionId: string, itemId: string, content: string) => void;
  deleteDocItem: (sectionId: string, itemId: string) => void;
  deleteDocSection: (sectionId: string) => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Initial Data
const INITIAL_DOCS: DocSection[] = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    items: [
      {
        id: 'intro',
        title: 'Introduction',
        content: '# Introduction\n\nWelcome to SomniaForge SDK documentation.'
      },
      {
        id: 'installation',
        title: 'Installation',
        content: '# Installation\n\n```bash\nnpm install @somniaforge/sdk\n```'
      }
    ]
  }
];

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [pitchDeckUrl, setPitchDeckUrl] = useState<string | null>(null);
  const [demoVideoUrl, setDemoVideoUrl] = useState<string | null>(null);
  const [docSections, setDocSections] = useState<DocSection[]>(INITIAL_DOCS);

  // Load from localStorage on mount
  useEffect(() => {
    const savedPitchDeck = localStorage.getItem('somnia_pitch_deck');
    const savedDemoVideo = localStorage.getItem('somnia_demo_video');
    const savedDocs = localStorage.getItem('somnia_docs');

    if (savedPitchDeck) setPitchDeckUrl(savedPitchDeck);
    if (savedDemoVideo) setDemoVideoUrl(savedDemoVideo);
    if (savedDocs) setDocSections(JSON.parse(savedDocs));
  }, []);

  // Helpers to save to localStorage
  const savePitchDeck = (url: string) => {
    setPitchDeckUrl(url);
    localStorage.setItem('somnia_pitch_deck', url);
  };

  const saveDemoVideo = (url: string) => {
    setDemoVideoUrl(url);
    localStorage.setItem('somnia_demo_video', url);
  };

  const saveDocs = (docs: DocSection[]) => {
    setDocSections(docs);
    localStorage.setItem('somnia_docs', JSON.stringify(docs));
  };

  // Actions
  const updatePitchDeck = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      savePitchDeck(reader.result as string);
      toast.success('Pitch Deck updated successfully');
    };
    reader.readAsDataURL(file);
  };

  const updateDemoVideo = (input: string | File) => {
    if (typeof input === 'string') {
      saveDemoVideo(input);
      toast.success('Demo Video URL updated');
    } else {
      const reader = new FileReader();
      reader.onloadend = () => {
        saveDemoVideo(reader.result as string);
        toast.success('Demo Video uploaded successfully');
      };
      reader.readAsDataURL(input);
    }
  };

  const addDocSection = (title: string) => {
    const newSection: DocSection = {
      id: title.toLowerCase().replace(/\s+/g, '-'),
      title,
      items: []
    };
    saveDocs([...docSections, newSection]);
    toast.success(`Section "${title}" added`);
  };

  const addDocItem = (sectionId: string, title: string, content: string) => {
    const newDocs = docSections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          items: [
            ...section.items,
            {
              id: title.toLowerCase().replace(/\s+/g, '-'),
              title,
              content
            }
          ]
        };
      }
      return section;
    });
    saveDocs(newDocs);
    toast.success(`Page "${title}" created`);
  };

  const updateDocItem = (sectionId: string, itemId: string, content: string) => {
    const newDocs = docSections.map(section => {
        if (section.id === sectionId) {
            return {
                ...section,
                items: section.items.map(item => 
                    item.id === itemId ? { ...item, content } : item
                )
            };
        }
        return section;
    });
    saveDocs(newDocs);
    toast.success('Documentation updated');
  };

  const deleteDocItem = (sectionId: string, itemId: string) => {
      const newDocs = docSections.map(section => {
          if (section.id === sectionId) {
              return {
                  ...section,
                  items: section.items.filter(item => item.id !== itemId)
              };
          }
          return section;
      });
      saveDocs(newDocs);
      toast.success('Page deleted');
  };

  const deleteDocSection = (sectionId: string) => {
      const newDocs = docSections.filter(s => s.id !== sectionId);
      saveDocs(newDocs);
      toast.success('Section deleted');
  };

  return (
    <ContentContext.Provider value={{
      pitchDeckUrl,
      demoVideoUrl,
      docSections,
      updatePitchDeck,
      updateDemoVideo,
      addDocSection,
      addDocItem,
      updateDocItem,
      deleteDocItem,
      deleteDocSection
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
