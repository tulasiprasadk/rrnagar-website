import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/context/AuthContext';
import ProtectedRoute from '../src/components/ProtectedRoute';
import AdminDashboard from '../src/pages/AdminDashboard';
import AdminProducts from '../src/pages/AdminProducts';
import AdminLogin from './AdminLogin';

// AdminApp is mounted at /admin/* by src/App.jsx
export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="products"
          element={
            <ProtectedRoute>
              <AdminProducts />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
}
