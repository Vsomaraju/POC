import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { fhirApi } from '../services/api'

interface Patient {
  id: string
  name?: Array<{ given?: string[]; family?: string }>
  gender?: string
  birthDate?: string
}

export default function Patients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [searchName, setSearchName] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    loadPatients()
  }, [])

  const loadPatients = async () => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fhirApi.getPatients(20)
      setPatients(response.data.entry?.map((e: any) => e.resource) || [])
    } catch (err: any) {
      setError('Failed to load patients')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchName.trim()) {
      loadPatients()
      return
    }

    setIsLoading(true)
    setError('')
    try {
      const response = await fhirApi.searchPatients(searchName)
      setPatients(response.data.entry?.map((e: any) => e.resource) || [])
    } catch (err: any) {
      setError('Failed to search patients')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const formatName = (patient: Patient) => {
    if (!patient.name || patient.name.length === 0) return 'Unknown'
    const name = patient.name[0]
    const given = name.given?.join(' ') || ''
    const family = name.family || ''
    return `${given} ${family}`.trim() || 'Unknown'
  }

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <h1 style={{ marginBottom: '2rem' }}>Patients</h1>

        <div className="card" style={{ marginBottom: '2rem' }}>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <input
              type="text"
              placeholder="Search by name..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              style={{ flex: 1 }}
            />
            <button onClick={handleSearch} className="btn-primary">
              Search
            </button>
            <button onClick={loadPatients} className="btn-secondary">
              Clear
            </button>
          </div>
        </div>

        {isLoading && <div className="loading">Loading patients...</div>}
        {error && <div className="error">{error}</div>}

        <div className="grid">
          {patients.map((patient) => (
            <div
              key={patient.id}
              className="card"
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/patients/${patient.id}`)}
            >
              <h3>{formatName(patient)}</h3>
              <p><strong>ID:</strong> {patient.id}</p>
              <p><strong>Gender:</strong> {patient.gender || 'Unknown'}</p>
              <p><strong>Birth Date:</strong> {patient.birthDate || 'Unknown'}</p>
            </div>
          ))}
        </div>

        {!isLoading && patients.length === 0 && (
          <div className="card">
            <p style={{ textAlign: 'center' }}>No patients found</p>
          </div>
        )}
      </div>
    </div>
  )
}

