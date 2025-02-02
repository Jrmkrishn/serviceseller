import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>
      <div className="container px-4 md:px-6 space-y-6">
        <div className="text-5xl animate-gradient space-y-6 mx-auto">
          <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl gradient-title  text-center">
            Sell Services Seamlessly with
            <br /> Our Smart POS System
          </h1>
          <p className="mx-auto max-w-[600px] text-muted-foreground text-center text-lg md:text-xl">
            Effortlessly manage bookings, payments, and customer interactions—all in one powerful and intuitive platform.
          </p>
        </div>
        <div className="mx-auto text-center">
          <Link href="/dashboard">
            <Button size="lg" className="px-8">
              Get Started
            </Button>
          </Link>
        </div>
        <Image src={"/hero.webp"} alt="hero" width={1280} height={720} className="rounded-lg shadow-2xl border mx-auto" priority />
      </div>
    </div>
  );
}
