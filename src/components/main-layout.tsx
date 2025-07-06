import Sidebar from "./sidebar";
import MobileSidebar from "./mobile-sidebar";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Desktop Sidebar */}
      <Sidebar />
      
      {/* Mobile Header - Versi Ringan */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-40 bg-background/95 border border-border/50 rounded-2xl px-4 py-3 flex items-center justify-between shadow-lg">
        <h1 className="text-lg font-bold text-primary">mirai prjkt</h1>
        <div className="flex items-center gap-2">
          <MobileSidebar />
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-1 lg:p-16 md:ml-64 pt-24 md:pt-0 p-4 md:p-16">
        {children}
      </main>
    </div>
  );
}