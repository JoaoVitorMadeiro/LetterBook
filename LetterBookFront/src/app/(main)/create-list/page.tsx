'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { Book, PlusCircle, Search, Tag, X } from 'lucide-react';

export default function CreateListPage() {
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
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-gray-700">
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <form className="space-y-8">
            <div className="space-y-2">
              <Label htmlFor="list-name" className="text-white font-semibold">
                List Name
              </Label>
              <Input
                id="list-name"
                placeholder="e.g., Sci-Fi Masterpieces, Summer Reads..."
                className="bg-[#2a2a2a] border-[#2a2a2a] text-white placeholder:text-gray-500"
              />
            </div>

            <div className="space-y-4">
              <Label className="text-white font-semibold">List Type</Label>
              <RadioGroup defaultValue="public" className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="public" id="r1" className="border-primary text-primary" />
                  <Label htmlFor="r1" className="text-gray-300">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="private" id="r2" className="border-primary text-primary" />
                  <Label htmlFor="r2" className="text-gray-300">Private</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="unlisted" id="r3" className="border-primary text-primary" />
                  <Label htmlFor="r3" className="text-gray-300">Unlisted (only with link)</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags" className="text-white font-semibold">
                Tags
              </Label>
              <div className="relative">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="tags"
                  placeholder="Add tags to your list (e.g., fantasy, non-fiction)"
                  className="pl-10 bg-[#2a2a2a] border-[#2a2a2a] text-white placeholder:text-gray-500"
                />
              </div>
               <div className="flex flex-wrap gap-2 pt-2">
                  <div className="flex items-center gap-1 bg-primary/20 text-primary text-xs font-medium px-2 py-1 rounded-full">
                    <span>sci-fi</span>
                    <button><X className="h-3 w-3" /></button>
                  </div>
               </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white font-semibold">Description</Label>
              <Textarea
                id="description"
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
                    placeholder="Search for books to add..."
                    className="pl-10 bg-[#2a2a2a] border-[#2a2a2a] text-white placeholder:text-gray-500"
                    />
                </div>
                <div className="p-4 border border-dashed border-gray-600 rounded-lg text-center">
                    <Book className="mx-auto h-8 w-8 text-gray-500" />
                    <p className="mt-2 text-sm text-gray-500">Your added books will appear here.</p>
                </div>
            </div>

            <div className="flex justify-end gap-4 pt-4">
              <Button variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white">
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
