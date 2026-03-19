import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import logo from '../assets/future-minds logo.png';
import bgImage from '../assets/51482.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const result = await login(username, password);
    setLoading(false);
    if (result.success) {
      navigate('/dashboard');
    } else {
      setError(result.message || 'Invalid credentials. Try again!');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Back / Logo button */}
      <button
        onClick={() => navigate('/')}
        style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          background: 'rgba(255,255,255,0.85)',
          backdropFilter: 'blur(8px)',
          border: 'none',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
          fontSize: '20px',
          zIndex: 10,
        }}
        title="Go Home"
      >
        ←
      </button>

      {/* Floating Login Card */}
      <div
        style={{
          background: 'rgba(255,255,255,0.82)',
          backdropFilter: 'blur(18px)',
          WebkitBackdropFilter: 'blur(18px)',
          borderRadius: '28px',
          padding: '48px 44px',
          width: '100%',
          maxWidth: '420px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
          border: '1px solid rgba(255,255,255,0.7)',
          margin: '24px',
          marginTop: '100px',
        }}
      >
        {/* Logo */}
        <div
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="FutureMinds Logo" style={{ height: '64px', width: 'auto' }} />
        </div>

        {/* Heading */}
        <h2
          style={{
            textAlign: 'center',
            fontSize: '26px',
            fontWeight: 800,
            color: '#1a202c',
            marginBottom: '6px',
            fontFamily: "'Outfit', sans-serif",
          }}
        >
          Welcome back! 👋
        </h2>
        <p style={{ textAlign: 'center', color: '#718096', fontSize: '14px', marginBottom: '32px' }}>
          Login to continue your adventure.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Username */}
          <div
            style={{
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '14px',
              padding: '14px 18px',
              border: '1.5px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '18px' }}>👤</span>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '15px',
                fontWeight: 600,
                color: '#2d3748',
                width: '100%',
              }}
            />
          </div>

          {/* Password */}
          <div
            style={{
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '14px',
              padding: '14px 18px',
              border: '1.5px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span style={{ fontSize: '18px' }}>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '15px',
                fontWeight: 600,
                color: '#2d3748',
                width: '100%',
              }}
            />
          </div>

          {/* Error */}
          {error && (
            <div
              style={{
                background: '#fff5f5',
                border: '1px solid #fed7d7',
                color: '#e53e3e',
                fontSize: '13px',
                fontWeight: 600,
                borderRadius: '12px',
                padding: '12px 16px',
              }}
            >
              ⚠️ {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              background: loading ? '#a0aec0' : '#0ea5e9',
              color: '#fff',
              fontWeight: 800,
              fontSize: '16px',
              border: 'none',
              borderRadius: '14px',
              padding: '15px',
              cursor: loading ? 'not-allowed' : 'pointer',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 14px rgba(14,165,233,0.35)',
              transition: 'all 0.2s',
              marginTop: '4px',
            }}
          >
            {loading ? 'Logging in...' : <><span>LOGIN</span> <LogIn size={18} /></>}
          </button>
        </form>

        {/* Footer */}
        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#718096', fontWeight: 600 }}>
          Forgot Password?{' '}
          <button
            onClick={() => alert('Contact your teacher for your magic pass!')}
            style={{
              background: 'none',
              border: 'none',
              color: '#0ea5e9',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: '13px',
            }}
          >
            Ask your Teacher 🍎
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
