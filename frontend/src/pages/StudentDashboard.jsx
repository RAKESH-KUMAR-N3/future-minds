import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    LogOut, Rocket, BookOpen, Target, Award, Star,
    Flame, Zap, ClipboardCheck, Trophy, LayoutDashboard
} from 'lucide-react';
import logo from '../assets/future-minds logo.png';

const StudentDashboard = () => {
    const { user, logout, token } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('overview');
    const [myDoubts, setMyDoubts] = useState([]);
    const [doubtForm, setDoubtForm] = useState({ question: '', subject: 'General' });
    const [doubtMsg, setDoubtMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [stats, setStats] = useState({ total: 0, avgScore: 0, totalXP: 0, recent: [] });

    const getColor = () => {
        if (user?.role === 'sub-junior') return '#FF4D8D';
        if (user?.role === 'junior') return '#39B54A';
        return '#F15A24';
    };
    const color = getColor();

    const fetchMyDoubts = async () => {
        try {
            const r = await fetch(`${import.meta.env.VITE_API_URL}/doubts/my`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (r.ok) setMyDoubts(await r.json());
        } catch { }
    };

    const fetchStats = async () => {
        try {
            const r = await fetch(`${import.meta.env.VITE_API_URL}/results/my-stats`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (r.ok) setStats(await r.json());
        } catch { }
    };

    useEffect(() => {
        if (token) {
            fetchMyDoubts();
            fetchStats();
        }
    }, [token]);

    const handleAskDoubt = async (e) => {
        e.preventDefault();
        if (!doubtForm.question.trim()) return;
        setLoading(true);
        try {
            const r = await fetch(`${import.meta.env.VITE_API_URL}/doubts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify(doubtForm)
            });
            const data = await r.json();
            if (data.success) {
                setDoubtMsg('✅ Doubt posted! Teacher will reply soon.');
                setDoubtForm({ ...doubtForm, question: '' });
                fetchMyDoubts();
            } else { setDoubtMsg('❌ ' + (data.message || 'Error')); }
        } catch { setDoubtMsg('❌ Server error'); }
        setLoading(false);
        setTimeout(() => setDoubtMsg(''), 4000);
    };

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
        width: '100%',
        textAlign: 'left'
    });

    return (
        <div className="student-container" style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', padding: '24px', paddingTop: '104px', gap: '24px' }}>
            
            {/* ── MOBILE HEADER ────────────────────────── */}
            <div className="student-mobile-header" style={{ display: 'none' }}>
                <button onClick={() => setSidebarOpen(true)} style={{ background: 'none', border: 'none', color: '#0f172a', cursor: 'pointer', padding: '10px' }}>
                    <LayoutDashboard size={26} />
                </button>
                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <img src={logo} alt="Logo" style={{ height: '32px', width: 'auto' }} />
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.2rem', color: '#0f172a' }}>FutureMinds</span>
                </div>
                <div style={{ width: '46px' }} /> {/* Spacer */}
            </div>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && <div onClick={() => setSidebarOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(4px)', zIndex: 1050 }} />}

            {/* ── SIDEBAR ─────────────────────────────── */}
            <aside className={`student-sidebar ${sidebarOpen ? 'open' : ''}`} style={{ width: '280px', flexShrink: 0, background: 'white', borderRadius: '32px', padding: '36px 24px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 30px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px' }}>
                    <div onClick={() => { navigate('/'); setSidebarOpen(false); }} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                        <img src={logo} alt="Logo" style={{ height: '44px', width: 'auto' }} />
                        <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.3rem', lineHeight: 1 }}>
                            <span style={{ color: '#0f172a' }}>Future</span><span style={{ color: '#39B54A' }}>Minds</span>
                        </span>
                    </div>
                    <button className="student-sidebar-close" onClick={() => setSidebarOpen(false)} style={{ display: 'none', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: '10px' }}>
                        <Zap size={24} style={{ transform: 'rotate(45deg)' }} />
                    </button>
                </div>
                
                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <button style={sidebarItemStyle(activeTab === 'overview')} onClick={() => { setActiveTab('overview'); setSidebarOpen(false); }}><LayoutDashboard size={18} /> Learning Space</button>
                    <button style={sidebarItemStyle(false)} onClick={() => { navigate('/mock-tests'); setSidebarOpen(false); }}><Target size={18} /> Daily Tests</button>
                    <button style={sidebarItemStyle(activeTab === 'achievements')} onClick={() => { setActiveTab('achievements'); setSidebarOpen(false); }}><Award size={18} /> Trophy Room</button>
                    <button style={sidebarItemStyle(activeTab === 'doubts')} onClick={() => { setActiveTab('doubts'); setSidebarOpen(false); }}><Zap size={18} /> My Doubts</button>
                </nav>

                <div style={{ background: '#f8fafc', borderRadius: '20px', padding: '20px', marginBottom: '16px', border: '1px solid #f1f5f9' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '14px', background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '1.1rem', fontFamily: 'Outfit, sans-serif' }}>{user?.username?.[0]?.toUpperCase()}</div>
                        <div>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', color: '#0f172a', textTransform: 'uppercase', fontSize: '0.9rem' }}>{user?.username}</p>
                            <p style={{ fontSize: '0.65rem', color: '#94a3b8', fontWeight: '800', textTransform: 'uppercase' }}>{user?.role}</p>
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', background: 'white', padding: '10px 16px', borderRadius: '12px', border: '1px solid #f1f5f9' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f97316', fontWeight: '900', fontSize: '0.75rem' }}>
                            <Flame size={14} fill="currentColor" /> {Math.floor(stats.totalXP / 100) + 1}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#3b82f6', fontWeight: '900', fontSize: '0.75rem' }}>
                            <Zap size={14} fill="currentColor" /> {stats.totalXP}
                        </span>
                    </div>
                </div>

                <button onClick={logout} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', borderRadius: '16px', border: 'none', background: 'transparent', color: '#94a3b8', fontWeight: '900', fontSize: '0.72rem', textTransform: 'uppercase', cursor: 'pointer' }} onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }} onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}>
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* ── MAIN CONTENT ────────────────────────── */}
            <main className="student-main" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px', overflowY: 'auto' }}>
                <div className="student-header-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: '16px' }}>
                    <div>
                        <p style={{ color: '#39B54A', fontWeight: '900', textTransform: 'uppercase', fontSize: '0.7rem' }}>Dashboard</p>
                        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '2.8rem', color: '#0f172a', lineHeight: 1 }}>
                            {activeTab === 'doubts' ? 'Ask the Wizards 🧙‍♂️' : activeTab === 'achievements' ? 'Trophy Room 🏆' : 'Welcome, Hero! 👋'}
                        </h1>
                    </div>
                    <div className="student-rank-card" style={{ background: 'white', padding: '16px 28px', borderRadius: '20px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ padding: '10px', background: '#fef9c3', borderRadius: '12px' }}>
                            <Star size={20} color="#eab308" fill="#eab308" />
                        </div>
                        <div>
                            <p style={{ fontSize: '0.65rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.2em', color: '#94a3b8' }}>Rank</p>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', color: '#0f172a', fontSize: '1rem' }}>Lv. {Math.floor(stats.totalXP / 500) + 1} Defender</p>
                        </div>
                    </div>
                </div>

                {activeTab === 'doubts' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ background: 'white', borderRadius: '28px', padding: '32px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.3rem', color: '#0f172a', marginBottom: '20px' }}>Ask a New Doubt</h3>
                            <form onSubmit={handleAskDoubt} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <input 
                                    type="text" 
                                    value={doubtForm.subject} 
                                    onChange={e => setDoubtForm({...doubtForm, subject: e.target.value})}
                                    placeholder="Subject / Topic (e.g. Fractions)"
                                    style={{ padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', fontWeight: '600' }}
                                />
                                <textarea 
                                    value={doubtForm.question} 
                                    onChange={e => setDoubtForm({...doubtForm, question: e.target.value})}
                                    placeholder="What's bothering you or what do you want to learn?"
                                    rows={3}
                                    style={{ padding: '12px 16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', outline: 'none', fontWeight: '600', resize: 'vertical' }}
                                />
                                <button type="submit" disabled={loading} style={{ background: color, color: 'white', border: 'none', borderRadius: '12px', padding: '14px', fontWeight: '900', textTransform: 'uppercase', cursor: 'pointer' }}>{loading ? 'Sending...' : 'Seek Guidance ✨'}</button>
                                {doubtMsg && <p style={{ fontWeight: '700', color: doubtMsg.startsWith('✅') ? '#39B54A' : '#ef4444' }}>{doubtMsg}</p>}
                            </form>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.2rem', color: '#0f172a' }}>My Quest Journal</h3>
                            {myDoubts.map((d, i) => (
                                <div key={i} style={{ background: 'white', borderRadius: '24px', padding: '24px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                        <span style={{ fontSize: '0.65rem', fontWeight: '800', color: color, background: `${color}11`, padding: '4px 10px', borderRadius: '6px' }}>{d.subject}</span>
                                        <span style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{new Date(d.createdAt).toLocaleDateString()}</span>
                                    </div>
                                    <p style={{ fontWeight: '700', color: '#0f172a' }}>{d.question}</p>
                                    {d.status === 'answered' ? (
                                        <div style={{ padding: '16px', background: '#f0fdf4', borderRadius: '16px', border: '1px solid #bbf7d0', marginTop: '16px' }}>
                                            <p style={{ fontSize: '0.65rem', fontWeight: '900', color: '#16a34a', textTransform: 'uppercase', marginBottom: '6px' }}>Wizards Answered:</p>
                                            <p style={{ color: '#065f46', fontSize: '0.95rem', fontWeight: '600' }}>{d.response}</p>
                                        </div>
                                    ) : (
                                        <div style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: '700', marginTop: '12px' }}>⏳ Waiting for a magic response...</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : activeTab === 'achievements' ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
                        {[
                            { name: 'First Quest', desc: 'Completed 1st test', icon: '🌱', unlocked: stats.total > 0 },
                            { name: 'Math Master', desc: 'Scored 100% once', icon: '🎯', unlocked: stats.avgScore > 90 },
                            { name: 'Century Club', desc: 'Earned 100 XP', icon: '💯', unlocked: stats.totalXP >= 100 },
                            { name: 'High Flyer', desc: 'Lv. 5 Reached', icon: '🚀', unlocked: stats.totalXP >= 2000 },
                            { name: 'Elite Hero', desc: 'Scored 80% Average', icon: '💎', unlocked: stats.avgScore >= 80 },
                        ].map((ach, i) => (
                            <div key={i} style={{ background: 'white', borderRadius: '24px', padding: '32px', textAlign: 'center', border: ach.unlocked ? `2px solid ${color}` : '1px solid #f1f5f9', opacity: ach.unlocked ? 1 : 0.5, boxShadow: ach.unlocked ? `0 10px 30px ${color}22` : 'none' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>{ach.icon}</div>
                                <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', color: '#0f172a', marginBottom: '4px' }}>{ach.name}</h4>
                                <p style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: '600' }}>{ach.desc}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="student-overview-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '24px', flex: 1 }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div className="student-hero-banner" style={{ background: `linear-gradient(135deg, ${color} 0%, #0f172a 100%)`, borderRadius: '36px', padding: '56px 48px', color: 'white', position: 'relative', overflow: 'hidden', minHeight: '280px', display: 'flex', alignItems: 'flex-end' }}>
                                <div style={{ position: 'relative', zIndex: 1, maxWidth: '500px' }}>
                                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '2.2rem', marginBottom: '12px', lineHeight: '1.1' }}>Your Math Quest<br />Awaits!</h2>
                                    <button onClick={() => navigate('/mock-tests')} style={{ background: 'white', color: '#0f172a', border: 'none', borderRadius: '16px', padding: '14px 32px', fontWeight: '900', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px' }}>Resume Daily Test <Rocket size={20} /></button>
                                </div>
                            </div>
                            
                            {/* New Stats Bar for Mobile */}
                            <div className="student-stats-mobile-grid" style={{ display: 'none' }}>
                                {[
                                    { label: 'Total Quests', value: stats.total, color: '#3b82f6', bg: '#eff6ff', icon: <ClipboardCheck size={20} /> },
                                    { label: 'Avg Score', value: `${stats.avgScore}%`, color: '#39B54A', bg: '#f0fdf4', icon: <Target size={20} /> },
                                    { label: 'Total XP', value: stats.totalXP, color: '#f97316', bg: '#fff7ed', icon: <Zap size={20} /> },
                                    { label: 'Level', value: Math.floor(stats.totalXP / 500) + 1, color: '#8b5cf6', bg: '#f5f3ff', icon: <Trophy size={20} /> },
                                ].map((s, i) => (
                                    <div key={i} style={{ background: 'white', borderRadius: '20px', padding: '16px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid #f1f5f9' }}>
                                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: s.bg, color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
                                        <div>
                                            <p style={{ fontSize: '0.6rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase' }}>{s.label}</p>
                                            <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.1rem', color: '#0f172a' }}>{s.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div>
                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.3rem', color: '#0f172a', marginBottom: '16px' }}>Magic Missions</h3>
                                <div className="student-mission-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                    {[{ title: 'Word Master Quest', icon: <BookOpen size={22} />, bg: '#eef2ff', color: '#6366f1', pct: 60 }, { title: 'Number Ninja Quest', icon: <Star size={22} />, bg: '#f5f3ff', color: '#8b5cf6', pct: 40 }].map((m, i) => (
                                        <div key={i} style={{ background: 'white', borderRadius: '24px', padding: '28px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: m.bg, color: m.color, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>{m.icon}</div>
                                            <h4 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1rem', color: '#0f172a', marginBottom: '14px' }}>{m.title}</h4>
                                            <div style={{ height: '8px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden', marginBottom: '8px' }}><div style={{ width: `${m.pct}%`, height: '100%', background: m.color }} /></div>
                                            <p style={{ fontSize: '0.7rem', fontWeight: '900', color: m.color, textTransform: 'uppercase' }}>{m.pct}% Complete</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="student-overview-secondary" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ background: 'white', borderRadius: '28px', padding: '32px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)' }}>
                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.1rem', color: '#0f172a', textAlign: 'center', marginBottom: '20px' }}>Adventure Map</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                    {[{ title: 'Daily Tests', icon: <ClipboardCheck size={20} />, color: '#39B54A', bg: '#f0fdf4', path: '/mock-tests' }, { title: 'Grand Exams', icon: <Trophy size={20} />, color: '#f97316', bg: '#fff7ed', path: '/grand-tests', locked: true }].map((item, idx) => (
                                        <div key={idx} onClick={() => !item.locked && navigate(item.path)} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px', borderRadius: '16px', background: '#f8fafc', cursor: item.locked ? 'default' : 'pointer', opacity: item.locked ? 0.5 : 1 }}>
                                            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>{item.icon}</div>
                                            <div><p style={{ fontWeight: '900', fontSize: '0.85rem' }}>{item.title}</p></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="student-chart-card" style={{ background: 'white', borderRadius: '28px', padding: '32px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.1rem', color: '#0f172a', marginBottom: '28px' }}>Weekly Spark</h3>
                                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px', height: '160px' }}>
                                    {(stats.recent.length > 0 ? stats.recent : [45, 75, 35, 95, 60]).map((h, i) => (
                                        <div key={i} style={{ width: '40px', height: `${h}%`, background: color, borderRadius: '12px', transition: 'height 1s' }} />
                                    ))}
                                </div>
                                <p style={{ fontSize: '0.7rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.3em', marginTop: '20px' }}>{stats.total > 0 ? 'Your Latest Quests 🔥' : 'Start your first Quest! 🔥'}</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <style>{`
                @media (max-width: 1024px) {
                    .student-container { padding: 16px !important; padding-top: 80px !important; display: block !important; }
                    .student-sidebar { position: fixed !important; top: 0; left: -100%; height: 100vh !important; z-index: 2000 !important; transition: all 0.3s ease; border-radius: 0 32px 32px 0 !important; }
                    .student-sidebar.open { left: 0 !important; }
                    .student-sidebar-close { display: flex !important; }
                    .student-mobile-header { position: fixed !important; top: 0; left: 0; right: 0; height: 64px !important; background: white !important; display: flex !important; align-items: center !important; justify-content: space-between !important; padding: 0 16px !important; z-index: 1000 !important; border-bottom: 1px solid #f1f5f9; box-shadow: 0 2px 10px rgba(0,0,0,0.03); }
                    .student-header-row { flex-direction: column !important; align-items: flex-start !important; }
                    .student-header-row h1 { font-size: 2rem !important; margin-top: 8px !important; }
                    .student-rank-card { width: 100% !important; margin-top: 16px !important; }
                    .student-overview-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
                    .student-hero-banner { padding: 32px 24px !important; min-height: 200px !important; }
                    .student-hero-banner h2 { font-size: 1.6rem !important; }
                    .student-stats-mobile-grid { display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 10px !important; }
                    .student-mission-grid { grid-template-columns: 1fr !important; }
                    .student-overview-secondary { width: 100% !important; }
                    .student-chart-card { display: none !important; }
                }
                @media (max-width: 480px) {
                    .student-stats-mobile-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
};

export default StudentDashboard;
