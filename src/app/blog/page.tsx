import Layout from "@/components/main-layout";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { blogPostsQuery } from "@/lib/queries";
import { BlogPost } from "@/lib/types";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";

async function getBlogPosts(): Promise<BlogPost[]> {
  return await client.fetch(blogPostsQuery);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">blog</h1>
          <p className="text-gray-600">reflections, learning guides, and daily insights</p>
        </div>
        
        <div className="grid gap-6">
          {blogPosts.map((post) => (
            <Card key={post._id} className="p-6 hover:shadow-md transition-shadow">
              <div className="flex gap-6">
                {post.mainImage && (
                  <div className="flex-shrink-0">
                    <Image
                      src={urlFor(post.mainImage).width(200).height(150).url()}
                      alt={post.title}
                      width={200}
                      height={150}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}
                
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span>{formatDate(post.publishedAt)}</span>
                    <span>•</span>
                    <span>{post.readTime} min read</span>
                    {post.author && (
                      <>
                        <span>•</span>
                        <span>by {post.author.name}</span>
                      </>
                    )}
                  </div>
                  
                  <Link href={`/blog/${post.slug.current}`}>
                    <h2 className="text-xl font-semibold hover:text-blue-600 cursor-pointer">
                      {post.title}
                    </h2>
                  </Link>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {post.categories.map((category) => (
                        <span
                          key={category}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <Link href={`/blog/${post.slug.current}`}>
                    <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                      Read more →
                    </button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {blogPosts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No blog posts found. Create your first post in Sanity Studio!</p>
          </div>
        )}
      </div>
    </Layout>
  );
}