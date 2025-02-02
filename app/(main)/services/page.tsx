"use client"
import { sampleServices } from '@/lib/data/service'
import React, { useState } from 'react'
import { useCartStore } from '../_store/store'
import Searchbar from './_components/Searchbar'
import ServiceList from './_components/ServiceList'

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
      <Searchbar categories={categories} searchTerm={searchTerm} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} setSearchTerm={setSearchTerm} />
      <ServiceList addCartItem={addCartItem} filterServices={filterServices} />
    </div>
  )
}

export default Services