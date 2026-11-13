import { z } from 'zod'

export const phoneRx = /^[6-9]\d{9}$/
export const pinRx = /^[1-9]\d{5}$/

export const phone = z
  .string()
  .trim()
  // Accept "98765 43210", "+91 98765 43210", "09876543210". Only strip a country/trunk prefix when the
  // number is longer than 10 digits — a plain mobile can itself start with 91 (e.g. 91234 56789).
  .transform((v) => {
    const d = v.replace(/[\s-]/g, '')
    return /^(\+?91|0)\d{10}$/.test(d) ? d.slice(-10) : d
  })
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

/** Buyer trade enquiry (FPC Bazaar market linkage). No address/payment — FPOs arrange delivery directly. */
export const tradeEnquirySchema = z.object({
  buyerName: reqText(3, 'Please enter your full name'),
  organisation: z.string().optional(),
  buyerType: z.enum(['RETAILER', 'WHOLESALER', 'PROCESSOR', 'EXPORTER', 'INSTITUTION', 'HORECA', 'OTHER']),
  email,
  phone,
  city: reqText(2, 'City is required'),
  state: reqText(2, 'Select a state'),
  pincode: z
    .string()
    .trim()
    .optional()
    .refine((v) => !v || pinRx.test(v), 'Enter a valid 6-digit PIN code'),
  frequency: z.enum(['ONE_TIME', 'MONTHLY', 'SEASONAL']),
  requiredBy: z.string().optional(),
  message: z.string().max(600, 'Please keep it under 600 characters').optional(),
})
export type TradeEnquiryForm = z.input<typeof tradeEnquirySchema>

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
