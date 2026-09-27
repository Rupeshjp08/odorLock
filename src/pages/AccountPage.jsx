import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User, Package, MapPin, HeadphonesIcon, LogOut, ChevronRight,
  Edit3, Check, AlertCircle, Headphones
} from 'lucide-react';
import { Page, ProtectedRoute, FormField, PageHero, useToast } from '../components/shared';
import { useAuth } from '../context/AuthContext';

// ============================================================
// ACCOUNT DASHBOARD
// ============================================================
const AccountPage = () => {
  const { user, logout, updateUser } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '' });
  const [saving, setSaving] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('odorlock_orders') || '[]');
      setOrders(saved);
    } catch {}
  }, []);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    updateUser(form);
    setEditMode(false);
    setSaving(false);
    toast?.('Profile updated successfully!', 'success');
  };

  const handleLogout = () => { logout(); navigate('/'); };

  const initials = user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'U';

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'orders', label: 'My Orders', icon: Package },
    { id: 'profile', label: 'Profile', icon: Edit3 },
    { id: 'support', label: 'Support', icon: Headphones },
  ];

  return (
    <ProtectedRoute>
      <Page>
        <PageHero badge="Account" title={`Welcome, ${user?.name?.split(' ')[0] || 'Rider'}!`} subtitle="Manage your orders, profile, and support requests." />
        <section className="section" style={{ paddingTop: 40 }}>
          <div className="container">
            <div className="account-grid">
              {/* Sidebar */}
              <div className="account-sidebar">
                <div className="account-profile">
                  <div className="account-avatar">{initials}</div>
                  <div className="account-name">{user?.name}</div>
                  <div className="account-email">{user?.email}</div>
                </div>
                {tabs.map(t => (
                  <button key={t.id} className={`account-nav-link ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                    <t.icon size={16} />{t.label}
                  </button>
                ))}
                <button className="account-nav-link danger" onClick={handleLogout}>
                  <LogOut size={16} />Logout
                </button>
              </div>

              {/* Content */}
              <div>
                {/* Overview */}
                {activeTab === 'overview' && (
                  <div>
                    <h2 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: 24, color: 'var(--navy)' }}>Dashboard</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, marginBottom: 32 }}>
                      {[
                        { label: 'Total Orders', value: orders.length, icon: Package, color: 'var(--green)' },
                        { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).getFullYear() : '2024', icon: User, color: '#3B82F6' },
                      ].map(s => (
                        <div key={s.label} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
                          <div style={{ width: 40, height: 40, background: `${s.color}20`, borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                            <s.icon size={20} color={s.color} />
                          </div>
                          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)' }}>{s.value}</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h3 style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--navy)' }}>Recent Orders</h3>
                        <button className="btn btn-ghost btn-sm" onClick={() => setActiveTab('orders')}>View all <ChevronRight size={14} /></button>
                      </div>
                      {orders.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
                          <Package size={32} style={{ margin: '0 auto 12px', color: 'var(--text-light)' }} />
                          <p>No orders yet. <Link to="/product" style={{ color: 'var(--green)' }}>Get OdorLock</Link></p>
                        </div>
                      ) : (
                        orders.slice(0, 3).map(o => (
                          <div key={o.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                            <div>
                              <div style={{ fontWeight: 600, fontFamily: 'monospace', fontSize: '0.875rem' }}>{o.id}</div>
                              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>{new Date(o.date).toLocaleDateString('en-IN')}</div>
                            </div>
                            <span className="badge badge-green">{o.status}</span>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {/* Orders */}
                {activeTab === 'orders' && (
                  <div>
                    <h2 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: 24, color: 'var(--navy)' }}>My Orders</h2>
                    {orders.length === 0 ? (
                      <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '48px', textAlign: 'center' }}>
                        <Package size={40} style={{ color: 'var(--text-light)', margin: '0 auto 16px' }} />
                        <h3 style={{ fontWeight: 600, marginBottom: 8 }}>No orders yet</h3>
                        <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Start by getting your OdorLock device.</p>
                        <Link to="/product" className="btn btn-primary">Get OdorLock</Link>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                        {orders.map(o => (
                          <div key={o.id} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24, boxShadow: 'var(--shadow-sm)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
                              <div>
                                <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1rem', marginBottom: 4 }}>{o.id}</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>{new Date(o.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 2 }}>Delivery: {o.delivery === 'express' ? 'Express' : 'Standard'}</div>
                              </div>
                              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                                <span className="badge badge-green">{o.status}</span>
                                <Link to="/track-order" className="btn btn-outline btn-sm">Track Order</Link>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Profile */}
                {activeTab === 'profile' && (
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                      <h2 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--navy)' }}>My Profile</h2>
                      {!editMode && <button className="btn btn-outline btn-sm" onClick={() => setEditMode(true)}><Edit3 size={14} /> Edit</button>}
                    </div>
                    <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
                      {editMode ? (
                        <>
                          <FormField label="Full Name">
                            <input className="form-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
                          </FormField>
                          <FormField label="Email Address">
                            <input className="form-input" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
                          </FormField>
                          <FormField label="Phone Number">
                            <input className="form-input" type="tel" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} />
                          </FormField>
                          <div style={{ display: 'flex', gap: 12 }}>
                            <button className="btn btn-primary" onClick={handleSave} disabled={saving}>
                              {saving ? <><div className="spinner" /> Saving…</> : <><Check size={16} /> Save Changes</>}
                            </button>
                            <button className="btn btn-ghost" onClick={() => setEditMode(false)}>Cancel</button>
                          </div>
                        </>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                          {[{ label: 'Full Name', value: user?.name }, { label: 'Email', value: user?.email }, { label: 'Phone', value: user?.phone || 'Not set' }].map(f => (
                            <div key={f.label}>
                              <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{f.label}</div>
                              <div style={{ fontSize: '1rem', color: 'var(--navy)', fontWeight: 500 }}>{f.value}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Support */}
                {activeTab === 'support' && (
                  <div>
                    <h2 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: 24, color: 'var(--navy)' }}>Support</h2>
                    <div style={{ display: 'grid', gap: 16 }}>
                      {[
                        { title: 'Contact Support', desc: 'Submit a support request', link: '/contact', btn: 'Open Ticket' },
                        { title: 'FAQ', desc: 'Find answers to common questions', link: '/faq', btn: 'View FAQ' },
                        { title: 'Track Order', desc: 'Check your delivery status', link: '/track-order', btn: 'Track' },
                      ].map(item => (
                        <div key={item.title} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                            <div style={{ fontWeight: 600, color: 'var(--navy)', marginBottom: 4 }}>{item.title}</div>
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{item.desc}</div>
                          </div>
                          <Link to={item.link} className="btn btn-outline btn-sm">{item.btn}</Link>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </Page>
    </ProtectedRoute>
  );
};

export default AccountPage;
