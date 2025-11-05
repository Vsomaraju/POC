import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import PatientDetail from './pages/PatientDetail';
import { PrivateRoute } from './components/PrivateRoute';
import { Navbar } from './components/Navbar';

const PatientRoutesContent: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients"
          element={
            <PrivateRoute>
              <Patients />
            </PrivateRoute>
          }
        />
        <Route
          path="/patients/:id"
          element={
            <PrivateRoute>
              <PatientDetail />
            </PrivateRoute>
          }
        />
        <Route path="/" element={<Navigate to={user ? '/dashboard' : '/login'} replace />} />
      </Routes>
    </div>
  );
};

export const PatientRoutes: React.FC = () => {
  return (
    <AuthProvider>
      <PatientRoutesContent />
    </AuthProvider>
  );
};

export default PatientRoutes;
