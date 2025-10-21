import { useEffect, useState, useCallback } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Navbar } from '../components/Navbar'
import { fhirApi } from '../services/api'

export default function PatientDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [patient, setPatient] = useState<any>(null)
  const [observations, setObservations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPatientData = useCallback(async () => {
    if (!id) return

    setIsLoading(true)
    setError('')
    try {
      const [patientRes, obsRes] = await Promise.all([
        fhirApi.getPatientById(id),
        fhirApi.getObservations(id, 10).catch(() => ({ data: { entry: [] } })),
      ])
      
      setPatient(patientRes.data)
      setObservations(obsRes.data.entry?.map((e: any) => e.resource) || [])
    } catch (err: any) {
      setError('Failed to load patient data')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    if (id) {
      loadPatientData()
    }
  }, [id, loadPatientData])

  const formatName = () => {
    if (!patient?.name || patient.name.length === 0) return 'Unknown'
    const name = patient.name[0]
    const given = name.given?.join(' ') || ''
    const family = name.family || ''
    return `${given} ${family}`.trim() || 'Unknown'
  }

  if (isLoading) {
    return (
      <div className="app">
        <Navbar />
        <div className="container">
          <div className="loading">Loading patient details...</div>
        </div>
      </div>
    )
  }

  if (error || !patient) {
    return (
      <div className="app">
        <Navbar />
        <div className="container">
          <div className="error">{error || 'Patient not found'}</div>
          <button onClick={() => navigate('/patients')} className="btn-primary">
            Back to Patients
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="app">
      <Navbar />
      <div className="container">
        <button onClick={() => navigate('/patients')} className="btn-secondary" style={{ marginBottom: '1rem' }}>
          ← Back to Patients
        </button>

        <h1 style={{ marginBottom: '2rem' }}>{formatName()}</h1>

        <div className="card">
          <h2>Patient Information</h2>
          <div style={{ marginTop: '1rem' }}>
            <p><strong>ID:</strong> {patient.id}</p>
            <p><strong>Gender:</strong> {patient.gender || 'Unknown'}</p>
            <p><strong>Birth Date:</strong> {patient.birthDate || 'Unknown'}</p>
            {patient.address && patient.address.length > 0 && (
              <p><strong>Address:</strong> {patient.address[0].city || ''}, {patient.address[0].state || ''} {patient.address[0].postalCode || ''}</p>
            )}
            {patient.telecom && patient.telecom.length > 0 && (
              <p><strong>Contact:</strong> {patient.telecom[0].value || 'N/A'}</p>
            )}
          </div>
        </div>

        <div className="card">
          <h2>Observations</h2>
          {observations.length === 0 ? (
            <p style={{ marginTop: '1rem' }}>No observations found for this patient</p>
          ) : (
            <div style={{ marginTop: '1rem' }}>
              {observations.map((obs, index) => (
                <div key={obs.id || index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                  <p><strong>Type:</strong> {obs.code?.text || obs.code?.coding?.[0]?.display || 'Unknown'}</p>
                  {obs.valueQuantity && (
                    <p><strong>Value:</strong> {obs.valueQuantity.value} {obs.valueQuantity.unit}</p>
                  )}
                  <p><strong>Date:</strong> {obs.effectiveDateTime || 'Unknown'}</p>
                  <p><strong>Status:</strong> {obs.status || 'Unknown'}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

