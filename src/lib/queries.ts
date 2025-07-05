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

// ...existing code...

export const projectsQuery = `
  *[_type == "project" && defined(slug.current)] | order(featured desc, completedAt desc, createdAt desc) {
    _id,
    title,
    slug,
    description,
    tech,
    githubUrl,
    liveUrl,
    image,
    featured,
    status,
    completedAt,
    createdAt
  }
`

export const projectBySlugQuery = `
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    description,
    longDescription,
    tech,
    githubUrl,
    liveUrl,
    image,
    gallery,
    featured,
    status,
    completedAt,
    createdAt
  }
`

export const featuredProjectsQuery = `
  *[_type == "project" && featured == true && defined(slug.current)] | order(completedAt desc) [0...3] {
    _id,
    title,
    slug,
    description,
    tech,
    githubUrl,
    liveUrl,
    image,
    status
  }
`