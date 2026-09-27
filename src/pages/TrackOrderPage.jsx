import { useState, useEffect } from 'react';
import { CheckCircle, Package, Search } from 'lucide-react';
import { Page, PageHero } from '../components/shared';

const TIMELINE = [
  { id: 'confirmed', label: 'Order Confirmed', desc: 'Your order has been received.' },
  { id: 'processing', label: 'Processing', desc: 'Your order is being prepared.' },
  { id: 'packed', label: 'Packed', desc: 'Your OdorLock has been packed.' },
  { id: 'shipped', label: 'Shipped', desc: 'Your order is on the way.' },
  { id: 'out_for_delivery', label: 'Out for Delivery', desc: 'Your order will be delivered today.' },
  { id: 'delivered', label: 'Delivered', desc: 'Your order has been delivered!' },
];

const TrackOrderPage = () => {
  const [orderId, setOrderId] = useState('');
  const [found, setFound] = useState(null);
  const [searched, setSearched] = useState(false);
  const [demoStep, setDemoStep] = useState(1); // which step is "active" in demo

  // Load latest order from localStorage on mount
  useEffect(() => {
    try {
      const orders = JSON.parse(localStorage.getItem('odorlock_orders') || '[]');
      if (orders.length > 0) {
        setFound(orders[0]);
        setOrderId(orders[0].id);
        setSearched(true);
      }
    } catch {}
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const orders = JSON.parse(localStorage.getItem('odorlock_orders') || '[]');
    const order = orders.find(o => o.id === orderId.trim());
    setFound(order || null);
    setSearched(true);
  };

  return (
    <Page>
      <PageHero
        badge="Order Tracking"
        title="Track Your Order"
        subtitle="Enter your order ID to check your delivery status."
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 720, margin: '0 auto' }}>
          {/* Search */}
          <form onSubmit={handleSearch} style={{ display: 'flex', gap: 12, marginBottom: 40 }}>
            <input
              className="form-input"
              value={orderId}
              onChange={e => setOrderId(e.target.value)}
              placeholder="Enter your Order ID (e.g. OL-12345678)"
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary">
              <Search size={16} /> Track
            </button>
          </form>

          {searched && !found && (
            <div className="alert alert-error" style={{ marginBottom: 24 }}>
              <Package size={16} />
              <span>No order found with that ID. Please check and try again.</span>
            </div>
          )}

          {found && (
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 40, boxShadow: 'var(--shadow-md)' }}>
              {/* Order meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32, flexWrap: 'wrap', gap: 16 }}>
                <div>
                  <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 4 }}>Order ID</div>
                  <div style={{ fontFamily: 'monospace', fontWeight: 700, fontSize: '1.125rem', color: 'var(--navy)' }}>{found.id}</div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    Placed on {new Date(found.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </div>
                <span className="badge badge-green" style={{ fontSize: '0.875rem', padding: '6px 14px' }}>
                  <CheckCircle size={13} style={{ marginRight: 4 }} />
                  {found.status === 'confirmed' ? 'Order Confirmed' : found.status}
                </span>
              </div>

              {/* Timeline */}
              <div style={{ marginBottom: 32 }}>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 20, color: 'var(--navy)' }}>Delivery Status</h3>
                <div className="track-timeline">
                  {TIMELINE.map((step, i) => {
                    const isDone = i < demoStep;
                    const isActive = i === demoStep;
                    return (
                      <div key={step.id} className={`track-step ${isDone ? 'done' : isActive ? 'active' : 'pending'}`}>
                        <div className="track-dot" />
                        <div style={{ paddingLeft: 4 }}>
                          <div className="track-step-label">{step.label}</div>
                          <div className="track-step-date">{isDone || isActive ? step.desc : 'Upcoming'}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step simulator */}
              <div style={{ background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: 24 }}>
                <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                  🎮 Demo: simulate delivery progress
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  {TIMELINE.map((step, i) => (
                    <button key={step.id} onClick={() => setDemoStep(i)}
                      className={`btn btn-sm ${demoStep === i ? 'btn-primary' : 'btn-outline'}`}
                      style={{ fontSize: '0.75rem' }}>
                      {step.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery info */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
                  {[
                    { label: 'Delivery Method', value: found.delivery === 'express' ? 'Express Delivery' : 'Standard Delivery' },
                    { label: 'Destination', value: `${found.shipping?.city}, ${found.shipping?.state}` },
                  ].map(item => (
                    <div key={item.label}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{item.label}</div>
                      <div style={{ fontWeight: 500, color: 'var(--navy)' }}>{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 24, padding: '12px 16px', background: 'var(--off-white)', borderRadius: 'var(--radius-md)', fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center' }}>
                ⚠️ This is a demo tracking experience. No physical shipment exists.
              </div>
            </div>
          )}

          {!searched && (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
              <Package size={48} style={{ color: 'var(--text-light)', margin: '0 auto 16px' }} />
              <p>Enter your order ID above to track your delivery.</p>
              <p style={{ marginTop: 8, fontSize: '0.875rem' }}>Order IDs start with <strong>OL-</strong></p>
            </div>
          )}
        </div>
      </section>
    </Page>
  );
};

export default TrackOrderPage;
