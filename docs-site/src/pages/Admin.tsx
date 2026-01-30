import React, { useState } from 'react';
import { useContent } from '@/context/ContentContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Lock, Upload, FileText, Video, Presentation, Trash2, Edit, Plus } from 'lucide-react';
import { toast } from 'sonner';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password for MVP
      setIsAuthenticated(true);
      toast.success('Welcome back, Admin!');
    } else {
      toast.error('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] bg-background">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Enter password to manage content.</CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter access code" 
                    autoFocus
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                <Lock className="mr-2 h-4 w-4" /> Login
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Content Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your website content, assets, and documentation.</p>
        </div>
        <Button variant="outline" onClick={() => setIsAuthenticated(false)}>Logout</Button>
      </div>

      <Tabs defaultValue="pitchdeck" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pitchdeck" className="flex items-center gap-2">
            <Presentation className="h-4 w-4" /> Pitch Deck
          </TabsTrigger>
          <TabsTrigger value="demo" className="flex items-center gap-2">
            <Video className="h-4 w-4" /> Demo Video
          </TabsTrigger>
          <TabsTrigger value="docs" className="flex items-center gap-2">
            <FileText className="h-4 w-4" /> Documentation
          </TabsTrigger>
        </TabsList>

        <PitchDeckTab />
        <DemoVideoTab />
        <DocsTab />
      </Tabs>
    </div>
  );
};

const PitchDeckTab = () => {
  const { pitchDeckUrl, updatePitchDeck } = useContent();
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (file) {
      updatePitchDeck(file);
      setFile(null);
    }
  };

  return (
    <TabsContent value="pitchdeck">
      <Card>
        <CardHeader>
          <CardTitle>Pitch Deck Management</CardTitle>
          <CardDescription>Upload your PDF pitch deck. This will replace the current file.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="pitchdeck-upload">Upload PDF</Label>
            <Input 
              id="pitchdeck-upload" 
              type="file" 
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] || null)} 
            />
          </div>
          {pitchDeckUrl && (
            <div className="p-4 bg-muted rounded-md flex items-center gap-2 text-sm">
              <span className="text-green-600 font-medium">✓ Current File Active</span>
            </div>
          )}
        </CardContent>
        <CardFooter>
          <Button onClick={handleUpload} disabled={!file}>
            <Upload className="mr-2 h-4 w-4" /> Upload Pitch Deck
          </Button>
        </CardFooter>
      </Card>
    </TabsContent>
  );
};

