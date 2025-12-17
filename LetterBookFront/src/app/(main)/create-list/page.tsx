'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Book, PlusCircle, Search, Tag, X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { api } from '@/services/api';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface BackendBook {
  id: string;
  titulo: string;
  autores: { nome: string }[];
  capaUrl: string;
}

export default function CreateListPage() {
  const router = useRouter();
  const [listName, setListName] = useState('');
  const [listType, setListType] = useState('PUBLIC');
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BackendBook[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<BackendBook[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Debounced search
  useEffect(() => {
    const delayDebounceFn = setTimeout(async () => {
      if (searchQuery.length > 2) {
        setIsSearching(true);
        try {
          const response = await api.get(`/livros`, {
            params: { search: searchQuery, size: 5 }
          });
          setSearchResults(response.data.content);
        } catch (error) {
          console.error("Error searching books:", error);
        } finally {
          setIsSearching(false);
        }
      } else {
        setSearchResults([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const toggleBookSelection = (book: BackendBook) => {
    if (selectedBooks.some(b => b.id === book.id)) {
      setSelectedBooks(selectedBooks.filter(b => b.id !== book.id));
    } else {
      setSelectedBooks([...selectedBooks, book]);
      setSearchQuery(''); // Clear search after adding
      setSearchResults([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        nome: listName,
        descricao: description,
        tipo: listType,
        tags: tags.join(','),
        livrosIds: selectedBooks.map(b => b.id)
      };
      
      await api.post('/listas', payload);
      router.push('/lists'); // Redirect to lists page
    } catch (error) {
      console.error("Error creating list:", error);
      alert("Failed to create list. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center p-4 sm:p-6 md:p-12 bg-background">
      <Card className="w-full max-w-4xl bg-[#1a1a1a] border-[#2a2a2a] shadow-2xl shadow-black/50">
        <CardHeader className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl font-bold font-headline text-white">
                Create a New List
              </CardTitle>
              <CardDescription className="text-gray-400 mt-1">
                Organize your favorite books into curated collections.
              </CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700" onClick={() => router.back()}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="list-name" className="text-white font-semibold">
                List Name
              </Label>
              <Input
                id="list-name"
                value={listName}
                onChange={(e) => setListName(e.target.value)}
                placeholder="e.g., Sci-Fi Masterpieces, Summer Reads..."
                className="bg-[#2a2a2a] border-[#2a2a2a] text-white placeholder:text-gray-500"
                required
              />
            </div>

            <div className="space-y-4">
              <Label className="text-white font-semibold">List Type</Label>
              <RadioGroup value={listType} onValueChange={setListType} className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PUBLIC" id="r1" className="border-primary text-primary" />
                  <Label htmlFor="r1" className="text-gray-300">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PRIVATE" id="r2" className="border-primary text-primary" />
                  <Label htmlFor="r2" className="text-gray-300">Private</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="UNLISTED" id="r3" className="border-primary text-primary" />
                  <Label htmlFor="r3" className="text-gray-300">Unlisted</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-white font-semibold">
                Tags (Press Enter to add)
              </Label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="tags"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add tags..."
                  className="pl-10 bg-[#2a2a2a] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>
               <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map(tag => (
                    <div key={tag} className="flex items-center gap-1 bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-full">
                        <span>{tag}</span>
                        <button type="button" onClick={() => removeTag(tag)}><X className="h-3 w-3" /></button>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white font-semibold">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us more about this list..."
                className="min-h-[120px] bg-[#2a2a2a] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>
            
             <div className="space-y-4">
                <Label htmlFor="add-books" className="text-white font-semibold">Add Books</Label>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      id="add-books"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search for books by title or author..."
                      className="pl-10 bg-[#2a2a2a] border-[#2a2a2a] text-white placeholder:text-gray-500"
                    />
                    {searchResults.length > 0 && (
                        <div className="absolute z-10 w-full mt-1 bg-[#2a2a2a] border border-[#3a3a3a] rounded-md shadow-lg max-h-60 overflow-y-auto">
                            {searchResults.map(book => (
                                <div 
                                    key={book.id} 
                                    className="p-2 hover:bg-[#3a3a3a] cursor-pointer flex items-center gap-3"
                                    onClick={() => toggleBookSelection(book)}
                                >
                                    {book.capaUrl ? (
                                        <Image src={book.capaUrl} alt={book.titulo} width={40} height={60} className="object-cover rounded" />
                                    ) : (
                                        <div className="w-10 h-14 bg-gray-700 rounded flex items-center justify-center"><Book className="w-4 h-4 text-gray-400"/></div>
                                    )}
                                    <div>
                                        <p className="text-white text-sm font-medium">{book.titulo}</p>
                                        <p className="text-gray-400 text-xs">{book.autores?.map(a => a.nome).join(', ')}</p>
                                    </div>
                                    {selectedBooks.some(b => b.id === book.id) && <Check className="ml-auto w-4 h-4 text-primary" />}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="space-y-2">
                    {selectedBooks.length === 0 ? (
                        <div className="p-4 border border-dashed border-gray-600 rounded-lg text-center">
                            <Book className="mx-auto h-8 w-8 text-gray-500" />
                            <p className="mt-2 text-sm text-gray-500">Your added books will appear here.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                             {selectedBooks.map(book => (
                                <div key={book.id} className="flex items-center gap-3 p-2 bg-[#2a2a2a] rounded-md border border-[#3a3a3a]">
                                    {book.capaUrl ? (
                                        <Image src={book.capaUrl} alt={book.titulo} width={30} height={45} className="object-cover rounded" />
                                    ) : (
                                        <div className="w-[30px] h-[45px] bg-gray-700 rounded flex items-center justify-center"><Book className="w-3 h-3 text-gray-400"/></div>
                                    )}
                                    <div className="flex-1 min-w-0">
                                        <p className="text-white text-sm font-medium truncate">{book.titulo}</p>
                                        <p className="text-gray-400 text-xs truncate">{book.autores?.map(a => a.nome).join(', ')}</p>
                                    </div>
                                    <button type="button" onClick={() => toggleBookSelection(book)} className="text-gray-400 hover:text-red-500">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                             ))}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button type="button" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button type="submit" className="bg-[#00e054] hover:bg-[#00b553] text-black font-bold">
                <PlusCircle className="mr-2 h-5 w-5" />
                Create List
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}