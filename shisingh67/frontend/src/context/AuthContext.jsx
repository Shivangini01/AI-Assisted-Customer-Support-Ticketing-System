import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [loading, setLoading] = useState(true);

    const fetchUser = async () => {
        try {
            const res = await api.get('/auth/me');
            setUser(res.data);
            localStorage.setItem('user', JSON.stringify(res.data));
        } catch (err) {
            console.error("Failed to fetch user", err);
            logout();
        }
    };

    useEffect(() => {
        if (token) {
            fetchUser();
        }
        setLoading(false);
    }, [token]);

    const login = async (username, password) => {
        try {
            const response = await api.post('/auth/login', { usernameOrEmail: username, password });
            const { accessToken } = response.data;

            localStorage.setItem('token', accessToken);
            setToken(accessToken);

            // Fetch user details immediately
            await fetchUser();
            return true;
        } catch (error) {
            console.error("Login failed", error);
            throw error;
        }
    };

    const register = async (name, username, email, password) => {
        try {
            await api.post('/auth/register', { name, username, email, password });
            return true;
        } catch (error) {
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, register, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
