import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Check, Leaf } from 'lucide-react';
import { Page, FormField, OdorLockLogo } from '../components/shared';
import { useAuth } from '../context/AuthContext';

// ============================================================
// LOGIN PAGE
// ============================================================
export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/account';

  const [form, setForm] = useState({ email: '', password: '', remember: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [authError, setAuthError] = useState('');

  const validate = () => {
    const e = {};
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.password) e.password = 'Password is required';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setAuthError('');
    const result = await login(form.email, form.password);
    setLoading(false);
    if (result.success) navigate(from, { replace: true });
    else setAuthError(result.error);
  };

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  return (
    <Page>
      <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--off-white)', padding: '40px 24px' }}>
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '48px', width: '100%', maxWidth: 440, boxShadow: 'var(--shadow-md)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <OdorLockLogo size="lg" style={{ justifyContent: 'center', marginBottom: 16 }} />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: 4 }}>Welcome back</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Sign in to your OdorLock account</p>
          </div>

          {authError && (
            <div className="alert alert-error" style={{ marginBottom: 20 }}>
              <AlertCircle size={16} /><span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FormField label="Email Address" required error={errors.email}>
              <input className={`form-input ${errors.email ? 'error' : ''}`} type="email" value={form.email}
                onChange={e => handleChange('email', e.target.value)} placeholder="you@example.com" autoComplete="email" />
            </FormField>
            <FormField label="Password" required error={errors.password}>
              <div style={{ position: 'relative' }}>
                <input className={`form-input ${errors.password ? 'error' : ''}`} type={showPass ? 'text' : 'password'}
                  value={form.password} onChange={e => handleChange('password', e.target.value)}
                  placeholder="Your password" autoComplete="current-password" style={{ paddingRight: 44 }} />
                <button type="button" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
                  onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </FormField>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                <input type="checkbox" checked={form.remember} onChange={e => setForm(p => ({ ...p, remember: e.target.checked }))} />
                Remember me
              </label>
              <Link to="/forgot-password" style={{ fontSize: '0.875rem', color: 'var(--green)', fontWeight: 500 }}>Forgot password?</Link>
            </div>

            <button className="btn btn-primary w-full" type="submit" disabled={loading} style={{ justifyContent: 'center' }}>
              {loading ? <><div className="spinner" /> Signing in…</> : 'Sign In'}
            </button>
          </form>

          <div className="divider" style={{ position: 'relative', textAlign: 'center' }}>
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: 'white', padding: '0 12px', color: 'var(--text-muted)', fontSize: '0.8125rem' }}>or</span>
          </div>

          <p style={{ textAlign: 'center', fontSize: '0.9375rem', color: 'var(--text-muted)', marginTop: 20 }}>
            Don't have an account?{' '}
            <Link to="/signup" style={{ color: 'var(--green)', fontWeight: 600 }}>Create one</Link>
          </p>

          <div style={{ marginTop: 24, padding: '12px 16px', background: 'var(--off-white)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            🔒 Demo mode — sign up to create an account, then log in.
          </div>
        </div>
      </div>
    </Page>
  );
};

// ============================================================
// SIGNUP PAGE
// ============================================================
export const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', confirmPassword: '', terms: false });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [authError, setAuthError] = useState('');

  const getStrength = (p) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  };

  const strength = getStrength(form.password);
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', 'active-weak', 'active-fair', 'active-good', 'active-strong'];

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Valid 10-digit phone required';
    if (form.password.length < 8) e.password = 'Password must be at least 8 characters';
    if (form.password !== form.confirmPassword) e.confirmPassword = 'Passwords do not match';
    if (!form.terms) e.terms = 'You must accept the terms';
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);
    setAuthError('');
    const result = await signup({ name: form.name, email: form.email, phone: form.phone, password: form.password });
    setLoading(false);
    if (result.success) navigate('/account');
    else setAuthError(result.error);
  };

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  return (
    <Page>
      <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--off-white)', padding: '40px 24px' }}>
        <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '48px', width: '100%', maxWidth: 480, boxShadow: 'var(--shadow-md)' }}>
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <OdorLockLogo size="lg" style={{ justifyContent: 'center', marginBottom: 16 }} />
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)', marginBottom: 4 }}>Create your account</h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>Join OdorLock and take better care of your helmet.</p>
          </div>

          {authError && (
            <div className="alert alert-error" style={{ marginBottom: 20 }}>
              <AlertCircle size={16} /><span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <FormField label="Full Name" required error={errors.name}>
              <input className={`form-input ${errors.name ? 'error' : ''}`} value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Your full name" />
            </FormField>
            <FormField label="Email Address" required error={errors.email}>
              <input className={`form-input ${errors.email ? 'error' : ''}`} type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="you@example.com" />
            </FormField>
            <FormField label="Phone Number" required error={errors.phone}>
              <input className={`form-input ${errors.phone ? 'error' : ''}`} type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="98765 43210" maxLength={10} />
            </FormField>
            <FormField label="Password" required error={errors.password}>
              <div style={{ position: 'relative' }}>
                <input className={`form-input ${errors.password ? 'error' : ''}`} type={showPass ? 'text' : 'password'}
                  value={form.password} onChange={e => handleChange('password', e.target.value)}
                  placeholder="Min. 8 characters" style={{ paddingRight: 44 }} />
                <button type="button" style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}
                  onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {form.password && (
                <div>
                  <div className="strength-bar">
                    {[1,2,3,4].map(i => (
                      <div key={i} className={`strength-seg ${i <= strength ? strengthColors[strength] : ''}`} />
                    ))}
                  </div>
                  <div style={{ fontSize: '0.75rem', marginTop: 4, color: 'var(--text-muted)' }}>
                    Password strength: <strong>{strengthLabels[strength]}</strong>
                  </div>
                </div>
              )}
            </FormField>
            <FormField label="Confirm Password" required error={errors.confirmPassword}>
              <input className={`form-input ${errors.confirmPassword ? 'error' : ''}`} type="password"
                value={form.confirmPassword} onChange={e => handleChange('confirmPassword', e.target.value)}
                placeholder="Repeat your password" />
            </FormField>

            <div style={{ marginBottom: 24 }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.terms} onChange={e => handleChange('terms', e.target.checked)} style={{ marginTop: 3 }} />
                <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  I agree to the <Link to="/terms" style={{ color: 'var(--green)' }}>Terms & Conditions</Link> and <Link to="/privacy" style={{ color: 'var(--green)' }}>Privacy Policy</Link>
                </span>
              </label>
              {errors.terms && <div className="form-error"><AlertCircle size={12} />{errors.terms}</div>}
            </div>

            <button className="btn btn-primary w-full" type="submit" disabled={loading} style={{ justifyContent: 'center' }}>
              {loading ? <><div className="spinner" /> Creating account…</> : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', fontSize: '0.9375rem', color: 'var(--text-muted)', marginTop: 20 }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'var(--green)', fontWeight: 600 }}>Sign in</Link>
          </p>
        </div>
      </div>
    </Page>
  );
};
