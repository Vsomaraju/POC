import { z } from 'zod'

/**
 * Field types supported by the dynamic form builder
 */
export type FieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'tel'
  | 'url'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'date'

/**
 * Option for select, radio, and checkbox fields
 */
export interface FieldOption {
  label: string
  value: string | number
}

/**
 * Individual field configuration
 */
export interface FormFieldSchema {
  name: string
  label: string
  type: FieldType
  placeholder?: string
  defaultValue?: any
  options?: FieldOption[] // For select, radio, checkbox
  validation?: z.ZodType<any> // Zod validation schema
  gridColumn?: string // CSS grid column (e.g., "1 / 3" for spanning)
  helperText?: string // Help text below the field
  disabled?: boolean
  hidden?: boolean
}

/**
 * Complete form configuration
 */
export interface FormSchema {
  formId: string
  title?: string
  description?: string
  fields: FormFieldSchema[]
  submitButton?: {
    text: string
    loadingText?: string
  }
  validationSchema: z.ZodObject<any> // Complete Zod schema for the form
}

/**
 * Form submission handler type
 */
export type FormSubmitHandler<T = any> = (data: T) => Promise<void> | void

