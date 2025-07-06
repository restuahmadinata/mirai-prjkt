import Layout from "@/components/main-layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { client } from "@/lib/sanity";
import { blogPostsQuery } from "@/lib/queries";
import { BlogPost } from "@/lib/types";
import { urlFor } from "@/lib/sanity";
import Image from "next/image";
import { Calendar, Clock, User, ArrowRight } from "lucide-react";

async function getBlogPosts(): Promise<BlogPost[]> {
  return await client.fetch(blogPostsQuery);
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-EN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

export default async function BlogPage() {
  const blogPosts = await getBlogPosts();

  return (
    <Layout>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">blog</h1>
          <p className="text-sm sm:text-base text-muted-foreground">reflections, learning guides, and daily insights</p>
        </div>
        
        <div className="grid gap-4 sm:gap-6">
          {blogPosts.map((post) => (
            <Card key={post._id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {post.mainImage && (
                    <div className="flex-shrink-0 w-full sm:w-48 lg:w-56">
                      <Image
                        src={urlFor(post.mainImage).width(250).height(180).url()}
                        alt={post.title}
                        width={250}
                        height={180}
                        className="rounded-lg object-cover w-full h-48 sm:h-36 lg:h-40"
                      />
                    </div>
                  )}
                  
                  <div className="flex-1 space-y-3 sm:space-y-4">
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} className="sm:size-4" />
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                      <span className="hidden sm:inline">•</span>
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="sm:size-4" />
                        <span>{post.readTime} min read</span>
                      </div>
                      {post.author && (
                        <>
                          <span className="hidden sm:inline">•</span>
                          <div className="flex items-center gap-1">
                            <User size={14} className="sm:size-4" />
                            <span>by {post.author.name}</span>
                          </div>
                        </>
                      )}
                    </div>
                    
                    <Link href={`/blog/${post.slug.current}`}>
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold hover:text-primary cursor-pointer line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>
                    
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    {post.categories && post.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {post.categories.map((category) => (
                          <Badge
                            key={category}
                            variant="secondary"
                            className="bg-primary/10 text-primary text-xs border border-primary/20"
                          >
                            {category}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {blogPosts.length === 0 && (
          <Card className="dark:border-2 dark:border-white">
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground">no blog posts found.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </Layout>
  );
}