import Layout from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client, urlFor } from "@/lib/sanity";
import { blogPostBySlugQuery } from "@/lib/queries";
import { BlogPost } from "@/lib/types";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

async function getBlogPost(slug: string): Promise<BlogPost | null> {
  return await client.fetch(blogPostBySlugQuery, { slug });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Portable Text components for custom rendering
const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8">
        <Image
          src={urlFor(value).width(800).height(400).url()}
          alt={value.alt || 'Blog image'}
          width={800}
          height={400}
          className="rounded-lg w-full h-auto"
        />
        {value.caption && (
          <p className="text-sm text-muted-foreground text-center mt-2">{value.caption}</p>
        )}
      </div>
    ),
  },
  block: {
    h2: ({ children }: any) => (
      <h2 className="text-2xl font-semibold mt-8 mb-4 text-foreground">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-xl font-semibold mt-6 mb-3 text-foreground">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-4 leading-relaxed text-muted-foreground">{children}</p>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-6 mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-6 mb-4 space-y-1">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-muted-foreground">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="text-muted-foreground">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    code: ({ children }: any) => (
      <code className="bg-muted px-1 py-0.5 rounded text-sm font-mono text-foreground">{children}</code>
    ),
  },
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const blogPost = await getBlogPost(params.slug);

  if (!blogPost) {
    notFound();
  }

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
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar size={16} />
                <span>{formatDate(blogPost.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{blogPost.readTime} min read</span>
              </div>
              {blogPost.author && (
                <div className="flex items-center gap-1">
                  <User size={16} />
                  <span>by {blogPost.author.name}</span>
                </div>
              )}
            </div>

            {blogPost.mainImage && (
              <div className="mt-6">
                <Image
                  src={urlFor(blogPost.mainImage).width(1200).height(600).url()}
                  alt={blogPost.title}
                  width={1200}
                  height={600}
                  className="rounded-lg w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>
        
        <div className="prose prose-lg max-w-none">
          <PortableText 
            value={blogPost.content} 
            components={portableTextComponents}
          />
        </div>
        
        <div className="mt-12 pt-8 border-t border-border">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-muted-foreground">Share this post:</p>
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

// Generate static params for static generation
export async function generateStaticParams() {
  const posts: BlogPost[] = await client.fetch(`
    *[_type == "post" && defined(slug.current)][].slug.current
  `);

  return posts.map((slug) => ({
    slug,
  }));
}