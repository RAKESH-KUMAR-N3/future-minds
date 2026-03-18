import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/future-minds logo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'All Tests', path: '/all-tests' },
        { name: 'Mock Tests', path: '/mock-tests' },
        { name: 'Grand Tests', path: '/grand-tests' },
    ];

    return (
        <header style={{
            position: 'fixed', top: 0, left: 0, right: 0,
            height: '80px', background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(16px)', zIndex: 1000,
            borderBottom: '1px solid #f1f5f9',
            boxShadow: '0 2px 20px rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'center',
            padding: '0 40px'
        }}>
            <div style={{ width: '100%', maxWidth: '1400px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '100%' }}>

                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', textDecoration: 'none' }}
                >
                    <img src={logo} alt="Logo" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.6rem', letterSpacing: '-0.01em', lineHeight: '1' }}>
                        <span style={{ color: '#0f172a' }}>Future</span>
                        <span style={{ color: '#39B54A' }}>Minds</span>
                    </span>
                </div>

                {/* Nav Links — hidden on mobile, shown on desktop */}
                <nav style={{ display: 'flex', alignItems: 'center', gap: '40px', height: '100%' }}>
                    {navItems.map((item) => (
                        <div key={item.name} style={{ height: '100%', display: 'flex', alignItems: 'center', position: 'relative' }}>
                            <Link
                                to={item.path}
                                style={{
                                    fontFamily: 'Outfit, sans-serif',
                                    fontWeight: '900',
                                    fontSize: '0.75rem',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.18em',
                                    textDecoration: 'none',
                                    color: isActive(item.path) ? '#39B54A' : '#94a3b8',
                                    transition: 'color 0.2s',
                                }}
                                onMouseEnter={e => { if (!isActive(item.path)) e.target.style.color = '#39B54A'; }}
                                onMouseLeave={e => { if (!isActive(item.path)) e.target.style.color = '#94a3b8'; }}
                            >
                                {item.name}
                            </Link>
                            {isActive(item.path) && (
                                <span style={{
                                    position: 'absolute', bottom: '14px',
                                    left: '50%', transform: 'translateX(-50%)',
                                    width: '24px', height: '3px',
                                    background: '#39B54A', borderRadius: '99px',
                                    boxShadow: '0 2px 8px rgba(57,181,74,0.4)'
                                }} />
                            )}
                        </div>
                    ))}
                </nav>

                {/* Auth Buttons */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {user ? (
                        <>
                            <button
                                onClick={() => navigate('/dashboard')}
                                style={{ background: '#39B54A', color: 'white', border: 'none', borderRadius: '14px', padding: '10px 24px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', boxShadow: '0 4px 15px rgba(57,181,74,0.25)', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.target.style.opacity = '0.9'; e.target.style.transform = 'translateY(-1px)'; }}
                                onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }}
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={logout}
                                style={{ background: 'transparent', color: '#94a3b8', border: '1px solid #e2e8f0', borderRadius: '14px', padding: '10px 20px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', transition: 'all 0.2s' }}
                                onMouseEnter={e => { e.target.style.color = '#ef4444'; e.target.style.background = '#fef2f2'; e.target.style.borderColor = '#fecaca'; }}
                                onMouseLeave={e => { e.target.style.color = '#94a3b8'; e.target.style.background = 'transparent'; e.target.style.borderColor = '#e2e8f0'; }}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => navigate('/login')}
                            style={{ background: '#39B54A', color: 'white', border: 'none', borderRadius: '16px', padding: '14px 36px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', minWidth: '140px', boxShadow: '0 6px 20px rgba(57,181,74,0.3)', transition: 'all 0.2s' }}
                            onMouseEnter={e => { e.target.style.transform = 'translateY(-2px)'; e.target.style.boxShadow = '0 10px 30px rgba(57,181,74,0.4)'; }}
                            onMouseLeave={e => { e.target.style.transform = 'translateY(0)'; e.target.style.boxShadow = '0 6px 20px rgba(57,181,74,0.3)'; }}
                        >
                            LOGIN
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;