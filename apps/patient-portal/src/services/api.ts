import axios from 'axios'

// Use full backend URL if VITE_API_URL is not set, or if it's a relative path in preview mode
const getApiUrl = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  
  // If VITE_API_URL is set and is a full URL, use it
  if (envUrl && (envUrl.startsWith('http://') || envUrl.startsWith('https://'))) {
    return envUrl;
  }
  
  // If VITE_API_URL is set as relative path, use it (works with proxy in dev mode)
  if (envUrl) {
    return envUrl;
  }
  
  // Default: use full backend URL (for preview mode or when no env var is set)
  return 'http://localhost:3001/api';
};

const API_URL = getApiUrl();

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

