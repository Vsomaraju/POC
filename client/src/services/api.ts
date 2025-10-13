import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || '/api'

const api = axios.create({
  baseURL: API_URL,
})

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Handle 401 errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export const authApi = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  register: (name: string, email: string, password: string) =>
    api.post('/auth/register', { name, email, password }),
  getProfile: () => api.get('/auth/me'),
}

export const fhirApi = {
  getMetadata: () => api.get('/fhir/metadata'),
  getPatients: (limit: number = 10) => api.get(`/fhir/patients?limit=${limit}`),
  getPatientById: (id: string) => api.get(`/fhir/patients/${id}`),
  searchPatients: (name: string) => api.get(`/fhir/patients/search?name=${name}`),
  getObservations: (patientId: string, limit: number = 10) =>
    api.get(`/fhir/patients/${patientId}/observations?limit=${limit}`),
  getPractitioners: (limit: number = 10) => api.get(`/fhir/practitioners?limit=${limit}`),
}

export default api

