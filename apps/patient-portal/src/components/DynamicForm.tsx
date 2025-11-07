import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormSchema, FormFieldSchema, FormSubmitHandler } from '../types/formSchema'
import { isSSR, isHydration, getRenderEnvironment } from '@shared/utils'

interface DynamicFormProps {
  schema: FormSchema
  onSubmit: FormSubmitHandler
  isLoading?: boolean
  error?: string
  successMessage?: string
}

export default function DynamicForm({
  schema,
  onSubmit,
  isLoading = false,
  error,
  successMessage,
}: DynamicFormProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [renderEnv, setRenderEnv] = useState<'server' | 'client' | 'hydration'>('server')

  // Detect SSR and hydration
  useEffect(() => {
    setIsMounted(true)
    setRenderEnv(getRenderEnvironment())
  }, [])

  const isServerRender = isSSR()
  const isHydrating = isHydration()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema.validationSchema),
    defaultValues: schema.fields.reduce((acc, field) => {
      if (field.defaultValue !== undefined) {
        acc[field.name] = field.defaultValue
      }
      return acc
    }, {} as Record<string, any>),
  })

  const renderField = (field: FormFieldSchema) => {
    if (field.hidden) return null

    const hasError = !!errors[field.name]
    const errorMessage = errors[field.name]?.message as string | undefined

    // Base input props
    const baseProps = {
      id: field.name,
      ...register(field.name),
      placeholder: field.placeholder,
      disabled: field.disabled || isLoading,
      style: field.gridColumn ? { gridColumn: field.gridColumn } : undefined,
    }

    return (
      <div 
        key={field.name} 
        className="form-group"
        style={field.gridColumn ? { gridColumn: field.gridColumn } : undefined}
      >
        <label htmlFor={field.name}>
          {field.label}
        </label>

        {/* Text-based inputs */}
        {['text', 'email', 'password', 'number', 'tel', 'url', 'date'].includes(field.type) && (
          <input
            type={field.type}
            {...baseProps}
            className={hasError ? 'error' : ''}
          />
        )}

        {/* Textarea */}
        {field.type === 'textarea' && (
          <textarea
            {...baseProps}
            rows={4}
            className={hasError ? 'error' : ''}
          />
        )}

        {/* Select dropdown */}
        {field.type === 'select' && (
          <select
            {...baseProps}
            className={hasError ? 'error' : ''}
          >
            <option value="">Select...</option>
            {field.options?.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}

        {/* Radio buttons */}
        {field.type === 'radio' && (
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {field.options?.map((option) => (
              <label 
                key={option.value}
                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
              >
                <input
                  type="radio"
                  {...register(field.name)}
                  value={option.value}
                  disabled={field.disabled || isLoading}
                />
                {option.label}
              </label>
            ))}
          </div>
        )}

        {/* Checkbox */}
        {field.type === 'checkbox' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <input
              type="checkbox"
              {...register(field.name)}
              disabled={field.disabled || isLoading}
            />
            {field.helperText && <span style={{ fontSize: '0.9rem' }}>{field.helperText}</span>}
          </div>
        )}

        {/* Helper text */}
        {field.helperText && field.type !== 'checkbox' && (
          <small style={{ display: 'block', marginTop: '0.25rem', color: '#666', fontSize: '0.85rem' }}>
            {field.helperText}
          </small>
        )}

        {/* Error message */}
        {hasError && (
          <small style={{ display: 'block', marginTop: '0.25rem', color: '#f44336' }}>
            {errorMessage}
          </small>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%' }}>
      {/* SSR Detection Indicator (for debugging - remove in production) */}
      {process.env.NODE_ENV === 'development' && isMounted && (
        <div 
          style={{ 
            fontSize: '0.75rem', 
            padding: '0.25rem 0.5rem', 
            marginBottom: '0.5rem',
            backgroundColor: isServerRender ? '#ff9800' : isHydrating ? '#2196f3' : '#4caf50',
            color: 'white',
            borderRadius: '4px',
            textAlign: 'center'
          }}
        >
          Render: {renderEnv} {isServerRender ? '(SSR)' : isHydrating ? '(Hydrating)' : '(Client)'}
        </div>
      )}

      {/* Form Title */}
      {schema.title && (
        <h1 style={{ marginBottom: '0.5rem', textAlign: 'center' }}>
          {schema.title}
        </h1>
      )}

      {/* Form Description */}
      {schema.description && (
        <p style={{ marginBottom: '2rem', textAlign: 'center', color: '#666' }}>
          {schema.description}
        </p>
      )}

      {/* Form Fields */}
      <div style={{ display: 'grid', gap: '1rem' }}>
        {schema.fields.map(renderField)}
      </div>

      {/* Global Error Message */}
      {error && (
        <div className="error" style={{ marginTop: '1rem' }}>
          {error}
        </div>
      )}

      {/* Success Message */}
      {successMessage && (
        <div 
          style={{ 
            marginTop: '1rem', 
            padding: '0.75rem', 
            backgroundColor: '#4caf50', 
            color: 'white', 
            borderRadius: '4px' 
          }}
        >
          {successMessage}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        className="btn-primary"
        disabled={isLoading || (isServerRender && !isMounted)}
        style={{ width: '100%', marginTop: '1rem' }}
      >
        {isLoading
          ? schema.submitButton?.loadingText || 'Loading...'
          : schema.submitButton?.text || 'Submit'}
      </button>
    </form>
  )
}

