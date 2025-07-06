"use client"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { Menu, Rss, ShieldCheck, UserRoundSearch, X } from "lucide-react"
import { ThemeToggle } from "./theme-toggle"
import Link from "next/link"
import { useState } from "react"

export default function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-full p-0 bg-background/95 border-none flex flex-col items-center justify-center [&>button]:hidden"
      >
        <SheetHeader className="sr-only">
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        
        {/* Header with logo, theme toggle, and close button */}
        <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary whitespace-nowrap">mirai prjkt</h1>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-10 w-10">
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </div>
        </div>
        
        {/* Centered Navigation Menu */}
        <nav className="flex flex-col items-center gap-8">
          <Link href="/" onClick={() => setOpen(false)}>
            <Button 
              variant="ghost" 
              className="text-3xl font-medium h-16 px-12 hover:bg-accent hover:text-accent-foreground"
            >
              <UserRoundSearch className="mr-4 h-8 w-8" />
              about
            </Button>
          </Link>
          <Link href="/blog" onClick={() => setOpen(false)}>
            <Button 
              variant="ghost" 
              className="text-3xl font-medium h-16 px-12 hover:bg-accent hover:text-accent-foreground"
            >
              <Rss className="mr-4 h-8 w-8" />
              blog
            </Button>
          </Link>
          <Link href="/project" onClick={() => setOpen(false)}>
            <Button 
              variant="ghost" 
              className="text-3xl font-medium h-16 px-12 hover:bg-accent hover:text-accent-foreground"
            >
              <ShieldCheck className="mr-4 h-8 w-8" />
              project
            </Button>
          </Link>
        </nav>
        
        {/* Footer text */}
        <div className="absolute bottom-8 text-center">
          <p className="text-muted-foreground text-lg">mirai project 2025</p>
        </div>
      </SheetContent>
    </Sheet>
  )
}