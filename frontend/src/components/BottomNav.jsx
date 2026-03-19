import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const isActive = (path) => location.pathname === path;

    const tabs = [
        {
            label: 'Home',
            path: '/',
            icon: (active) => (
                <svg width="22" height="22" viewBox="0 0 24 24" fill={active ? '#39B54A' : 'none'} stroke={active ? '#39B54A' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" />
                    <path d="M9 21V12h6v9" />
                </svg>
            ),
        },
        {
            label: 'Exams',
            path: '/all-tests',
            icon: (active) => (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#39B54A' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
            ),
        },
        {
            label: 'Daily',
            path: '/mock-tests',
            icon: (active) => (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#39B54A' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
                    <rect x="9" y="3" width="6" height="4" rx="1" />
                    <line x1="9" y1="12" x2="15" y2="12" />
                    <line x1="9" y1="16" x2="13" y2="16" />
                </svg>
            ),
        },
        {
            label: 'Exam',
            path: '/grand-tests',
            icon: (active) => (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#39B54A' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
            ),
        },
        {
            label: 'Profile',
            path: user ? '/dashboard' : '/login',
            icon: (active) => (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={active ? '#39B54A' : '#94a3b8'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                </svg>
            ),
        },
    ];

    // Don't show on test runner, login, dashboard
    const hiddenRoutes = ['/test-runner', '/login', '/dashboard'];
    if (hiddenRoutes.includes(location.pathname)) return null;

    return (
        <>
            <style>{`
                .bottom-nav-bar {
                    display: none;
                }
                @media (max-width: 768px) {
                    .bottom-nav-bar {
                        display: flex !important;
                    }
                    /* push page content above bottom nav */
                    body {
                        padding-bottom: 70px;
                    }
                }
            `}</style>

            <nav className="bottom-nav-bar" style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: '62px',
                background: 'rgba(255,255,255,0.98)',
                backdropFilter: 'blur(20px)',
                borderTop: '1px solid #f1f5f9',
                boxShadow: '0 -4px 24px rgba(0,0,0,0.07)',
                zIndex: 1000,
                alignItems: 'stretch',
                justifyContent: 'space-around',
                padding: '0 4px',
            }}>
                {tabs.map((tab) => {
                    const active = isActive(tab.path);
                    return (
                        <button
                            key={tab.label}
                            onClick={() => navigate(tab.path)}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '3px',
                                flex: 1,
                                background: 'none',
                                border: 'none',
                                cursor: 'pointer',
                                padding: '6px 0 4px',
                                position: 'relative',
                                transition: 'transform 0.15s',
                            }}
                            onMouseDown={e => e.currentTarget.style.transform = 'scale(0.92)'}
                            onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                            onTouchStart={e => e.currentTarget.style.transform = 'scale(0.92)'}
                            onTouchEnd={e => e.currentTarget.style.transform = 'scale(1)'}
                        >
                            {/* Active indicator dot at top */}
                            {active && (
                                <span style={{
                                    position: 'absolute',
                                    top: '0',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '28px',
                                    height: '3px',
                                    background: '#39B54A',
                                    borderRadius: '0 0 4px 4px',
                                    boxShadow: '0 2px 8px rgba(57,181,74,0.4)',
                                }} />
                            )}

                            {/* Icon */}
                            <span style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '32px',
                                height: '32px',
                                borderRadius: '10px',
                                background: active ? 'rgba(57,181,74,0.1)' : 'transparent',
                                transition: 'background 0.2s',
                            }}>
                                {tab.icon(active)}
                            </span>

                            {/* Label */}
                            <span style={{
                                fontFamily: 'Outfit, sans-serif',
                                fontWeight: active ? '800' : '600',
                                fontSize: '0.6rem',
                                textTransform: 'uppercase',
                                letterSpacing: '0.06em',
                                color: active ? '#39B54A' : '#94a3b8',
                                transition: 'color 0.2s',
                                lineHeight: 1,
                            }}>
                                {tab.label}
                            </span>
                        </button>
                    );
                })}
            </nav>
        </>
    );
};

export default BottomNav;
