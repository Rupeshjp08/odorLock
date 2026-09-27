import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Check, Plus, ChevronRight, Filter, AlertCircle } from 'lucide-react';
import { Page, PageHero, Stars, useToast } from '../components/shared';
import { DEMO_TESTIMONIALS } from '../data/config';

// ============================================================
// REVIEWS PAGE
// ============================================================
const ReviewsPage = () => {
  const toast = useToast();
  const [reviews, setReviews] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('odorlock_reviews') || '[]');
      return [...DEMO_TESTIMONIALS.map(t => ({ ...t, source: 'demo' })), ...saved];
    } catch {
      return DEMO_TESTIMONIALS.map(t => ({ ...t, source: 'demo' }));
    }
  });

  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: '', rating: 5, review: '' });
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const filtered = reviews
    .filter(r => filter === 'all' || r.rating === parseInt(filter))
    .sort((a, b) => sortBy === 'newest' ? -1 : sortBy === 'highest' ? b.rating - a.rating : a.rating - b.rating);

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.review.trim() || form.review.length < 20) e.review = 'Review must be at least 20 characters';
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setFormErrors(errs); return; }
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));

    const newReview = {
      id: `user-${Date.now()}`,
      name: form.name,
      rating: form.rating,
      review: form.review,
      avatar: form.name.slice(0, 2).toUpperCase(),
      date: 'Just now',
      verified: false,
      source: 'user',
      status: 'pending',
      isDemo: false,
    };

    const saved = JSON.parse(localStorage.getItem('odorlock_reviews') || '[]');
    saved.unshift(newReview);
    localStorage.setItem('odorlock_reviews', JSON.stringify(saved));
    setReviews(prev => [newReview, ...prev]);
    setSubmitting(false);
    setSubmitted(true);
    toast?.('Review submitted — pending moderation.', 'success');
    setForm({ name: '', rating: 5, review: '' });
    setShowForm(false);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <Page>
      <PageHero
        badge="Customer Reviews"
        title="What Our Customers Say"
        subtitle="Real riders. Real experiences."
      />

      <section className="section">
        <div className="container">
          {/* Rating Summary */}
          <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 32, marginBottom: 40, display: 'flex', gap: 40, alignItems: 'center', flexWrap: 'wrap', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', fontWeight: 900, color: 'var(--navy)', lineHeight: 1 }}>{avgRating}</div>
              <Stars rating={Math.round(parseFloat(avgRating))} />
              <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 6 }}>{reviews.length} reviews</div>
            </div>
            <div style={{ flex: 1, minWidth: 200 }}>
              {[5,4,3,2,1].map(n => {
                const count = reviews.filter(r => r.rating === n).length;
                const pct = reviews.length ? (count / reviews.length * 100).toFixed(0) : 0;
                return (
                  <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', minWidth: 8 }}>{n}</span>
                    <Star size={12} fill="#F59E0B" color="#F59E0B" />
                    <div style={{ flex: 1, height: 8, background: 'var(--light-bg)', borderRadius: 4, overflow: 'hidden' }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: '#F59E0B', borderRadius: 4, transition: 'width 0.5s ease' }} />
                    </div>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: 28 }}>{count}</span>
                  </div>
                );
              })}
            </div>
            <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
              {showForm ? 'Cancel' : '+ Write a Review'}
            </button>
          </div>

          {/* Review Form */}
          {showForm && (
            <div style={{ background: 'white', border: '2px solid var(--green)', borderRadius: 'var(--radius-xl)', padding: 32, marginBottom: 32, boxShadow: 'var(--shadow-green)' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: 20, color: 'var(--navy)' }}>Submit Your Review</h3>
              <div className="alert alert-info" style={{ marginBottom: 20 }}>
                <AlertCircle size={16} />
                <span>All submitted reviews are pending moderation before appearing publicly. Reviews are not automatically marked as "Verified Buyer" unless a verified order exists.</span>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Your Name <span className="required">*</span></label>
                  <input className={`form-input ${formErrors.name ? 'error' : ''}`} value={form.name} onChange={e => { setForm(p => ({ ...p, name: e.target.value })); setFormErrors(p => ({ ...p, name: null })); }} placeholder="Your name" />
                  {formErrors.name && <div className="form-error"><AlertCircle size={12} />{formErrors.name}</div>}
                </div>
                <div className="form-group">
                  <label className="form-label">Rating <span className="required">*</span></label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {[1,2,3,4,5].map(n => (
                      <button key={n} type="button" onClick={() => setForm(p => ({ ...p, rating: n }))}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                        <Star size={28} fill={n <= form.rating ? '#F59E0B' : 'none'} color={n <= form.rating ? '#F59E0B' : '#CBD5E1'} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Your Review <span className="required">*</span></label>
                  <textarea className={`form-input ${formErrors.review ? 'error' : ''}`} rows={4} value={form.review}
                    onChange={e => { setForm(p => ({ ...p, review: e.target.value })); setFormErrors(p => ({ ...p, review: null })); }}
                    placeholder="Share your experience with OdorLock (min. 20 characters)" style={{ resize: 'vertical' }} />
                  {formErrors.review && <div className="form-error"><AlertCircle size={12} />{formErrors.review}</div>}
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 4 }}>{form.review.length} characters</div>
                </div>
                <button className="btn btn-primary" type="submit" disabled={submitting}>
                  {submitting ? <><div className="spinner" /> Submitting…</> : 'Submit Review'}
                </button>
              </form>
            </div>
          )}

          {submitted && (
            <div className="alert alert-success" style={{ marginBottom: 24 }}>
              <Check size={18} />
              <span>Thank you! Your review has been submitted and is pending moderation.</span>
            </div>
          )}

          {/* Filters */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap', alignItems: 'center' }}>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['all', '5', '4', '3', '2', '1'].map(f => (
                <button key={f} onClick={() => setFilter(f)}
                  className={`btn btn-sm ${filter === f ? 'btn-primary' : 'btn-outline'}`}>
                  {f === 'all' ? 'All' : `${f} ★`}
                </button>
              ))}
            </div>
            <select value={sortBy} onChange={e => setSortBy(e.target.value)}
              style={{ marginLeft: 'auto', padding: '8px 12px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', background: 'white', cursor: 'pointer' }}>
              <option value="newest">Newest first</option>
              <option value="highest">Highest rated</option>
              <option value="lowest">Lowest rated</option>
            </select>
          </div>

          {/* Reviews Grid */}
          <div className="reviews-grid">
            {filtered.map(r => (
              <div key={r.id} className="review-card">
                <div className="review-header">
                  <div className="review-avatar">{r.avatar}</div>
                  <div className="review-meta">
                    <div className="name">{r.name}</div>
                    {r.location && <div className="location">{r.location}</div>}
                    {r.status === 'pending' && (
                      <span style={{ fontSize: '0.75rem', color: '#F59E0B', background: '#FFFBEB', padding: '2px 8px', borderRadius: 'var(--radius-full)', display: 'inline-block', marginTop: 2 }}>
                        Pending Review
                      </span>
                    )}
                    {r.isDemo && (
                      <span style={{ fontSize: '0.7rem', color: 'var(--text-light)', display: 'block', marginTop: 2 }}>Demo content</span>
                    )}
                  </div>
                </div>
                <Stars rating={r.rating} />
                <p className="review-text">"{r.review}"</p>
                <div className="review-date">{r.date}</div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
              <Star size={40} style={{ margin: '0 auto 16px', color: 'var(--text-light)' }} />
              <p>No reviews matching this filter.</p>
            </div>
          )}
        </div>
      </section>
    </Page>
  );
};

export default ReviewsPage;
