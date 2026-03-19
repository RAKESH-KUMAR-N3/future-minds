import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { BookOpen, Clock, PlayCircle, Star, Heart } from 'lucide-react';

const Tests = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [tests, setTests] = useState([]);
    const [loading, setLoading] = useState(true);

    const isGrand = location.pathname.includes('grand');
    const isMock = location.pathname.includes('mock');
    const testType = isGrand ? 'grand' : isMock ? 'mock' : '';
    const pageTitle = isGrand ? '🏆 Grand Exam Adventure' : isMock ? '📝 Daily Test Challenge' : '🎒 All Exam Adventures';

    // Initialize empty — update when user loads (avoids undefined on refresh)
    const [selectedRole, setSelectedRole] = useState('');

    useEffect(() => {
        if (user && user.role !== 'admin') {
            setSelectedRole(user.role);
        }
    }, [user]);

    const getColor = () => {
        if (user?.role === 'sub-junior') return '#FF4D8D';
        if (user?.role === 'junior') return '#39B54A';
        return '#F15A24';
    };
    const color = getColor();

    useEffect(() => {
        if (user) fetchTests();
    }, [user, location.pathname, selectedRole]);

    const fetchTests = async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams();
            if (testType) params.append('type', testType);
            if (selectedRole) params.append('role', selectedRole);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/tests?${params.toString()}`);
            const data = await response.json();
            setTests(data);
        } catch (err) {
            console.error('Fetch tests failed:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Inter, sans-serif' }}>

            {/* Page Header */}
            <div style={{ background: `${color}0d`, borderBottom: '1px solid #f1f5f9', padding: '120px 40px 60px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '3rem', color: color, marginBottom: '12px', letterSpacing: '-0.02em' }}>
                        {pageTitle}
                    </h1>
                    <p style={{ color: '#64748b', fontWeight: '600', fontSize: '1rem' }}>
                        {user?.role === 'admin' ? 'Teacher Mode' : `${user?.role?.toUpperCase() || ''} Level`} — Ready to show your magic?
                    </p>

                    {user?.role === 'admin' && (
                        <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                            <label style={{ fontWeight: '700', color: '#475569' }}>Filter by Category:</label>
                            <select
                                value={selectedRole}
                                onChange={(e) => setSelectedRole(e.target.value)}
                                style={{ padding: '10px 20px', borderRadius: '12px', border: '1px solid #e2e8f0', outline: 'none', background: 'white', fontWeight: '600', fontSize: '0.9rem', cursor: 'pointer' }}
                            >
                                <option value="">All Age Groups</option>
                                <option value="sub-junior">Sub-Junior</option>
                                <option value="junior">Junior</option>
                                <option value="senior">Senior</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>

            {/* Tests Grid */}
            <main style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 40px' }}>
                {loading ? (
                    <div style={{ textAlign: 'center', padding: '100px 0', color: '#94a3b8', fontSize: '1.2rem', fontWeight: '600' }}>
                        Loading your adventures... ✨
                    </div>
                ) : tests.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '100px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                        <Heart size={56} color="#FF4D8D" />
                        <h3 style={{ fontSize: '1.8rem', color: '#94a3b8', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}>No tests available yet!</h3>
                        <p style={{ color: '#94a3b8' }}>Check back later for new adventures.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '28px' }}>
                        {tests.map((test) => (
                            <div
                                key={test._id}
                                style={{ background: 'white', borderRadius: '24px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', borderTop: `5px solid ${color}`, transition: 'all 0.3s' }}
                                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.1)'; }}
                                onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.05)'; }}
                            >
                                {/* Card Top Row */}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                    <span style={{ background: `${color}18`, color: color, padding: '6px 14px', borderRadius: '10px', fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                                        {test.category}
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.85rem', fontWeight: '700', color: '#94a3b8' }}>
                                        <Star size={15} fill="#EAB308" color="#EAB308" /> 50 XP
                                    </span>
                                </div>

                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: '900', fontSize: '1.35rem', color: '#0f172a', marginBottom: '20px', lineHeight: '1.3' }}>
                                    {test.title}
                                </h3>

                                <div style={{ display: 'flex', gap: '20px', marginBottom: '28px', color: '#64748b', fontSize: '0.85rem', fontWeight: '600' }}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <Clock size={15} /> {test.duration} Mins
                                    </span>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                        <BookOpen size={15} /> {test.questions?.length || 5} Questions
                                    </span>
                                </div>

                                <button
                                    onClick={() => navigate('/test-runner', { state: { test } })}
                                    style={{ width: '100%', background: color, color: 'white', border: 'none', borderRadius: '14px', padding: '14px 24px', fontFamily: 'Outfit, sans-serif', fontWeight: '800', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', boxShadow: `0 8px 24px ${color}33`, transition: 'all 0.2s' }}
                                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.opacity = '0.9'; }}
                                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.opacity = '1'; }}
                                >
                                    <PlayCircle size={20} /> {isMock ? 'Start Daily Test' : 'Start Grand Exam'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Tests;
