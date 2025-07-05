// Sidebar component
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Sidebar() {

    return (
        <aside className="w-64 p-4 space-y-2 fixed h-screen overflow-y-auto">
            <nav className="flex flex-col gap-2">
            <Link href="/">
                <Button variant="ghost" className="w-full justify-start">
                about
                </Button>
            </Link>
            <Link href="/blog">
                <Button variant="ghost" className="w-full justify-start">
                blog
                </Button>
            </Link>
            <Link href="/project">
                <Button variant="ghost" className="w-full justify-start">
                project
                </Button>
            </Link>
            </nav>
        </aside>
    )
}