import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { fhirApi } from '../services/api'

export default function Dashboard() {
  const [metadata, setMetadata] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadMetadata()
  }, [])

  const loadMetadata = async () => {
    try {
      const response = await fhirApi.getMetadata()
      setMetadata(response.data)
    } catch (err: any) {
      setError('Failed to load FHIR metadata')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Dashboard</h1>
        
        <div className="grid" style={{ marginBottom: '2rem' }}>
          <div className="card" style={{ cursor: 'pointer' }} onClick={() => navigate('/patients')}>
            <h3>👥 Patients</h3>
            <p>View and search patient records</p>
          </div>
          
          <div className="card">
            <h3>🏥 FHIR Server</h3>
            <p>Connected to FHIR API</p>
          </div>
          
          <div className="card">
            <h3>📊 Resources</h3>
            <p>Access FHIR resources</p>
          </div>
        </div>

        <div className="card">
          <h2>FHIR Server Information</h2>
          {isLoading && <p>Loading server information...</p>}
          {error && <p className="error">{error}</p>}
          {metadata && (
            <div style={{ marginTop: '1rem' }}>
              <p><strong>Status:</strong> {metadata.status || 'active'}</p>
              <p><strong>FHIR Version:</strong> {metadata.fhirVersion || 'R4'}</p>
              <p><strong>Publisher:</strong> {metadata.publisher || 'HAPI FHIR Server'}</p>
              <p><strong>Format:</strong> {metadata.format?.join(', ') || 'json'}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

