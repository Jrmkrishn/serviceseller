"use client"
import React, { useEffect } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import {  usePathname } from 'next/navigation';


const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient()
    const pathname = usePathname();

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [pathname]);
    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default MainLayout