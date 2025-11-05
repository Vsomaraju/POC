import { Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export const Navbar = () => {
  const { user, logout } = useAuth()

  return (
    <nav className="navbar">
      <h2>FHIR POC</h2>
      <div className="navbar-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/patients">Patients</Link>
        {user && (
          <>
            <span>Welcome, {user.name}</span>
            <button onClick={logout} className="btn-secondary">
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}

