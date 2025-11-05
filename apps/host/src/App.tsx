import { Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#242424', color: '#fff' }}>
      <nav style={{ 
        padding: '1rem', 
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        marginBottom: '2rem'
      }}>
        <h1 style={{ margin: 0 }}>🏥 FHIR POC - Micro Frontend Host</h1>
        <div style={{ marginTop: '1rem' }}>
          <Link to="/" style={{ color: '#646cff', marginRight: '1rem' }}>
            Home
          </Link>
          <a href="http://localhost:4301/" target="_blank" rel="noopener noreferrer" style={{ color: '#646cff', marginRight: '1rem' }}>
            Patient Portal
          </a>
        </div>
      </nav>

      <main style={{ padding: '0 2rem' }}>
        <Routes>
            <Route 
              path="/" 
              element={
                <div>
                  <h2>Welcome to FHIR POC Micro Frontend Platform</h2>
                  <p>This is the host application that loads micro frontends.</p>
                  <div style={{ marginTop: '2rem' }}>
                    <h3>Available Micro Frontends:</h3>
                    <ul>
                      <li>
                        <a href="http://localhost:4301/" target="_blank" rel="noopener noreferrer">Patient Portal</a> - 
                        Patient management and FHIR data access
                      </li>
                    </ul>
                  </div>
                  <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px' }}>
                    <p><strong>Note:</strong> For Module Federation to work:</p>
                    <ol style={{ textAlign: 'left', paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                      <li>Build patient-portal: <code>npm run build:patient-portal</code></li>
                      <li>Serve patient-portal in preview: <code>nx preview patient-portal</code> (port 4301)</li>
                      <li>Run host in dev mode: <code>npm run dev:host</code> (port 4200)</li>
                    </ol>
                  </div>
                </div>
              } 
            />
          </Routes>
      </main>
    </div>
  );
}

export default App;
