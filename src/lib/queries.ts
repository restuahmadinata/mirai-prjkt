// lib/queries.ts
export const blogPostsQuery = `
  *[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    author->{
      name,
      image
    },
    mainImage,
    categories
  }
`

export const blogPostBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    content,
    publishedAt,
    readTime,
    author->{
      name,
      image
    },
    mainImage,
    categories
  }
`