import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Scanner from './pages/Scanner';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function ProtectedRoute({ element }: { element: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div className="min-h-screen bg-[#0B1120] pt-28 flex items-center justify-center text-slate-400">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/scanner" element={<ProtectedRoute element={<Scanner />} />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-[#0B1120] text-slate-200 font-sans selection:bg-rose-500/30 flex flex-col relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(#334155 1px, transparent 1px)`,
                backgroundSize: '24px 24px',
                maskImage: 'linear-gradient(to bottom, black 20%, transparent 90%)'
              }}
            ></div>
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          </div>

          <Navigation />

          <div className="relative z-10 flex-1 flex flex-col">
            <AppRoutes />
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
