import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/future-minds logo.png';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const isActive = (path) => location.pathname === path;

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'All Exams', path: '/all-tests' },
        { name: 'Daily Tests', path: '/mock-tests' },
        { name: 'Grand Exam', path: '/grand-tests' },
    ];

    const closeMenu = () => setMenuOpen(false);

    // Hide navbar entirely on login page (mobile full-screen experience)
    if (location.pathname === '/login') return null;

    return (
        <>
            <style>{`
                @media (max-width: 768px) {
                    .navbar-desktop-nav { display: none !important; }
                    .navbar-desktop-auth { display: none !important; }
                    .navbar-hamburger { display: flex !important; }
                    .navbar-header { padding: 0 16px !important; height: 60px !important; }
                    .navbar-logo-img { height: 38px !important; }
                    .navbar-logo-text { font-size: 1.3rem !important; }
                }
                @media (min-width: 769px) {
                    .navbar-hamburger { display: none !important; }
                    .navbar-mobile-menu { display: none !important; }
                }
            `}</style>

            <header className="navbar-header" style={{
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
                        onClick={() => { navigate('/'); closeMenu(); }}
                        style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', textDecoration: 'none' }}
                    >
                        <img className="navbar-logo-img" src={logo} alt="Logo" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
                        <span className="navbar-logo-text" style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.6rem', letterSpacing: '-0.01em', lineHeight: '1' }}>
                            <span style={{ color: '#0f172a' }}>Future</span>
                            <span style={{
                                background: 'linear-gradient(to right, #39B54A, #F58220)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                display: 'inline-block'
                            }}>Minds</span>
                        </span>
                    </div>

                    {/* Desktop Nav Links */}
                    <nav className="navbar-desktop-nav" style={{ display: 'flex', alignItems: 'center', gap: '40px', height: '100%' }}>
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

                    {/* Desktop Auth Buttons */}
                    <div className="navbar-desktop-auth" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
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

                    {/* Hamburger Button — mobile only */}
                    <button
                        className="navbar-hamburger"
                        onClick={() => setMenuOpen(prev => !prev)}
                        style={{
                            display: 'none',
                            flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
                            gap: '5px', background: 'none', border: 'none',
                            cursor: 'pointer', padding: '6px', borderRadius: '8px',
                            width: '40px', height: '40px',
                            transition: 'background 0.2s'
                        }}
                        aria-label="Toggle menu"
                    >
                        <span style={{
                            display: 'block', width: '22px', height: '2.5px',
                            background: '#0f172a', borderRadius: '3px',
                            transform: menuOpen ? 'rotate(45deg) translate(5.5px, 5.5px)' : 'none',
                            transition: 'transform 0.25s'
                        }} />
                        <span style={{
                            display: 'block', width: '22px', height: '2.5px',
                            background: '#0f172a', borderRadius: '3px',
                            opacity: menuOpen ? 0 : 1,
                            transition: 'opacity 0.2s'
                        }} />
                        <span style={{
                            display: 'block', width: '22px', height: '2.5px',
                            background: '#0f172a', borderRadius: '3px',
                            transform: menuOpen ? 'rotate(-45deg) translate(5.5px, -5.5px)' : 'none',
                            transition: 'transform 0.25s'
                        }} />
                    </button>
                </div>
            </header>

            {/* Mobile dropdown menu */}
            <div
                className="navbar-mobile-menu"
                style={{
                    position: 'fixed', top: '60px', left: 0, right: 0,
                    background: 'rgba(255,255,255,0.98)',
                    backdropFilter: 'blur(20px)',
                    zIndex: 999,
                    borderBottom: '1px solid #f1f5f9',
                    boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
                    padding: menuOpen ? '12px 0 16px' : '0',
                    maxHeight: menuOpen ? '400px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.3s ease, padding 0.3s ease',
                }}
            >
                {navItems.map((item) => (
                    <Link
                        key={item.name}
                        to={item.path}
                        onClick={closeMenu}
                        style={{
                            display: 'flex', alignItems: 'center',
                            padding: '13px 24px',
                            fontFamily: 'Outfit, sans-serif',
                            fontWeight: '800',
                            fontSize: '0.85rem',
                            textTransform: 'uppercase',
                            letterSpacing: '0.15em',
                            textDecoration: 'none',
                            color: isActive(item.path) ? '#39B54A' : '#64748b',
                            borderLeft: isActive(item.path) ? '3px solid #39B54A' : '3px solid transparent',
                            background: isActive(item.path) ? 'rgba(57,181,74,0.06)' : 'transparent',
                            transition: 'all 0.15s',
                        }}
                    >
                        {item.name}
                    </Link>
                ))}

                {/* Mobile Auth */}
                <div style={{ padding: '12px 24px 4px', borderTop: '1px solid #f1f5f9', marginTop: '4px' }}>
                    {user ? (
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <button
                                onClick={() => { navigate('/dashboard'); closeMenu(); }}
                                style={{ flex: 1, background: '#39B54A', color: 'white', border: 'none', borderRadius: '12px', padding: '11px 0', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer' }}
                            >
                                Dashboard
                            </button>
                            <button
                                onClick={() => { logout(); closeMenu(); }}
                                style={{ flex: 1, background: 'transparent', color: '#ef4444', border: '1px solid #fecaca', borderRadius: '12px', padding: '11px 0', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.12em', cursor: 'pointer' }}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={() => { navigate('/login'); closeMenu(); }}
                            style={{ width: '100%', background: '#39B54A', color: 'white', border: 'none', borderRadius: '12px', padding: '13px 0', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', cursor: 'pointer', boxShadow: '0 4px 15px rgba(57,181,74,0.25)' }}
                        >
                            LOGIN
                        </button>
                    )}
                </div>
            </div>

            {/* Overlay to close menu */}
            {menuOpen && (
                <div
                    onClick={closeMenu}
                    style={{
                        position: 'fixed', inset: 0, zIndex: 998,
                        background: 'rgba(0,0,0,0.15)',
                        backdropFilter: 'blur(2px)',
                    }}
                />
            )}
        </>
    );
};

export default Navbar;