import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Ticket } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.brand}>
                <Ticket style={{ marginRight: '8px' }} />
                <Link to="/" style={styles.link}>AI Support System</Link>
            </div>
            <div style={styles.menu}>
                {user ? (
                    <>
                        <span style={styles.user}>Hello, {user.username}</span>
                        <button onClick={handleLogout} style={styles.button}>
                            <LogOut size={16} style={{ marginRight: '5px' }} /> Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={styles.link}>Login</Link>
                        <Link to="/register" style={styles.link}>Register</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem 2rem',
        backgroundColor: '#333',
        color: '#fff',
        alignItems: 'center'
    },
    brand: {
        display: 'flex',
        alignItems: 'center',
        fontSize: '1.2rem',
        fontWeight: 'bold'
    },
    menu: {
        display: 'flex',
        gap: '1rem',
        alignItems: 'center'
    },
    link: {
        color: '#fff',
        textDecoration: 'none',
        marginLeft: '10px'
    },
    button: {
        background: 'transparent',
        border: '1px solid #fff',
        color: '#fff',
        padding: '5px 10px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        borderRadius: '4px'
    },
    user: {
        marginRight: '1rem'
    }
};

export default Navbar;