const DemoVideoTab = () => {
    const { demoVideoUrl, updateDemoVideo } = useContent();
    const [file, setFile] = useState<File | null>(null);
    const [url, setUrl] = useState('');
    const [mode, setMode] = useState<'url' | 'file'>('url');
  
    const handleSave = () => {
      if (mode === 'file' && file) {
        updateDemoVideo(file);
        setFile(null);
      } else if (mode === 'url' && url) {
        updateDemoVideo(url);
        setUrl('');
      }
    };
  
    return (
      <TabsContent value="demo">
        <Card>
          <CardHeader>
            <CardTitle>Demo Video Management</CardTitle>
            <CardDescription>Upload a video file or provide a URL (YouTube, Vimeo, etc.).</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex gap-4">
                <Button 
                    variant={mode === 'url' ? 'default' : 'outline'} 
                    onClick={() => setMode('url')}
                >
                    Use URL
                </Button>
                <Button 
                    variant={mode === 'file' ? 'default' : 'outline'} 
                    onClick={() => setMode('file')}
                >
                    Upload File
                </Button>
            </div>

            {mode === 'url' ? (
                <div className="grid w-full max-w-md items-center gap-1.5">
                    <Label htmlFor="video-url">Video URL</Label>
                    <Input 
                        id="video-url" 
                        placeholder="https://youtube.com/..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                </div>
            ) : (
                <div className="grid w-full max-w-md items-center gap-1.5">
                    <Label htmlFor="video-upload">Upload Video (MP4/WebM)</Label>
                    <Input 
                        id="video-upload" 
                        type="file" 
                        accept="video/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)} 
                    />
                </div>
            )}
            
            {demoVideoUrl && (
              <div className="p-4 bg-muted rounded-md">
                <p className="text-sm font-medium mb-1">Current Video Source:</p>
                <code className="text-xs break-all">{demoVideoUrl.substring(0, 100)}...</code>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button onClick={handleSave} disabled={mode === 'file' ? !file : !url}>
              <Upload className="mr-2 h-4 w-4" /> Save Video
            </Button>
          </CardFooter>
        </Card>
      </TabsContent>
    );
};

const DocsTab = () => {
    const { docSections, addDocSection, addDocItem, deleteDocSection, deleteDocItem, updateDocItem } = useContent();
    
    // Add Section State
    const [newSectionTitle, setNewSectionTitle] = useState('');

    // Add Page State
    const [selectedSectionId, setSelectedSectionId] = useState('');
    const [newPageTitle, setNewPageTitle] = useState('');
    const [newPageContent, setNewPageContent] = useState('');

    // Edit Page State
    const [editingItem, setEditingItem] = useState<{sectionId: string, itemId: string, content: string} | null>(null);

    const handleAddSection = () => {
        if (newSectionTitle) {
            addDocSection(newSectionTitle);
            setNewSectionTitle('');
        }
    };

    const handleAddPage = () => {
        if (selectedSectionId && newPageTitle && newPageContent) {
            addDocItem(selectedSectionId, newPageTitle, newPageContent);
            setNewPageTitle('');
            setNewPageContent('');
        }
    };

    return (
        <TabsContent value="docs" className="space-y-6">
            {/* 1. Section Management */}
            <Card>
                <CardHeader>
                    <CardTitle>Documentation Structure</CardTitle>
                    <CardDescription>Manage your documentation sidebar structure.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2 mb-6">
                        <Input 
                            placeholder="New Section Name (e.g. Tutorials)" 
                            value={newSectionTitle}
                            onChange={(e) => setNewSectionTitle(e.target.value)}
                        />
                        <Button onClick={handleAddSection}>
                            <Plus className="h-4 w-4 mr-2" /> Add Section
                        </Button>
                    </div>

                    <div className="space-y-4">
                        {docSections.map(section => (
                            <div key={section.id} className="border rounded-lg p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-semibold text-lg">{section.title}</h3>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteDocSection(section.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                                <div className="pl-4 border-l-2 space-y-2">
                                    {section.items.map(item => (
                                        <div key={item.id} className="flex justify-between items-center bg-muted/50 p-2 rounded">
                                            <span className="text-sm">{item.title}</span>
                                            <div className="flex gap-1">
                                                <Dialog>
                                                    <DialogTrigger asChild>
                                                        <Button variant="ghost" size="sm" onClick={() => setEditingItem({sectionId: section.id, itemId: item.id, content: item.content})}>
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </DialogTrigger>
                                                    <DialogContent className="max-w-2xl">
                                                        <DialogHeader>
                                                            <DialogTitle>Edit Page: {item.title}</DialogTitle>
                                                        </DialogHeader>
                                                        <div className="py-4">
                                                            <Label>Markdown Content</Label>
                                                            <Textarea 
                                                                className="h-64 mt-2 font-mono text-xs" 
                                                                value={editingItem?.content || ''}
                                                                onChange={(e) => setEditingItem(prev => prev ? {...prev, content: e.target.value} : null)}
                                                            />
                                                        </div>
                                                        <DialogFooter>
                                                            <Button onClick={() => {
                                                                if(editingItem) updateDocItem(editingItem.sectionId, editingItem.itemId, editingItem.content)
                                                            }}>Save Changes</Button>
                                                        </DialogFooter>
                                                    </DialogContent>
                                                </Dialog>
                                                
                                                <Button variant="ghost" size="sm" className="text-red-500" onClick={() => deleteDocItem(section.id, item.id)}>
                                                    <Trash2 className="h-3 w-3" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                    {section.items.length === 0 && (
                                        <div className="text-sm text-muted-foreground italic">No pages in this section</div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* 2. Add New Page */}
            <Card>
                <CardHeader>
                    <CardTitle>Add New Page</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Section</Label>
                            <Select onValueChange={setSelectedSectionId} value={selectedSectionId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Section" />
                                </SelectTrigger>
                                <SelectContent>
                                    {docSections.map(s => (
                                        <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Page Title</Label>
                            <Input 
                                placeholder="My New Page" 
                                value={newPageTitle}
                                onChange={(e) => setNewPageTitle(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label>Content (Markdown)</Label>
                        <Textarea 
                            placeholder="# My Page\n\nContent goes here..." 
                            className="h-48 font-mono"
                            value={newPageContent}
                            onChange={(e) => setNewPageContent(e.target.value)}
                        />
                    </div>
                </CardContent>
                <CardFooter>
                    <Button onClick={handleAddPage} disabled={!selectedSectionId || !newPageTitle}>
                        <Plus className="mr-2 h-4 w-4" /> Create Page
                    </Button>
                </CardFooter>
            </Card>
        </TabsContent>
    );
}

export default Admin;
