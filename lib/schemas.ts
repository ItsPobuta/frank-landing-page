import { z } from 'zod'

export const baseSchema = z.object({
  name: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().regex(/^\(\d{3}\) \d{3}-\d{4}$/, 'Please enter a valid phone number'),
  company: z.string().optional(),
  job_title: z.string().optional(),
})

export const orgSchema = baseSchema.extend({
  company: z.string().min(1, 'Please enter your company or organization'),
  job_title: z.string().min(1, 'Please enter your job title'),
})
