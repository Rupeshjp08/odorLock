import { useState } from 'react';
import { Mail, Phone, MapPin, CheckCircle, AlertCircle, Loader } from 'lucide-react';
import { Page, PageHero, FormField, useToast } from '../components/shared';
import { BRAND } from '../data/config';

const CATEGORIES = [
  'Product Support',
  'Order Support',
  'Business Partnership',
  'Feedback',
  'Other',
];

const ContactPage = () => {
  const toast = useToast();
  const [form, setForm] = useState({
    name: '', email: '', phone: '', subject: '', category: '', message: '',
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (form.phone && !/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Enter a valid 10-digit phone number';
    if (!form.category) e.category = 'Please select a category';
    if (!form.subject.trim()) e.subject = 'Subject is required';
    if (!form.message.trim() || form.message.length < 20) e.message = 'Message must be at least 20 characters';
    return e;
  };

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setStatus('loading');

    // Save locally + simulate API call
    await new Promise(r => setTimeout(r, 1500));

    try {
      const requests = JSON.parse(localStorage.getItem('odorlock_support') || '[]');
      requests.unshift({ ...form, id: `SR-${Date.now()}`, date: new Date().toISOString(), status: 'open' });
      localStorage.setItem('odorlock_support', JSON.stringify(requests));
      setStatus('success');
      toast?.('Support request submitted successfully!', 'success');
      setForm({ name: '', email: '', phone: '', subject: '', category: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const resetForm = () => setStatus('idle');

  return (
    <Page>
      <PageHero
        badge="Contact Us"
        title="Get in Touch"
        subtitle="We're here to help. Send us your question or support request."
      />

      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 60, alignItems: 'start' }}>
            {/* Contact Info */}
            <div>
              <h2 style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--navy)', marginBottom: 16 }}>Contact Information</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: 32, lineHeight: 1.7 }}>
                Reach out to us for product support, order help, business partnerships, or general feedback.
              </p>
              {[
                { icon: Mail, label: 'Email', value: BRAND.email, href: `mailto:${BRAND.email}` },
                { icon: Phone, label: 'Phone', value: BRAND.phone, href: `tel:${BRAND.phone.replace(/\s/g, '')}` },
                { icon: MapPin, label: 'Address', value: BRAND.address },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: 16, marginBottom: 24 }}>
                  <div style={{ width: 44, height: 44, background: 'var(--green-muted)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <item.icon size={18} color="var(--green)" />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                    {item.href
                      ? <a href={item.href} style={{ color: 'var(--navy)', fontWeight: 500 }}>{item.value}</a>
                      : <div style={{ color: 'var(--navy)', fontWeight: 500, lineHeight: 1.5 }}>{item.value}</div>}
                  </div>
                </div>
              ))}

              <div style={{ background: 'var(--green-muted)', border: '1px solid rgba(29,185,84,0.2)', borderRadius: 'var(--radius-lg)', padding: '24px', marginTop: 24 }}>
                <h4 style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 8 }}>Response Time</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
                  We aim to respond to all support requests within 1–2 business days. For urgent issues, please call us directly.
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 40, boxShadow: 'var(--shadow-md)' }}>
              {status === 'success' ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ width: 72, height: 72, background: 'var(--green-muted)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    <CheckCircle size={36} color="var(--green)" />
                  </div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--navy)', marginBottom: 8 }}>Message Received!</h3>
                  <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>We'll get back to you within 1–2 business days.</p>
                  <button className="btn btn-outline" onClick={resetForm}>Send Another Message</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: 24, color: 'var(--navy)' }}>Send a Message</h3>

                  {status === 'error' && (
                    <div className="alert alert-error" style={{ marginBottom: 20 }}>
                      <AlertCircle size={16} />
                      <span>Something went wrong. Please try again or contact us directly by email.</span>
                    </div>
                  )}

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <FormField label="Full Name" required error={errors.name}>
                      <input className={`form-input ${errors.name ? 'error' : ''}`} value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Your name" />
                    </FormField>
                    <FormField label="Phone" error={errors.phone} hint="Optional">
                      <input className={`form-input ${errors.phone ? 'error' : ''}`} type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="98765 43210" />
                    </FormField>
                  </div>

                  <FormField label="Email Address" required error={errors.email}>
                    <input className={`form-input ${errors.email ? 'error' : ''}`} type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="you@example.com" />
                  </FormField>

                  <FormField label="Category" required error={errors.category}>
                    <select className={`form-input ${errors.category ? 'error' : ''}`} value={form.category} onChange={e => handleChange('category', e.target.value)}>
                      <option value="">Select a category</option>
                      {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </FormField>

                  <FormField label="Subject" required error={errors.subject}>
                    <input className={`form-input ${errors.subject ? 'error' : ''}`} value={form.subject} onChange={e => handleChange('subject', e.target.value)} placeholder="What is your message about?" />
                  </FormField>

                  <FormField label="Message" required error={errors.message}>
                    <textarea className={`form-input ${errors.message ? 'error' : ''}`} rows={5} value={form.message}
                      onChange={e => handleChange('message', e.target.value)}
                      placeholder="Describe your question or issue in detail…" style={{ resize: 'vertical' }} />
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>{form.message.length} characters</div>
                  </FormField>

                  <button className="btn btn-primary w-full" type="submit" disabled={status === 'loading'} style={{ justifyContent: 'center', marginTop: 8 }}>
                    {status === 'loading' ? <><div className="spinner" /> Sending…</> : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default ContactPage;
