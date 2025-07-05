// app/layout.tsx
import "./globals.css";
import { IBM_Plex_Sans_Condensed } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";


const ibm = IBM_Plex_Sans_Condensed({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-ibm-condenseed",
});

export const metadata = {
  title: "Mirai Project",
  description: "Website pribadi + blog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={ibm.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
