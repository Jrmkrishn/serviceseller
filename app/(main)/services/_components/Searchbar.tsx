import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import React from 'react'

interface State {
  categories: string[];
  searchTerm: string;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setSearchTerm: (searchTerm: string) => void;
}

const Searchbar = ({ categories, searchTerm, setSelectedCategory, selectedCategory, setSearchTerm }: State) => {
  return (
    <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
      <div className='max-w-lg w-full relative flex items-center gap-2'>
        <Search className='absolute top-2.5 left-2 h-4 w-4 text-muted-foreground' />
        <Input placeholder='Search for services...'
          className='search-input'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='flex gap-2 overflow-x-auto pb-2'>
        {categories.map((category) => (
          <Button key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Searchbar