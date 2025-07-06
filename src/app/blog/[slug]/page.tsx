import Layout from "@/components/main-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Calendar, Clock, User, Share2 } from "lucide-react";
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
  return new Date(dateString).toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

const portableTextComponents = {
  types: {
    image: ({ value }: any) => (
      <div className="my-4 sm:my-6 w-full overflow-hidden">
        <Image
          src={urlFor(value).width(600).height(300).url()}
          alt={value.alt || 'Blog image'}
          width={600}
          height={300}
          className="rounded-lg w-full h-auto max-w-full object-cover"
          sizes="100vw"
        />
        {value.caption && (
          <p className="text-sm sm:text-base text-muted-foreground text-center mt-2 px-2 break-words">{value.caption}</p>
        )}
      </div>
    ),
    code: ({ value }: any) => (
      <div className="my-4 sm:my-6 overflow-x-auto">
        <pre className="bg-muted p-3 sm:p-4 rounded text-sm sm:text-base font-mono whitespace-pre-wrap break-all">
          <code>{value.code}</code>
        </pre>
      </div>
    ),
  },
  block: {
    h1: ({ children }: any) => (
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-foreground break-words">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold mt-5 sm:mt-6 mb-2 sm:mb-3 text-foreground break-words">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-base sm:text-lg lg:text-xl font-semibold mt-4 sm:mt-5 mb-2 text-foreground break-words">{children}</h3>
    ),
    normal: ({ children }: any) => (
      <p className="mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base lg:text-lg text-muted-foreground break-words">{children}</p>
    ),
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-3 sm:border-l-4 border-primary pl-3 sm:pl-4 my-3 sm:my-4 italic text-sm sm:text-base lg:text-lg text-muted-foreground break-words">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }: any) => (
      <ul className="list-disc pl-4 sm:pl-6 mb-3 sm:mb-4 space-y-2 overflow-hidden">{children}</ul>
    ),
    number: ({ children }: any) => (
      <ol className="list-decimal pl-4 sm:pl-6 mb-3 sm:mb-4 space-y-2 overflow-hidden">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }: any) => (
      <li className="text-sm sm:text-base lg:text-lg text-muted-foreground break-words">{children}</li>
    ),
    number: ({ children }: any) => (
      <li className="text-sm sm:text-base lg:text-lg text-muted-foreground break-words">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }: any) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
    em: ({ children }: any) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }: any) => (
      <code className="bg-muted px-2 py-1 rounded text-sm sm:text-base font-mono text-foreground border break-all whitespace-pre-wrap">{children}</code>
    ),
    link: ({ children, value }: any) => (
      <a 
        href={value.href} 
        className="text-primary underline hover:text-primary/80 transition-colors break-all"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <article className="space-y-6 sm:space-y-8">
          <div>
            <Link href="/blog">
              <Button variant="ghost" className="mb-4 sm:mb-6 px-2">
                <ArrowLeft size={16} className="mr-2" />
                <span className="hidden sm:inline">Back to Blog</span>
                <span className="sm:hidden">Back</span>
              </Button>
            </Link>
            
            <div className="space-y-4 sm:space-y-6">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
                {blogPost.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm sm:text-base lg:text-lg text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar size={16} className="sm:size-5 lg:size-6" />
                  <span>{formatDate(blogPost.publishedAt)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock size={16} className="sm:size-5 lg:size-6" />
                  <span>{blogPost.readTime} min read</span>
                </div>
                {blogPost.author && (
                  <div className="flex items-center gap-1">
                    <User size={16} className="sm:size-5 lg:size-6" />
                    <span>by {blogPost.author.name}</span>
                  </div>
                )}
              </div>

              {blogPost.mainImage && (
                <div className="mt-4 sm:mt-6">
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
          

          <div className="w-full overflow-x-hidden min-w-0">
            <div className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none prose-headings:break-words prose-p:break-words prose-li:break-words prose-code:break-all prose-pre:overflow-x-auto prose-pre:text-xs prose-img:max-w-full prose-img:h-auto">
              <PortableText 
                value={blogPost.content} 
                components={portableTextComponents}
              />
            </div>
          </div>

          
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="w-full sm:w-auto">
                  <div className="flex items-center gap-2 mb-3">
                    <Share2 size={18} className="sm:size-5" />
                    <p className="text-base sm:text-lg font-medium">Share this post:</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" className="text-sm sm:text-base">
                      Twitter
                    </Button>
                    <Button variant="outline" size="sm" className="text-sm sm:text-base">
                      LinkedIn
                    </Button>
                    <Button variant="outline" size="sm" className="text-sm sm:text-base">
                      Copy Link
                    </Button>
                  </div>
                </div>
                
                <Separator className="sm:hidden" />
                
                <Link href="/blog" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto text-base sm:text-lg">
                    Read More Posts
                  </Button>
                </Link>
              </div>
        </article>
      </div>
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