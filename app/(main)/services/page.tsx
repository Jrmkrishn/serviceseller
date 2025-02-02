"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { sampleServices } from '@/lib/data/service'
import { Search } from 'lucide-react'
import Image from 'next/image'
import React, { useState } from 'react'
import { useCartStore } from '../_store/store'

const Services = () => {

  const { addCartItem } = useCartStore()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = ["all", ...new Set(sampleServices.map(s => s.category))]

  const filterServices = sampleServices.filter((service) => {
    const matchedSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || service.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchedCategory = selectedCategory === "all" || service.category === selectedCategory
    return matchedSearch && matchedCategory
  })

  return (
    <div className='p-6'>
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
      <div className='grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2'>
        {filterServices.map((service) => (
          <Card className='service-card fade-in' key={service.id}>
            <CardHeader>
              {service.image &&
                <Image src={service.image} alt={service.name} width={480} height={240} className='mb-4 h-60 w-full object-cover rounded-lg' />
              }
              <CardTitle>{service.name}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className='flex justify-between items-center'>
              <div>
                <span className='text-lg font-semibold'>${service.price}</span>
                <span className='ml-2 text-sm text-muted-foreground'>{service.duration}</span>
              </div>
              <Button onClick={() => addCartItem(service)}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default Services