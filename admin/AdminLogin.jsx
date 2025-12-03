import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../src/context/AuthContext'; // uses the AuthContext under src/context

export default function AdminLogin() {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('password');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      // auth.login performs local demo validation in AuthContext for dev (admin/password)
      await auth.login({ username, password });
      navigate('/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '48px auto', padding: 20 }}>
      <h2>Admin Sign In</h2>
      <form onSubmit={submit} style={{ display: 'grid', gap: 10 }}>
        <label>
          Username
          <input value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        {error && <div style={{ color: 'crimson' }}>{error}</div>}
        <div style={{ display: 'flex', gap: 8 }}>
          <button disabled={loading} type="submit">Sign in</button>
          <button type="button" onClick={() => { setUsername('admin'); setPassword('password'); }}>
            Fill demo
          </button>
        </div>
        <div style={{ marginTop: 8, color: '#666', fontSize: 13 }}>
          For local dev use: admin / password
        </div>
      </form>
    </div>
  );
}
