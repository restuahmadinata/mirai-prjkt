// Sidebar component
import { Button } from "@/components/ui/button";
import { Rss, ShieldCheck, UserRoundSearch } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="hidden md:flex w-64 p-16 space-y-2 fixed h-screen overflow-y-auto bg-card border-r border-border flex-col">
            <div className="mb-8 flex flex-row items-center gap-2">
                <h1 className="text-xl font-bold text-primary whitespace-nowrap">mirai prjkt</h1>
                <ThemeToggle />
            </div>
            <nav className="flex flex-col gap-2 flex-1">
                <Link href="/">
                    <Button variant="ghost" className="w-full justify-start hover:bg-accent hover:text-accent-foreground" style={{ fontWeight: 700 }}>
                        <UserRoundSearch className="mr-2 h-4 w-4" />
                        <span className="font-black">about</span>
                    </Button>
                </Link>
                <Link href="/blog">
                    <Button variant="ghost" className="w-full justify-start hover:bg-accent hover:text-accent-foreground" style={{ fontWeight: 700 }}>
                        <Rss className="mr-2 h-4 w-4" />
                        <span className="font-black">blog</span>
                    </Button>
                </Link>
                <Link href="/project">
                    <Button variant="ghost" className="w-full justify-start hover:bg-accent hover:text-accent-foreground" style={{ fontWeight: 700 }}>
                        <ShieldCheck className="mr-2 h-4 w-4" />
                        <span className="font-black">project</span>
                    </Button>
                </Link>
            </nav>
        </aside>
    )
}