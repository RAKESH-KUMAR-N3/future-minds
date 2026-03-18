import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, Rocket, BookOpen, Target, Award, Star,
    Flame, Zap, ClipboardCheck, Trophy, LayoutDashboard
} from 'lucide-react';
import logo from '../assets/future-minds logo.png';

const StudentDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');

    const getColor = () => {
        if (user?.role === 'sub-junior') return '#FF4D8D';
        if (user?.role === 'junior') return '#39B54A';
        return '#F15A24';
    };
    const color = getColor();

    const sidebarItemStyle = (active) => ({
        padding: '14px 20px',
        borderRadius: '16px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontFamily: 'Outfit, sans-serif',
        fontWeight: '900',
        fontSize: '0.72rem',
        textTransform: 'uppercase',
        letterSpacing: '0.18em',
        transition: 'all 0.2s',
        background: active ? color : 'transparent',
        color: active ? 'white' : '#94a3b8',
        boxShadow: active ? `0 8px 24px ${color}33` : 'none',
        border: 'none',
    });

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', padding: '24px', paddingTop: '104px', gap: '24px' }}>

            {/* ── SIDEBAR ─────────────────────────────── */}
            <aside style={{ width: '280px', flexShrink: 0, background: 'white', borderRadius: '32px', padding: '36px 24px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 30px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>

                {/* Logo */}
                <div
                    onClick={() => navigate('/')}
                    style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginBottom: '40px' }}
                >
                    <img src={logo} alt="Logo" style={{ height: '44px', width: 'auto' }} />
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.3rem', lineHeight: 1 }}>
                        <span style={{ color: '#0f172a' }}>Future</span>
                        <span style={{ color: '#39B54A' }}>Minds</span>
                    </span>
                </div>

                {/* Nav */}
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <button style={sidebarItemStyle(activeTab === 'overview')} onClick={() => setActiveTab('overview')}>
                        <LayoutDashboard size={18} /> Learning Space
                    </button>
                    <button style={sidebarItemStyle(false)} onClick={() => navigate('/mock-tests')}>
                        <Target size={18} /> My Adventures
                    </button>
                    <button style={sidebarItemStyle(activeTab === 'achievements')} onClick={() => setActiveTab('achievements')}>
                        <Award size={18} /> Trophy Room
                    </button>
                </nav>

                {/* Profile Card */}
                <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '20px', marginBottom: '16px', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif', flexShrink: 0 }}>
                            {user?.username?.[0]?.toUpperCase()}
                        </div>
                        <div>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.9rem' }}>{user?.username}</p>
                            <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{user?.role}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', background: 'white', padding: '10px 16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f97316', fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                            <Flame size={14} fill="currentColor" /> 5
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3b82f6', fontWeight: '900', fontSize: '0.75rem', textTransform: 'uppercase' }}>
                            <Zap size={14} fill="currentColor" /> 240
                        </span>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={logout}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', borderRadius: '16px', border: 'none', background: 'transparent', color: '#94a3b8', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}
                >
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* ── MAIN CONTENT ────────────────────────── */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>

                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <p style={{ color: '#39B54A', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', marginBottom: '8px', fontStyle: 'italic' }}>Dashboard</p>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '2.8rem', color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1 }}>Welcome, Hero! 👋</h1>
                        <p style={{ color: '#94a3b8', fontWeight: '500', fontSize: '1rem', marginTop: '10px', fontStyle: 'italic' }}>"Magic is what happens when you believe in yourself."</p>
                    </div>
                    <div style={{ background: 'white', padding: '16px 28px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ padding: '10px', background: '#fef9c3', borderRadius: '12px' }}>
                            <Star size={20} color="#eab308" fill="#eab308" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8' }}>Current Rank</p>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', color: '#0f172a', fontSize: '1rem' }}>Level 4 Explorer</p>
                        </div>
                    </div>
                </div>

                {/* Body Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', flex: 1 }}>

                    {/* Left — Hero Card + Missions */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Hero Banner */}
                        <div style={{ background: `linear-gradient(135deg, ${color} 0%, #0f172a 100%)`, borderRadius: '36px', padding: '56px 48px', color: 'white', position: 'relative', overflow: 'hidden', minHeight: '280px', display: 'flex', alignItems: 'flex-end' }}>
                            <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(white 1px, transparent 1px)', backgroundSize: '28px 28px', opacity: 0.04, pointerEvents: 'none' }} />
                            <div style={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '2.2rem', marginBottom: '12px', letterSpacing: '-0.02em', lineHeight: '1.1' }}>Your Math Quest<br />Awaits!</h2>
                                <p style={{ opacity: 0.75, marginBottom: '28px', lineHeight: '1.6', fontSize: '1rem' }}>Complete the next challenge to unlock a new badge.</p>
                                <button
                                    onClick={() => navigate('/mock-tests')}
                                    style={{ background: 'white', color: '#0f172a', border: 'none', borderRadius: '16px', padding: '14px 32px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)', transition: 'all 0.2s' }}
                                >
                                    Resume Quest <Rocket size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Quick Missions */}
                        <div>
                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.3rem', color: '#0f172a', marginBottom: '16px', letterSpacing: '-0.01em' }}>Magic Missions</h3>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                {[
                                    { title: 'Word Master Quest', icon: <BookOpen size={22} />, bg: '#eef2ff', color: '#6366f1', pct: 60 },
                                    { title: 'Number Ninja Quest', icon: <Star size={22} />, bg: '#f5f3ff', color: '#8b5cf6', pct: 40 }
                                ].map((m, i) => (
                                    <div key={i} style={{ background: 'white', borderRadius: '24px', padding: '28px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', transition: 'all 0.3s' }}
                                        onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(0,0,0,0.08)'; }}
                                        onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.04)'; }}
                                    >
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{m.icon}</div>
                                            <span style={{ fontSize: '0.7rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>15 Mins</span>
                                        </div>
                                        <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1rem', color: '#0f172a', marginBottom: '14px' }}>{m.title}</h4>
                                        <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden', marginBottom: '8px' }}>
                                            <div style={{ width: `${m.pct}%`, height: '100%', background: m.color, borderRadius: '99px', transition: 'width 1s' }} />
                                        </div>
                                        <p style={{ fontSize: '0.7rem', fontWeight: '900', color: m.color, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{m.pct}% Complete</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right — Tracker + Spark Chart */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Adventure Map */}
                        <div style={{ background: 'white', borderRadius: '28px', padding: '32px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.1rem', color: '#0f172a', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: '1px solid #f8fafc', paddingBottom: '20px', marginBottom: '20px' }}>Adventure Map</h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                <div
                                    onClick={() => navigate('/mock-tests')}
                                    style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', borderRadius: '16px', background: '#f8fafc', cursor: 'pointer', border: '1px solid transparent', transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.background = 'white'; e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)'; }}
                                    onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.boxShadow = 'none'; }}
                                >
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#39B54A', flexShrink: 0 }}>
                                        <ClipboardCheck size={20} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: '900', fontSize: '0.85rem', color: '#0f172a', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mock Challenges</p>
                                        <p style={{ fontSize: '0.65rem', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '3px' }}>2 quests ready</p>
                                    </div>
                                </div>
                                <div
                                    onClick={() => navigate('/grand-tests')}
                                    style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', borderRadius: '16px', background: '#f8fafc', cursor: 'pointer', border: '1px solid transparent', transition: 'all 0.2s', opacity: 0.5 }}
                                >
                                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#fff7ed', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#f97316', flexShrink: 0 }}>
                                        <Trophy size={20} />
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: '900', fontSize: '0.85rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Grand Adventures</p>
                                        <p style={{ fontSize: '0.65rem', fontWeight: '800', color: '#cbd5e1', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '3px' }}>Unlocked at 500 XP</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Weekly Spark Chart */}
                        <div style={{ background: 'white', borderRadius: '28px', padding: '32px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.1rem', color: '#0f172a', textAlign: 'center', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '28px' }}>Weekly Spark</h3>
                            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: '10px', height: '160px', width: '100%' }}>
                                {[45, 75, 35, 95, 60].map((h, i) => (
                                    <div key={i} style={{ flex: 1, height: '100%', background: '#f8fafc', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden', boxShadow: i === 3 ? `0 0 20px ${color}33` : 'none' }}>
                                        <div style={{ width: '100%', height: `${h}%`, background: color, borderRadius: '12px', transition: 'height 1s', borderTop: '3px solid rgba(255,255,255,0.3)' }} />
                                    </div>
                                ))}
                            </div>
                            <p style={{ fontSize: '0.7rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.3em', marginTop: '20px' }}>Keep the Spark Alive! 🔥</p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default StudentDashboard;
