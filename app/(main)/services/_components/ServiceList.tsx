import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Service } from '@/lib/types/service'
import Image from 'next/image'
import React from 'react'
import { toast } from 'sonner'

interface State {
  filterServices: Service[];
  addCartItem: (service: Service) => void;
}

const ServiceList = ({ filterServices, addCartItem }: State) => {
  return (
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
          <CardContent className='flex gap-2 flex-col sm:flex-row justify-between items-center'>
            <div>
              <span className='text-lg font-semibold'>${service.price}</span>
              <span className='ml-2 text-sm text-muted-foreground'>{service.duration}</span>
            </div>
            <Button onClick={() => {
              addCartItem(service)
              toast.success(`${service.name} added to Cart!`)
            }
            }>Add to Cart</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

export default ServiceList