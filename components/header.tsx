import Link from 'next/link'
import React from 'react'

const Header = () => {
    return (
        <div className='fixed top-0 w-full border-b backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60'>
            <nav className='container mx-auto px-4 h-16 flex justify-between items-center'>
                <Link href={"/"} className='gradient-title'>
                    Service Seller
                </Link>
                <ul>
                    <li></li>
                </ul>
            </nav>
        </div>
    )
}

export default Header