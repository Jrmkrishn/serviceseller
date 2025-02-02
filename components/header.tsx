"use client"
import Link from 'next/link'
import React from 'react'
import { BriefcaseBusiness, LayoutDashboard, ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'
import { useCartStore } from '@/app/(main)/_store/store'

const Header = () => {
    const { cartItems, step } = useCartStore()
    const count = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    return (
        <div className='fixed top-0 w-full border-b backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
            <nav className='container mx-auto px-4 h-16 flex justify-between items-center'>
                <Link href={"/"} className='gradient-title font-bold text-2xl'>
                    Service Seller
                </Link>
                <ul className='flex justify-center items-center gap-4 md:gap-6'>
                    <li>
                        <Link href={"/dashboard"}>
                            <Button variant={"outline"} disabled={step !== "cart"}>
                                <span>Dashboard</span>
                                <LayoutDashboard />
                            </Button>
                        </Link>

                    </li>
                    <li>
                        <Link href={"/services"}>
                            <Button variant={"outline"} disabled={step !== "cart"} >
                                <span>Services</span>
                                <BriefcaseBusiness />
                            </Button>

                        </Link>
                    </li>
                    <li>
                        <Link href={"/cart"}>
                            <Button className='relative' variant={"outline"}>
                                <span>Cart</span>
                                {cartItems.length > 0 &&
                                    <span className='absolute flex justify-center items-center -top-2 -right-2 h-6 w-6 bg-green-600 rounded-full'>{count}</span>
                                }
                                <ShoppingCart className="w-6 h-6" />
                            </Button>
                        </Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header
