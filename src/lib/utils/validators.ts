import { z } from 'zod'

// User validation schemas
export const signUpSchema = z.object({
  displayName: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
})

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

export const resetPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
})

// Page validation schemas
export const pageSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title is too long'),
  slug: z.string()
    .min(1, 'Slug is required')
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
  description: z.string().max(200, 'Description is too long').optional(),
  status: z.enum(['draft', 'published', 'archived', 'pending_approval']),
})

export const seoSchema = z.object({
  metaTitle: z.string().max(60, 'Meta title is too long'),
  metaDescription: z.string().max(160, 'Meta description is too long'),
  metaKeywords: z.array(z.string()).max(10, 'Too many keywords'),
  ogTitle: z.string().max(60, 'OG title is too long'),
  ogDescription: z.string().max(160, 'OG description is too long'),
  ogImage: z.string().url().optional(),
  canonicalUrl: z.string().url().optional(),
})

// Element validation schemas
export const buttonSchema = z.object({
  text: z.string().min(1, 'Button text is required').max(50, 'Text is too long'),
  link: z.string().url('Invalid URL'),
  variant: z.enum(['primary', 'secondary', 'outline', 'ghost']),
  size: z.enum(['sm', 'md', 'lg']),
})

export const imageSchema = z.object({
  url: z.string().url('Invalid image URL'),
  alt: z.string().min(1, 'Alt text is required').max(100, 'Alt text is too long'),
  caption: z.string().max(200, 'Caption is too long').optional(),
  link: z.string().url('Invalid link URL').optional(),
})

// Utility validation functions
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validateUrl = (url: string): boolean => {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

export const validateSlug = (slug: string): boolean => {
  const slugRegex = /^[a-z0-9-]+$/
  return slugRegex.test(slug)
}

export const generateSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}