import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Mission from './pages/Mission';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

// Protected Pages
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';

/**
 * App Component - Main application entry point
 * 
 * This is the root component that sets up:
 * - Authentication context (AuthProvider)
 * - Toast notifications (ToastProvider)
 * - Routing configuration
 * - Layout structure (Navbar, Footer)
 */
function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="flex flex-col min-h-screen font-sans text-slate-900 bg-slate-50">
            {/* Global Navigation */}
            <Navbar />

            {/* Main Content Area */}
            <main className="flex-grow">
              <Routes>
                {/* ============ PUBLIC ROUTES ============ */}
                {/* These routes are accessible to all users */}

                <Route path="/" element={<Home />} />
                <Route path="/product/:id" element={<ProductDetail />} />
                <Route path="/about" element={<Mission />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />

                {/* ============ PROTECTED ROUTES ============ */}
                {/* These routes require authentication */}

                {/* Business Dashboard - Only for business role users */}
                <Route path="/dashboard" element={
                  <ProtectedRoute requiredRole="business">
                    <Dashboard />
                  </ProtectedRoute>
                } />

                {/* User Profile - Any authenticated user */}
                <Route path="/profile" element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                } />

                {/* Checkout - Requires authentication */}
                <Route path="/checkout/:productId" element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                } />

                {/* Order History - Requires authentication */}
                <Route path="/orders" element={
                  <ProtectedRoute>
                    <Orders />
                  </ProtectedRoute>
                } />

                {/* ============ FALLBACK ROUTE ============ */}
                {/* 404 Page - Matches any unmatched route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>

            {/* Global Footer */}
            <Footer />
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
