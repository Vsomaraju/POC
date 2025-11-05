import { Navigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ReactNode } from 'react'

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  return user ? <>{children}</> : <Navigate to="/login" />
}

