import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
const inter = Inter({
  subsets: ["latin"]
})

export const metadata: Metadata = {
  title: "Service Seller",
  description: "Service Seller is a platform to sell your services online.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.className} antialiased`}
      >
        <ThemeProvider
          attribute={"class"}
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster richColors  />
          <Header />
          <main className="container mx-auto min-h-screen mt-28">
            {children}
          </main>
          <footer className="py-12">
            <div className="container mx-auto px-4 text-center text-gray-200">
              <p>Made with 💖 by Jay</p>
            </div>
          </footer>
        </ThemeProvider>

      </body>
    </html>
  );
}
