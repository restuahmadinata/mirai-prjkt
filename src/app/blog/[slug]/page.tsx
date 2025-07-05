import Layout from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";

// Mock data untuk blog post detail
const blogPost = {
  id: 1,
  title: "Memulai Journey sebagai Developer",
  content: `
    <p>Menjadi seorang developer bukanlah perjalanan yang mudah, namun sangat rewarding. Dalam artikel ini, saya akan berbagi pengalaman saya dalam memulai karir sebagai programmer.</p>
    
    <h2>Mengapa Memilih Programming?</h2>
    <p>Dulu saya tidak pernah membayangkan akan menjadi seorang programmer. Awalnya hanya iseng-iseng mencoba membuat website sederhana, tapi ternyata sangat menarik!</p>
    
    <h2>Langkah Pertama</h2>
    <p>Langkah pertama yang saya lakukan adalah:</p>
    <ul>
      <li>Belajar HTML dan CSS dasar</li>
      <li>Mencoba JavaScript untuk interaktivitas</li>
      <li>Membuat project kecil-kecilan</li>
      <li>Join komunitas developer lokal</li>
    </ul>
    
    <h2>Tips untuk Pemula</h2>
    <p>Beberapa tips yang bisa saya bagikan:</p>
    <ol>
      <li><strong>Konsisten belajar</strong> - Dedikasikan waktu setiap hari untuk coding</li>
      <li><strong>Practice makes perfect</strong> - Buat project sebanyak mungkin</li>
      <li><strong>Join komunitas</strong> - Berteman dengan developer lain sangat membantu</li>
      <li><strong>Jangan takut bertanya</strong> - Stack Overflow dan forum lain adalah teman terbaik</li>
    </ol>
    
    <h2>Kesimpulan</h2>
    <p>Journey sebagai developer memang challenging, tapi sangat menyenangkan. Yang terpenting adalah konsistensi dan never stop learning!</p>
  `,
  date: "2025-01-15",
  readTime: "5 min read",
  author: "Mirai"
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  return (
    <Layout>
      <article className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-4 px-2">
              <ArrowLeft size={16} className="mr-2" />
              Back to Blog
            </Button>
          </Link>
          
          <div className="space-y-4">
            <h1 className="text-4xl font-bold leading-tight">
              {blogPost.title}
            </h1>
            
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{blogPost.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{blogPost.readTime}</span>
              </div>
              <span>by {blogPost.author}</span>
            </div>
          </div>
        </div>
        
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />
        
        <div className="mt-12 pt-8 border-t">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-gray-600">Share this post:</p>
              <div className="flex gap-2 mt-2">
                <Button variant="outline" size="sm">
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm">
                  Copy Link
                </Button>
              </div>
            </div>
            
            <Link href="/blog">
              <Button>
                Read More Posts
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </Layout>
  );
}
