import { Routes, Route, Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h2>Welcome to FHIR POC Micro Frontend Platform</h2>
      <p>This is the host application that loads micro frontends.</p>
    </div>
  );
}

function PatientPortal() {
  return (
    <div>
      <h2>Patient Portal</h2>
      <p>
        This module allows patient management and FHIR data access.
        <br />
        External link:{" "}
        <a
          href="http://localhost:4301/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "#646cff" }}
        >
          Open Patient Portal
        </a>
      </p>
    </div>
  );
}

function Settings() {
  return (
    <div>
      <h2>Settings</h2>
      <p>Configuration and environment options will appear here.</p>
    </div>
  );
}

function App() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        backgroundColor: "#242424",
        color: "#fff",
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          backgroundColor: "#1b1b1b",
          borderRight: "1px solid rgba(255,255,255,0.1)",
          padding: "1rem",
        }}
      >
        <h1 style={{ fontSize: "1.2rem", marginBottom: "1.5rem" }}>
          🏥 FHIR POC
        </h1>
        <nav style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Link to="/" style={linkStyle}>
            Home
          </Link>
          <Link to="/patient-portal" style={linkStyle}>
            Patient Portal
          </Link>
          <Link to="/settings" style={linkStyle}>
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patient-portal" element={<PatientPortal />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>
    </div>
  );
}

const linkStyle = {
  color: "#646cff",
  textDecoration: "none",
  fontWeight: "500",
  padding: "0.5rem 0",
};

export default App;
