import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import logo from '../assets/future-minds logo.png';
import bgImage from '../assets/51482.jpg';
import mobileBg from '../assets/future minds 15.jpg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

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

  if (authLoading) return null;

  return (
    <div
      className="login-page-container"
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
      <style>{`
        @media (max-width: 768px) {
          .login-page-container {
            background-image: url(${mobileBg}) !important;
          }
          .login-card {
            background: transparent !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            border: none !important;
            box-shadow: none !important;
            margin: 10px !important;
            margin-top: 40px !important;
            padding: 24px 16px !important;
            border-radius: 0 !important;
            position: relative !important;
          }
          .login-logo-img { 
            display: flex !important; 
            margin-bottom: 20px !important;
          }
          .login-logo-img img {
            height: 88px !important;
          }
          .login-kite { display: block !important; top: -10px !important; right: 0px !important; }
          .login-card h2 { font-size: 26px !important; margin-bottom: 8px !important; color: #1a202c !important; }
          .login-card > p { font-size: 15px !important; margin-bottom: 30px !important; color: #4a5568 !important; }
          .login-input-box {
            background: white !important;
            border: none !important;
            border-radius: 50px !important;
            padding: 14px 24px !important;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08) !important;
          }
          .login-input-box span.icon { display: none !important; }
          .login-submit-btn { 
            border-radius: 50px !important; 
            font-size: 17px !important; 
            padding: 16px !important;
            background: #f97316 !important; /* Orange color */
            margin-top: 10px !important;
          }
          .login-footer { font-size: 14px !important; color: #4a5568 !important; }
          .login-footer button { color: #f97316 !important; }
          /* hide global navbar on login page mobile */
          nav.navbar-main, header { display: none !important; }
        }
        .login-kite { display: none; }
      `}</style>
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
        className="login-card"
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
        {/* Kite decoration - mobile only */}
        <span className="login-kite" style={{ position: 'absolute', top: '14px', right: '18px', fontSize: '28px', lineHeight: 1 }}>🪁</span>
        {/* Logo */}
        <div
          className="login-logo-img"
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', cursor: 'pointer' }}
          onClick={() => navigate('/')}
        >
          <img src={logo} alt="FutureMinds Logo" style={{ height: '80px', width: 'auto' }} />
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
            className="login-input-box"
            style={{
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '50px',
              padding: '14px 22px',
              border: '1.5px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span className="icon" style={{ fontSize: '18px' }}>👤</span>
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
                fontSize: '16px',
                fontWeight: 600,
                color: '#2d3748',
                width: '100%',
              }}
            />
          </div>

          {/* Password */}
          <div
            className="login-input-box"
            style={{
              background: 'rgba(255,255,255,0.9)',
              borderRadius: '50px',
              padding: '14px 22px',
              border: '1.5px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
            }}
          >
            <span className="icon" style={{ fontSize: '18px' }}>🔒</span>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                fontSize: '16px',
                fontWeight: 600,
                color: '#2d3748',
                width: '100%',
              }}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                border: 'none',
                background: 'none',
                color: '#718096',
                fontSize: '13px',
                fontWeight: 700,
                cursor: 'pointer',
                padding: '0 4px',
              }}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
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
            className="login-submit-btn"
            type="submit"
            disabled={loading}
            style={{
              background: loading ? '#a0aec0' : '#f97316',
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
              boxShadow: '0 4px 14px rgba(249,115,22,0.35)',
              transition: 'all 0.2s',
              marginTop: '4px',
            }}
          >
            {loading ? 'Logging in...' : <><span>LOGIN</span> <LogIn size={18} /></>}
          </button>
        </form>

        {/* Footer */}
        <p className="login-footer" style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#718096', fontWeight: 600 }}>
          Forgot Password?{' '}
          <button
            onClick={() => alert('Contact your teacher for your magic pass!')}
            style={{
              background: 'none',
              border: 'none',
              color: '#f97316',
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
