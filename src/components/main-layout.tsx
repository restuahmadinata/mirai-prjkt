import Sidebar from "./sidebar";
import { ThemeToggle } from "./theme-toggle";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <div className="flex justify-end mb-6">
          <ThemeToggle />
        </div>
        {children}
      </main>
    </div>
  );
}
