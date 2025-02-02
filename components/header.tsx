import Link from 'next/link'
import React from 'react'
import { BriefcaseBusiness, LayoutDashboard, ShoppingCart } from 'lucide-react'
import { Button } from './ui/button'

const Header = () => {
    return (
        <div className='fixed top-0 w-full border-b backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
            <nav className='container mx-auto px-4 h-16 flex justify-between items-center'>
                <Link href={"/"} className='gradient-title font-bold text-2xl'>
                    Service Seller
                </Link>
                <ul className='flex justify-center items-center gap-4 md:gap-6'>
                    <li>
                        <Link href={"/dashboard"}>
                            <Button variant={"outline"}>
                                <span>Dashboard</span>
                                <LayoutDashboard />
                            </Button>
                        </Link>

                    </li>
                    <li>
                        <Link href={"/services"}>
                            <Button variant={"outline"}>
                                <span>Services</span>
                                <BriefcaseBusiness />
                            </Button>

                        </Link>
                    </li>
                    <li>
                        <Link href={"/cart"}>
                            <Button variant={"outline"}>
                                <span>Cart</span>
                                <ShoppingCart className="w-6 h-6" />
                            </Button>
                        </Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header