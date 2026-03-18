import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UserPlus, Users, LayoutDashboard, LogOut, ClipboardCheck, Trophy } from 'lucide-react';
import logo from '../assets/future-minds logo.png';

const AdminDashboard = () => {
    const { createUser, allUsers, logout } = useAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: '', password: '', role: 'sub-junior' });
    const [activeTab, setActiveTab] = useState('overview');
    const [testCount, setTestCount] = useState(0);
    const [formMsg, setFormMsg] = useState('');

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/tests`)
            .then(r => r.json())
            .then(data => setTestCount(Array.isArray(data) ? data.length : 0))
            .catch(() => {});
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault();
        const result = await createUser(formData.username, formData.password, formData.role);
        if (result?.success) {
            setFormMsg('✅ Student account created!');
            setFormData({ username: '', password: '', role: 'sub-junior' });
        } else {
            setFormMsg('❌ ' + (result?.message || 'Something went wrong'));
        }
        setTimeout(() => setFormMsg(''), 4000);
    };

    const sidebarBtn = (active, onClick, icon, label) => (
        <button
            onClick={onClick}
            style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                padding: '14px 20px', borderRadius: '16px', border: 'none',
                cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: '900',
                fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em',
                transition: 'all 0.2s',
                background: active ? '#39B54A' : 'transparent',
                color: active ? 'white' : '#94a3b8',
                boxShadow: active ? '0 8px 24px rgba(57,181,74,0.25)' : 'none',
            }}
        >
            {icon} {label}
        </button>
    );

    return (
        <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif', padding: '24px', paddingTop: '104px', gap: '24px' }}>

            {/* ── SIDEBAR ─────────────────────────────── */}
            <aside style={{ width: '280px', flexShrink: 0, background: 'white', borderRadius: '32px', padding: '36px 24px', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 30px rgba(0,0,0,0.06)', border: '1px solid #f1f5f9' }}>

                <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', marginBottom: '40px' }}>
                    <img src={logo} alt="Logo" style={{ height: '44px', width: 'auto' }} />
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.3rem', lineHeight: 1 }}>
                        <span style={{ color: '#0f172a' }}>Future</span>
                        <span style={{ color: '#39B54A' }}>Minds</span>
                    </span>
                </div>

                <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {sidebarBtn(activeTab === 'overview', () => setActiveTab('overview'), <LayoutDashboard size={18} />, 'Overview')}
                    {sidebarBtn(activeTab === 'users', () => setActiveTab('users'), <Users size={18} />, 'Student List')}
                </nav>

                <button
                    onClick={logout}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '14px 16px', marginTop: '16px', borderRadius: '16px', border: 'none', background: 'transparent', color: '#94a3b8', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.18em', cursor: 'pointer', transition: 'all 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = '#fef2f2'; e.currentTarget.style.color = '#ef4444'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#94a3b8'; }}
                >
                    <LogOut size={18} /> Logout
                </button>
            </aside>

            {/* ── MAIN ────────────────────────────────── */}
            <main style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '24px' }}>

                <div>
                    <p style={{ color: '#39B54A', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.3em', fontSize: '0.7rem', marginBottom: '8px', fontStyle: 'italic' }}>Classroom Administrator</p>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '2.8rem', color: '#0f172a', letterSpacing: '-0.02em', lineHeight: 1 }}>Teacher's Control Hub 🛡️</h1>
                </div>

                {activeTab === 'overview' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

                        {/* Stat Cards */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
                            {[
                                { icon: <Users size={24} color="#3b82f6" />, bg: '#eff6ff', label: 'Total Students', value: allUsers.length },
                                { icon: <ClipboardCheck size={24} color="#39B54A" />, bg: '#f0fdf4', label: 'Tests Active', value: testCount },
                                { icon: <Trophy size={24} color="#F15A24" />, bg: '#fff7ed', label: 'Avg Score', value: '84%' },
                            ].map((s, i) => (
                                <div key={i} style={{ background: 'white', borderRadius: '24px', padding: '28px', border: '1px solid #f1f5f9', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: s.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{s.icon}</div>
                                    <div>
                                        <p style={{ fontSize: '0.7rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '6px' }}>{s.label}</p>
                                        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '2.5rem', color: '#0f172a', lineHeight: 1 }}>{s.value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Enroll Form */}
                        <div style={{ background: 'white', borderRadius: '28px', padding: '44px', border: '1px solid #f1f5f9', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '32px' }}>
                                <div style={{ width: '42px', height: '42px', borderRadius: '12px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <UserPlus size={20} color="#39B54A" />
                                </div>
                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.4rem', color: '#0f172a' }}>Enroll New Student</h3>
                            </div>

                            <form onSubmit={handleCreate} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                                {[
                                    { label: 'Student Name', type: 'text', key: 'username', placeholder: 'Full Name' },
                                    { label: 'Passcode', type: 'password', key: 'password', placeholder: '••••••••' },
                                ].map((f) => (
                                    <div key={f.key} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <label style={{ fontSize: '0.7rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{f.label}</label>
                                        <input
                                            type={f.type}
                                            placeholder={f.placeholder}
                                            value={formData[f.key]}
                                            onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                                            required
                                            style={{ padding: '16px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', outline: 'none', fontSize: '1rem', fontWeight: '700', transition: 'all 0.2s' }}
                                            onFocus={e => { e.target.style.borderColor = '#39B54A'; e.target.style.background = 'white'; e.target.style.boxShadow = '0 0 0 4px rgba(57,181,74,0.08)'; }}
                                            onBlur={e => { e.target.style.borderColor = '#e2e8f0'; e.target.style.background = '#f8fafc'; e.target.style.boxShadow = 'none'; }}
                                        />
                                    </div>
                                ))}
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <label style={{ fontSize: '0.7rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>Category</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                        style={{ padding: '16px 20px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '16px', outline: 'none', fontSize: '1rem', fontWeight: '700', cursor: 'pointer', appearance: 'none' }}
                                    >
                                        <option value="sub-junior">Sub-Junior (Ages 6–9)</option>
                                        <option value="junior">Junior (Ages 10–12)</option>
                                        <option value="senior">Senior (Ages 13–15)</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                                    <button
                                        type="submit"
                                        style={{ width: '100%', background: '#39B54A', color: 'white', border: 'none', borderRadius: '16px', padding: '16px 24px', fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', boxShadow: '0 8px 24px rgba(57,181,74,0.25)', transition: 'all 0.2s' }}
                                        onMouseEnter={e => { e.target.style.opacity = '0.9'; e.target.style.transform = 'translateY(-1px)'; }}
                                        onMouseLeave={e => { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }}
                                    >
                                        Create Account ✨
                                    </button>
                                </div>
                            </form>

                            {formMsg && (
                                <div style={{ marginTop: '16px', padding: '14px 20px', borderRadius: '14px', background: formMsg.startsWith('✅') ? '#f0fdf4' : '#fef2f2', color: formMsg.startsWith('✅') ? '#16a34a' : '#ef4444', fontWeight: '700', fontSize: '0.9rem', border: `1px solid ${formMsg.startsWith('✅') ? '#bbf7d0' : '#fecaca'}` }}>
                                    {formMsg}
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    /* Student Roster */
                    <div style={{ background: 'white', borderRadius: '28px', padding: '44px', border: '1px solid #f1f5f9', boxShadow: '0 4px 24px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.4rem', color: '#0f172a' }}>Student Roster</h3>
                            <span style={{ background: '#f8fafc', border: '1px solid #f1f5f9', padding: '6px 16px', borderRadius: '99px', fontSize: '0.72rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                                {allUsers.length} Students
                            </span>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid #f8fafc' }}>
                                        {['Name', 'Category', 'Status'].map(h => (
                                            <th key={h} style={{ textAlign: 'left', padding: '14px 20px', fontSize: '0.68rem', fontWeight: '900', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.2em' }}>{h}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {allUsers.map((u, i) => {
                                        const roleColors = { admin: { bg: '#eef2ff', color: '#6366f1' }, 'sub-junior': { bg: '#fdf2f8', color: '#ec4899' }, junior: { bg: '#f0fdf4', color: '#16a34a' }, senior: { bg: '#fff7ed', color: '#f97316' } };
                                        const rc = roleColors[u.role] || { bg: '#f8fafc', color: '#64748b' };
                                        return (
                                            <tr key={i} style={{ borderBottom: '1px solid #f8fafc', transition: 'background 0.15s' }}
                                                onMouseEnter={e => e.currentTarget.style.background = '#f8fafc'}
                                                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                                            >
                                                <td style={{ padding: '18px 20px', fontWeight: '700', color: '#0f172a', fontSize: '1rem' }}>{u.username}</td>
                                                <td style={{ padding: '18px 20px' }}>
                                                    <span style={{ background: rc.bg, color: rc.color, padding: '5px 14px', borderRadius: '99px', fontSize: '0.68rem', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{u.role}</span>
                                                </td>
                                                <td style={{ padding: '18px 20px' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#22c55e', fontWeight: '900', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                                                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e', animation: 'pulse 2s infinite' }} /> Online
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default AdminDashboard;
