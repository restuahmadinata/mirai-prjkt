import Layout from "@/components/main-layout";
import { Card } from "@/components/ui/card";
import Link from "next/link";

// Mock data untuk blog posts
const blogPosts = [
  {
    id: 1,
    slug: "memulai-journey-sebagai-developer",
    title: "Memulai Journey sebagai Developer",
    excerpt: "Cerita tentang perjalanan saya belajar programming dari nol hingga sekarang.",
    date: "2025-01-15",
    readTime: "5 min read"
  },
  {
    id: 2,
    slug: "tips-tricks-nextjs-untuk-pemula",
    title: "Tips & Tricks Next.js untuk Pemula",
    excerpt: "Beberapa tips yang berguna untuk memulai pengembangan web dengan Next.js.",
    date: "2025-01-10",
    readTime: "8 min read"
  },
  {
    id: 3,
    slug: "mengapa-typescript-penting",
    title: "Mengapa TypeScript Penting",
    excerpt: "Alasan mengapa TypeScript menjadi pilihan utama untuk pengembangan JavaScript.",
    date: "2025-01-05",
    readTime: "6 min read"
  }
];

export default function BlogPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Blog</h1>
          <p className="text-gray-600">Thoughts, tutorials, dan pengalaman sehari-hari</p>
        </div>
        
        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Card key={post.id} className="p-6 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <Link href={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold hover:text-blue-600 cursor-pointer">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-600 leading-relaxed">
                  {post.excerpt}
                </p>
                <Link href={`/blog/${post.slug}`}>
                  <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                    Read more →
                  </button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
        
        <div className="text-center py-8">
          <p className="text-gray-500">More posts coming soon...</p>
        </div>
      </div>
    </Layout>
  );
}
