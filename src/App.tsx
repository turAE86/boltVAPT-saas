import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Services from './pages/Services';
import Scanner from './pages/Scanner';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!publishableKey) {
    throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY');
  }

  return (
    <ClerkProvider publishableKey={publishableKey}>
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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/scanner" element={<Scanner />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>

        <Footer />
      </div>
        </BrowserRouter>
      </AuthProvider>
    </ClerkProvider>
  );
}

export default App;
