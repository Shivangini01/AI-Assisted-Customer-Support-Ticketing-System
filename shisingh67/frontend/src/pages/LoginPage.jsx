import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, User, ArrowRight } from 'lucide-react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Welcome Back</h2>
                    <p style={styles.subtitle}>Sign in to your account to continue</p>
                </div>

                {error && (
                    <div style={styles.errorAlert}>
                        <span style={{ marginRight: '8px' }}>•</span> {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Username or Email</label>
                        <div style={styles.inputWrapper}>
                            <User size={18} style={styles.icon} />
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                style={styles.input}
                                placeholder="Enter your username"
                                required
                            />
                        </div>
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <div style={styles.inputWrapper}>
                            <Lock size={18} style={styles.icon} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                style={styles.input}
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        style={{ ...styles.button, opacity: isLoading ? 0.7 : 1 }}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                        {!isLoading && <ArrowRight size={18} />}
                    </button>
                </form>

                <div style={styles.footer}>
                    <p style={styles.footerText}>
                        Don't have an account? <Link to="/register" style={styles.link}>Create Account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        padding: '2rem'
    },
    card: {
        background: '#ffffff',
        borderRadius: '16px',
        boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
        width: '100%',
        maxWidth: '420px',
        padding: '2.5rem',
        transition: 'transform 0.2s',
    },
    header: {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    title: {
        fontSize: '1.75rem',
        fontWeight: '700',
        color: '#1a202c',
        marginBottom: '0.5rem',
    },
    subtitle: {
        color: '#718096',
        fontSize: '0.95rem',
    },
    errorAlert: {
        background: '#fff5f5',
        border: '1px solid #fed7d7',
        color: '#c53030',
        padding: '0.75rem',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        fontSize: '0.9rem',
        display: 'flex',
        alignItems: 'center',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#4a5568',
    },
    inputWrapper: {
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        position: 'absolute',
        left: '12px',
        color: '#a0aec0',
    },
    input: {
        width: '100%',
        padding: '12px 12px 12px 40px',
        borderRadius: '8px',
        border: '1px solid #e2e8f0',
        fontSize: '0.95rem',
        color: '#2d3748',
        transition: 'border-color 0.2s',
        outline: 'none',
        backgroundColor: '#f8fafc',
    },
    button: {
        marginTop: '1rem',
        padding: '12px',
        background: 'linear-gradient(to right, #007bff, #0056b3)',
        color: '#fff',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '8px',
        transition: 'opacity 0.2s',
    },
    footer: {
        marginTop: '2rem',
        textAlign: 'center',
        borderTop: '1px solid #e2e8f0',
        paddingTop: '1.5rem',
    },
    footerText: {
        color: '#718096',
        fontSize: '0.9rem',
    },
    link: {
        color: '#3182ce',
        fontWeight: '600',
        textDecoration: 'none',
    }
};

export default LoginPage;
