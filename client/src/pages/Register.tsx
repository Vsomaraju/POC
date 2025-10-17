import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import DynamicForm from '../components/DynamicForm'
import { registerFormSchema } from '../schemas/authSchemas'

export default function Register() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (data: any) => {
    setError('')
    setIsLoading(true)

    try {
      await register(data.name, data.email, data.password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <div className="card">
          <DynamicForm
            schema={registerFormSchema}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
          <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#646cff' }}>
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

