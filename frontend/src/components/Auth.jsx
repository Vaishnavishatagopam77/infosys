import React, { useState } from 'react';
import './styles.css';

export function Login({ onLogin, onSwitchToSignup }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            const res = await fetch('http://localhost:8000/token', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: formData,
            });

            if (!res.ok) throw new Error('Invalid credentials');

            const data = await res.json();
            localStorage.setItem('token', data.access_token);
            onLogin(data.access_token);
        } catch (err) {
            setError('Invalid username or password');
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form fade-in">
                <h2 className="auth-title">Welcome Back</h2>
                {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="auth-input-group">
                        <label className="auth-input-label">Username</label>
                        <input
                            type="text"
                            className="auth-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-input-group">
                        <label className="auth-input-label">Password</label>
                        <input
                            type="password"
                            className="auth-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-submit">Login</button>
                </form>
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Don't have an account? <span style={{ color: '#6366f1', cursor: 'pointer', fontWeight: '600' }} onClick={onSwitchToSignup}>Sign up</span>
                </div>
            </div>
        </div>
    );
}

export function Signup({ onLogin, onSwitchToLogin }) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.detail || 'Registration failed');
            }

            const data = await res.json();
            localStorage.setItem('token', data.access_token);
            onLogin(data.access_token);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form fade-in">
                <h2 className="auth-title">Create Account</h2>
                {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="auth-input-group">
                        <label className="auth-input-label">Username</label>
                        <input
                            type="text"
                            className="auth-input"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-input-group">
                        <label className="auth-input-label">Email</label>
                        <input
                            type="email"
                            className="auth-input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="auth-input-group">
                        <label className="auth-input-label">Password</label>
                        <input
                            type="password"
                            className="auth-input"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="auth-submit">Sign Up</button>
                </form>
                <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                    Already have an account? <span style={{ color: '#6366f1', cursor: 'pointer', fontWeight: '600' }} onClick={onSwitchToLogin}>Login</span>
                </div>
            </div>
        </div>
    );
}
