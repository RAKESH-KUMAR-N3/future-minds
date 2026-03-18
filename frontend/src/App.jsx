import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Login from './pages/Login';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Tests from './pages/Tests';
import Navbar from './components/Navbar';
import TestRunner from './pages/TestRunner';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  if (user.role === 'admin') return <Navigate to="/admin" replace />;
  return <Navigate to="/student" replace />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<DashboardRedirect />} />
          
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
          
          <Route 
            path="/student" 
            element={
              <ProtectedRoute allowedRoles={['sub-junior', 'junior', 'senior']}>
                <StudentDashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/mock-tests" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'sub-junior', 'junior', 'senior']}>
                <Tests />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/grand-tests" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'sub-junior', 'junior', 'senior']}>
                <Tests />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/all-tests" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'sub-junior', 'junior', 'senior']}>
                <Tests />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/test-runner" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'sub-junior', 'junior', 'senior']}>
                <TestRunner />
              </ProtectedRoute>
            } 
          />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
