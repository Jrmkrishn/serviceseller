"use client";
import Link from "next/link";
import React, { useState } from "react";
import { BriefcaseBusiness, LayoutDashboard, ShoppingCart, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { useCartStore } from "@/app/(main)/_store/store";
import { usePathname } from "next/navigation";

const Header = () => {
  const { cartItems, step } = useCartStore();
  const count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname()

  const renderButtonOrSpan = (href: string, text: string, icon: React.ReactNode, isDisabled: boolean) => {
    const isActive = pathname === href
    if (isDisabled) {
      return (
        <Button variant={isActive ? "default" : "outline"} disabled={isDisabled} className="w-full text-left">
          <span className="flex items-center gap-2 text-muted-foreground">
            {icon}
            {text}
          </span>
        </Button>
      );
    }
    return (
      <Link href={href}>
        <Button variant={isActive ? "default" : "outline"} disabled={isDisabled} className="w-full text-left">
          <span>{text}</span>
          {icon}
        </Button>
      </Link>
    );
  };

  return (
    <div className="fixed top-0 w-full border-b backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex justify-between items-center">
        <Link href={"/"} className="gradient-title font-bold text-lg md:text-2xl">
          Service Seller
        </Link>

        <ul className="hidden md:flex justify-center items-center gap-4 md:gap-6">
          <li>{renderButtonOrSpan("/dashboard", "Dashboard", <LayoutDashboard />, step !== "cart")}</li>
          <li>{renderButtonOrSpan("/services", "Services", <BriefcaseBusiness />, step !== "cart")}</li>
          <li>
            <Link href="/cart">
              <Button className="relative" variant={"outline"}>
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute flex justify-center items-center -top-2 -right-2 h-6 w-6 bg-green-600 rounded-full">
                    {count}
                  </span>
                )}
                <ShoppingCart className="w-6 h-6" />
              </Button>
            </Link>
          </li>
        </ul>

        <Button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden"
          variant={"outline"}
          size={"icon"}
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </nav>

      {isMenuOpen && (
        <div className="md:hidden flex flex-col gap-4 px-4 py-2 bg-background">
          <div>{renderButtonOrSpan("/dashboard", "Dashboard", <LayoutDashboard />, step !== "cart")}</div>
          <div>{renderButtonOrSpan("/services", "Services", <BriefcaseBusiness />, step !== "cart")}</div>
          <div>
            <Link href="/cart">
              <Button variant={pathname === "/cart" ? "default" : "outline"} className="relative w-full text-left">
                <span>Cart</span>
                {cartItems.length > 0 && (
                  <span className="absolute flex justify-center items-center -top-2 -right-2 h-6 w-6 bg-green-600 rounded-full">
                    {count}
                  </span>
                )}
                <ShoppingCart className="w-6 h-6" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
