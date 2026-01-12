import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ name: '', username: '', email: '', password: '' });
    const { register } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData.name, formData.username, formData.email, formData.password);
            alert('Registration successful! Please login.');
            navigate('/login');
        } catch (err) {
            setError('Registration failed. Username or Email might be taken.');
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h2>Register</h2>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.group}>
                        <label>Full Name</label>
                        <input name="name" onChange={handleChange} style={styles.input} required />
                    </div>
                    <div style={styles.group}>
                        <label>Username</label>
                        <input name="username" onChange={handleChange} style={styles.input} required />
                    </div>
                    <div style={styles.group}>
                        <label>Email</label>
                        <input name="email" type="email" onChange={handleChange} style={styles.input} required />
                    </div>
                    <div style={styles.group}>
                        <label>Password</label>
                        <input name="password" type="password" onChange={handleChange} style={styles.input} required />
                    </div>
                    <button type="submit" style={styles.button}>Register</button>
                </form>
            </div>
        </div>
    );
};

const styles = {
    container: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' },
    card: { padding: '2rem', border: '1px solid #ddd', borderRadius: '8px', width: '300px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
    form: { display: 'flex', flexDirection: 'column', gap: '1rem' },
    group: { display: 'flex', flexDirection: 'column' },
    input: { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' },
    button: { padding: '10px', background: '#28a745', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default RegisterPage;
