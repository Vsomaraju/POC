import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import DynamicForm from '../components/DynamicForm'
import { loginFormSchema } from '../schemas/authSchemas'

export default function Login() {
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (data: any) => {
    setError('')
    setIsLoading(true)

    try {
      await login(data.email, data.password)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '400px', margin: '2rem auto' }}>
        <div className="card">
          <DynamicForm
            schema={loginFormSchema}
            onSubmit={handleSubmit}
            isLoading={isLoading}
            error={error}
          />
          <p style={{ marginTop: '1.5rem', textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#646cff' }}>
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

