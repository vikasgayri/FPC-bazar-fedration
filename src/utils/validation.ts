import { z } from 'zod'

export const phoneRx = /^[6-9]\d{9}$/
export const pinRx = /^[1-9]\d{5}$/

export const phone = z
  .string()
  .trim()
  .transform((v) => v.replace(/[\s-]/g, '').replace(/^\+?91/, ''))
  .refine((v) => phoneRx.test(v), 'Enter a valid 10-digit Indian mobile number')

export const email = z.string().trim().email('Enter a valid email address')
export const reqText = (min = 2, msg = 'This field is required') => z.string().trim().min(min, msg)

export const INDIAN_STATES = [
  'Rajasthan',
  'Madhya Pradesh',
  'Gujarat',
  'Maharashtra',
  'Uttar Pradesh',
  'Haryana',
  'Punjab',
  'Bihar',
  'Chhattisgarh',
  'Jharkhand',
  'Odisha',
  'Karnataka',
  'Andhra Pradesh',
  'Telangana',
  'Tamil Nadu',
  'Kerala',
  'West Bengal',
  'Assam',
  'Uttarakhand',
  'Himachal Pradesh',
  'Delhi',
  'Other',
]

export const checkoutSchema = z.object({
  fullName: reqText(3, 'Please enter your full name'),
  email,
  phone,
  line1: reqText(5, 'Please enter house / street'),
  line2: z.string().optional(),
  city: reqText(2, 'City is required'),
  state: reqText(2, 'Select a state'),
  pincode: z.string().trim().regex(pinRx, 'Enter a valid 6-digit PIN code'),
  paymentMethod: z.enum(['UPI', 'CARD', 'NETBANKING', 'COD']),
  upiId: z.string().optional(),
})
export type CheckoutForm = z.input<typeof checkoutSchema>

export const loginSchema = z.object({ email, password: z.string().min(6, 'Minimum 6 characters') })
export type LoginForm = z.infer<typeof loginSchema>

export const signupSchema = z
  .object({
    name: reqText(3, 'Please enter your full name'),
    email,
    phone,
    password: z.string().min(6, 'Minimum 6 characters'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, { path: ['confirm'], message: 'Passwords do not match' })
export type SignupForm = z.input<typeof signupSchema>

export const enquirySchema = z.object({
  type: z.enum(['PARTNERSHIP', 'BULK_PURCHASE', 'PPP_PROJECT', 'CBG_INVESTMENT', 'CSR', 'GENERAL']),
  name: reqText(3, 'Please enter your name'),
  organisation: z.string().optional(),
  email,
  phone,
  city: z.string().optional(),
  message: reqText(15, 'Please write at least 15 characters'),
})
export type EnquiryForm = z.input<typeof enquirySchema>
