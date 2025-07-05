// Sidebar component
import { Button } from "@/components/ui/button";
import { Rss, ShieldCheck, UserRoundSearch } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";
import Link from "next/link";

export default function Sidebar() {

    return (
        <aside className="w-64 p-16 space-y-2 fixed h-screen overflow-y-auto bg-card border-r border-border flex flex-col">
            <div className="mb-8 flex flex-row items-center justify-between gap-4">
                <h1 className="text-xl font-bold text-primary whitespace-nowrap">Mirai Project</h1>
                <ThemeToggle />
            </div>
            <nav className="flex flex-col gap-2 flex-1">
            <Link href="/">
                <Button variant="ghost" className="w-full justify-start hover:bg-accent hover:text-accent-foreground">
                <UserRoundSearch />
                about
                </Button>
            </Link>
            <Link href="/blog">
                <Button variant="ghost" className="w-full justify-start hover:bg-accent hover:text-accent-foreground">
                <Rss />
                blog
                </Button>
            </Link>
            <Link href="/project">
                <Button variant="ghost" className="w-full justify-start hover:bg-accent hover:text-accent-foreground">
                    <ShieldCheck />
                project
                </Button>
            </Link>
            </nav>
            
        </aside>
    )
}