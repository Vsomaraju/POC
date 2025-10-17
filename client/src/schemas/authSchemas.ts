import { z } from 'zod'
import { FormSchema } from '../types/formSchema'

/**
 * Login Form Schema
 * JSON configuration for the login form
 */
export const loginFormSchema: FormSchema = {
  formId: 'login-form',
  title: 'Login',
  fields: [
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'your@email.com',
      helperText: 'Enter your registered email address',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '••••••••',
      helperText: 'Minimum 6 characters',
    },
  ],
  submitButton: {
    text: 'Login',
    loadingText: 'Logging in...',
  },
  validationSchema: z.object({
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters'),
  }),
}

/**
 * Register Form Schema
 * JSON configuration for the registration form
 */
export const registerFormSchema: FormSchema = {
  formId: 'register-form',
  title: 'Register',
  description: 'Create a new account to get started',
  fields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      placeholder: 'John Doe',
      helperText: 'Enter your full name',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      placeholder: 'your@email.com',
      helperText: 'We will never share your email',
    },
    {
      name: 'password',
      label: 'Password',
      type: 'password',
      placeholder: '••••••••',
      helperText: 'At least 6 characters',
    },
    {
      name: 'confirmPassword',
      label: 'Confirm Password',
      type: 'password',
      placeholder: '••••••••',
      helperText: 'Re-enter your password',
    },
  ],
  submitButton: {
    text: 'Register',
    loadingText: 'Creating account...',
  },
  validationSchema: z.object({
    name: z
      .string()
      .min(1, 'Name is required')
      .min(2, 'Name must be at least 2 characters')
      .max(100, 'Name is too long'),
    email: z
      .string()
      .min(1, 'Email is required')
      .email('Please enter a valid email address'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(100, 'Password is too long'),
    confirmPassword: z
      .string()
      .min(1, 'Please confirm your password'),
  }).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  }),
}

/**
 * Example: Patient Search Form Schema
 * Demonstrates more field types
 */
export const patientSearchFormSchema: FormSchema = {
  formId: 'patient-search-form',
  title: 'Search Patients',
  description: 'Find patients in the FHIR database',
  fields: [
    {
      name: 'searchTerm',
      label: 'Patient Name',
      type: 'text',
      placeholder: 'Enter patient name...',
      helperText: 'Search by first or last name',
    },
    {
      name: 'gender',
      label: 'Gender',
      type: 'select',
      options: [
        { label: 'All', value: '' },
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ],
      defaultValue: '',
    },
    {
      name: 'limit',
      label: 'Results Limit',
      type: 'number',
      defaultValue: 10,
      placeholder: '10',
      helperText: 'Maximum number of results (1-50)',
    },
  ],
  submitButton: {
    text: 'Search',
    loadingText: 'Searching...',
  },
  validationSchema: z.object({
    searchTerm: z
      .string()
      .min(1, 'Please enter a search term')
      .min(2, 'Search term must be at least 2 characters'),
    gender: z.string().optional(),
    limit: z
      .number()
      .int('Must be a whole number')
      .min(1, 'Minimum 1 result')
      .max(50, 'Maximum 50 results')
      .default(10),
  }),
}

/**
 * Example: Contact Form with various field types
 * Demonstrates the flexibility of the form builder
 */
export const contactFormSchema: FormSchema = {
  formId: 'contact-form',
  title: 'Contact Us',
  description: 'We would love to hear from you',
  fields: [
    {
      name: 'name',
      label: 'Your Name',
      type: 'text',
      placeholder: 'John Doe',
    },
    {
      name: 'email',
      label: 'Email Address',
      type: 'email',
      placeholder: 'john@example.com',
    },
    {
      name: 'phone',
      label: 'Phone Number',
      type: 'tel',
      placeholder: '+1 (555) 123-4567',
      helperText: 'Optional',
    },
    {
      name: 'subject',
      label: 'Subject',
      type: 'select',
      options: [
        { label: 'General Inquiry', value: 'general' },
        { label: 'Technical Support', value: 'support' },
        { label: 'Billing Question', value: 'billing' },
        { label: 'Partnership', value: 'partnership' },
      ],
    },
    {
      name: 'message',
      label: 'Message',
      type: 'textarea',
      placeholder: 'Tell us how we can help...',
    },
    {
      name: 'newsletter',
      label: 'Subscribe to newsletter',
      type: 'checkbox',
      defaultValue: false,
      helperText: 'Stay updated with our latest news',
    },
  ],
  submitButton: {
    text: 'Send Message',
    loadingText: 'Sending...',
  },
  validationSchema: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    subject: z.string().min(1, 'Please select a subject'),
    message: z
      .string()
      .min(1, 'Message is required')
      .min(10, 'Message must be at least 10 characters'),
    newsletter: z.boolean().optional(),
  }),
}

