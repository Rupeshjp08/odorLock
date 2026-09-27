import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, ChevronLeft, User, MapPin, Truck, CreditCard,
  CheckCircle, Smartphone, Building, Clock, Check, AlertCircle, X
} from 'lucide-react';
import { Page, FormField, useToast } from '../components/shared';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { PRODUCT } from '../data/config';

// ============================================================
// STEP NAMES
// ============================================================
const STEPS = ['Customer Info', 'Shipping', 'Delivery', 'Payment', 'Review', 'Confirmed'];

// ============================================================
// ORDER SUMMARY PANEL
// ============================================================
const OrderSummary = ({ items }) => (
  <div className="order-summary-card">
    <div className="order-summary-head">Order Summary</div>
    <div className="order-summary-body">
      {items.map(item => (
        <div key={item.id} className="order-item">
          <img src={item.image} alt={item.name} className="order-item-img" />
          <div>
            <div className="order-item-name">{item.name}</div>
            <div className="order-item-qty">Qty: {item.quantity}</div>
          </div>
        </div>
      ))}
      <div className="order-total-note">
        Order total will be calculated securely at payment.
      </div>
      <div style={{ marginTop: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 8 }}>
          <span>Delivery</span><span style={{ color: 'var(--green)', fontWeight: 600 }}>Free</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <span>Warranty</span><span style={{ fontWeight: 500, color: 'var(--navy)' }}>1 Year</span>
        </div>
      </div>
    </div>
  </div>
);

// ============================================================
// STEP 1 — CUSTOMER INFO
// ============================================================
const Step1 = ({ data, setData, onNext }) => {
  const [errors, setErrors] = useState({});
  const { user } = useAuth();

  const init = data.customer || { name: user?.name || '', email: user?.email || '', phone: user?.phone || '' };

  const [form, setForm] = useState(init);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, ''))) e.phone = 'Valid 10-digit phone required';
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setData(prev => ({ ...prev, customer: form }));
    onNext();
  };

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  return (
    <div>
      <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: 24, color: 'var(--navy)' }}>Customer Information</h3>
      <FormField label="Full Name" required error={errors.name}>
        <input className={`form-input ${errors.name ? 'error' : ''}`} value={form.name} onChange={e => handleChange('name', e.target.value)} placeholder="Your full name" />
      </FormField>
      <FormField label="Email Address" required error={errors.email}>
        <input className={`form-input ${errors.email ? 'error' : ''}`} type="email" value={form.email} onChange={e => handleChange('email', e.target.value)} placeholder="you@example.com" />
      </FormField>
      <FormField label="Phone Number" required error={errors.phone} hint="10-digit Indian mobile number">
        <input className={`form-input ${errors.phone ? 'error' : ''}`} type="tel" value={form.phone} onChange={e => handleChange('phone', e.target.value)} placeholder="98765 43210" />
      </FormField>
      <button className="btn btn-primary" onClick={submit}>
        Continue <ChevronRight size={16} />
      </button>
    </div>
  );
};

// ============================================================
// STEP 2 — SHIPPING
// ============================================================
const Step2 = ({ data, setData, onNext, onBack }) => {
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(data.shipping || { address: '', city: '', state: '', pincode: '' });
  const STATES = ['Andhra Pradesh','Bihar','Delhi','Goa','Gujarat','Haryana','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Punjab','Rajasthan','Tamil Nadu','Telangana','Uttar Pradesh','West Bengal'];

  const validate = () => {
    const e = {};
    if (!form.address.trim()) e.address = 'Address is required';
    if (!form.city.trim()) e.city = 'City is required';
    if (!form.state) e.state = 'State is required';
    if (!form.pincode.trim() || !/^\d{6}$/.test(form.pincode)) e.pincode = 'Valid 6-digit pincode required';
    return e;
  };

  const submit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setData(prev => ({ ...prev, shipping: form }));
    onNext();
  };

  const handleChange = (field, val) => {
    setForm(prev => ({ ...prev, [field]: val }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: null }));
  };

  return (
    <div>
      <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: 24, color: 'var(--navy)' }}>Shipping Address</h3>
      <FormField label="Street Address" required error={errors.address}>
        <input className={`form-input ${errors.address ? 'error' : ''}`} value={form.address} onChange={e => handleChange('address', e.target.value)} placeholder="House no., Street, Area" />
      </FormField>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <FormField label="City" required error={errors.city}>
          <input className={`form-input ${errors.city ? 'error' : ''}`} value={form.city} onChange={e => handleChange('city', e.target.value)} placeholder="City" />
        </FormField>
        <FormField label="Pincode" required error={errors.pincode}>
          <input className={`form-input ${errors.pincode ? 'error' : ''}`} value={form.pincode} onChange={e => handleChange('pincode', e.target.value)} placeholder="110001" maxLength={6} />
        </FormField>
      </div>
      <FormField label="State" required error={errors.state}>
        <select className={`form-input ${errors.state ? 'error' : ''}`} value={form.state} onChange={e => handleChange('state', e.target.value)}>
          <option value="">Select State</option>
          {STATES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
      </FormField>
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-ghost" onClick={onBack}><ChevronLeft size={16} /> Back</button>
        <button className="btn btn-primary" onClick={submit}>Continue <ChevronRight size={16} /></button>
      </div>
    </div>
  );
};

// ============================================================
// STEP 3 — DELIVERY
// ============================================================
const Step3 = ({ data, setData, onNext, onBack }) => {
  const [selected, setSelected] = useState(data.delivery || 'standard');

  const options = [
    { id: 'standard', label: 'Standard Delivery', desc: 'Delivered in 5–7 business days', icon: '📦', note: 'Free' },
    { id: 'express', label: 'Express Delivery', desc: 'Delivered in 2–3 business days', icon: '⚡', note: 'Available at checkout' },
  ];

  const submit = () => {
    setData(prev => ({ ...prev, delivery: selected }));
    onNext();
  };

  return (
    <div>
      <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: 24, color: 'var(--navy)' }}>Delivery Method</h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
        {options.map(opt => (
          <div key={opt.id} className={`payment-method-btn ${selected === opt.id ? 'selected' : ''}`} onClick={() => setSelected(opt.id)}>
            <span style={{ fontSize: '1.5rem' }}>{opt.icon}</span>
            <div style={{ flex: 1 }}>
              <div className="payment-name">{opt.label}</div>
              <div className="payment-desc">{opt.desc}</div>
            </div>
            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: 'var(--green)' }}>{opt.note}</div>
            {selected === opt.id && <CheckCircle size={18} color="var(--green)" />}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-ghost" onClick={onBack}><ChevronLeft size={16} /> Back</button>
        <button className="btn btn-primary" onClick={submit}>Continue <ChevronRight size={16} /></button>
      </div>
    </div>
  );
};

// ============================================================
// STEP 4 — PAYMENT
// ============================================================
const Step4 = ({ data, setData, onNext, onBack }) => {
  const [method, setMethod] = useState(data.paymentMethod || 'upi');
  const [emiMonths, setEmiMonths] = useState(data.emiMonths || 3);

  const methods = [
    { id: 'upi', icon: <Smartphone size={20} />, name: 'UPI', desc: 'Pay via any UPI app' },
    { id: 'card', icon: <CreditCard size={20} />, name: 'Credit / Debit Card', desc: 'Visa, Mastercard, RuPay' },
    { id: 'netbanking', icon: <Building size={20} />, name: 'Net Banking', desc: 'All major Indian banks' },
    { id: 'emi', icon: <Clock size={20} />, name: 'EMI', desc: 'Easy monthly installments' },
    { id: 'paylater', icon: <CheckCircle size={20} />, name: 'Pay Later', desc: 'Buy now, pay later options' },
  ];

  const submit = () => {
    setData(prev => ({ ...prev, paymentMethod: method, emiMonths: method === 'emi' ? emiMonths : null }));
    onNext();
  };

  return (
    <div>
      <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: 24, color: 'var(--navy)' }}>Payment Method</h3>
      <div className="payment-methods" style={{ marginBottom: 24 }}>
        {methods.map(m => (
          <div key={m.id} className={`payment-method-btn ${method === m.id ? 'selected' : ''}`} onClick={() => setMethod(m.id)}>
            <div className="payment-icon">{m.icon}</div>
            <div style={{ flex: 1 }}>
              <div className="payment-name">{m.name}</div>
              <div className="payment-desc">{m.desc}</div>
            </div>
            {method === m.id && <CheckCircle size={18} color="var(--green)" />}
          </div>
        ))}
      </div>

      {method === 'emi' && (
        <div style={{ background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', marginBottom: 24 }}>
          <div style={{ fontWeight: 600, marginBottom: 12, fontSize: '0.9375rem' }}>Select EMI Duration</div>
          <div className="emi-options">
            {[3, 6, 9, 12].map(m => (
              <div key={m} className={`emi-option ${emiMonths === m ? 'selected' : ''}`} onClick={() => setEmiMonths(m)}>
                <div className="emi-months">{m}</div>
                <div className="emi-label">Months</div>
                <div className="emi-note">Details at payment</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16, background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '12px 14px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            Monthly installment details will be calculated securely at payment by the payment provider.
          </div>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-ghost" onClick={onBack}><ChevronLeft size={16} /> Back</button>
        <button className="btn btn-primary" onClick={submit}>Review Order <ChevronRight size={16} /></button>
      </div>
    </div>
  );
};

// ============================================================
// STEP 5 — REVIEW
// ============================================================
const Step5 = ({ data, items, onNext, onBack }) => {
  const [loading, setLoading] = useState(false);
  const [payError, setPayError] = useState(null);
  const toast = useToast();

  const handlePlaceOrder = async () => {
    setLoading(true);
    setPayError(null);
    await new Promise(r => setTimeout(r, 2000));

    // Demo: 90% success rate
    const success = Math.random() > 0.1;
    if (success) {
      onNext();
    } else {
      setPayError('Payment could not be processed. Please try again or choose a different payment method.');
    }
    setLoading(false);
  };

  return (
    <div>
      <h3 style={{ fontWeight: 700, fontSize: '1.125rem', marginBottom: 24, color: 'var(--navy)' }}>Review Your Order</h3>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
        {[
          { label: 'Customer', value: `${data.customer?.name} · ${data.customer?.email} · ${data.customer?.phone}` },
          { label: 'Shipping', value: `${data.shipping?.address}, ${data.shipping?.city}, ${data.shipping?.state} ${data.shipping?.pincode}` },
          { label: 'Delivery', value: data.delivery === 'express' ? 'Express Delivery (2–3 days)' : 'Standard Delivery (5–7 days)' },
          { label: 'Payment', value: data.paymentMethod === 'emi' ? `EMI — ${data.emiMonths} months` : data.paymentMethod?.toUpperCase() },
        ].map(row => (
          <div key={row.label} style={{ display: 'flex', gap: 16, padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
            <div style={{ minWidth: 90, fontWeight: 600, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{row.label}</div>
            <div style={{ fontSize: '0.9375rem', color: 'var(--navy)' }}>{row.value}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '14px 16px', marginBottom: 24, fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center' }}>
        🔒 Your payment will be processed securely. Order total confirmed at payment.
      </div>

      {payError && (
        <div className="alert alert-error" style={{ marginBottom: 20 }}>
          <AlertCircle size={18} /><span>{payError}</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        <button className="btn btn-ghost" onClick={onBack} disabled={loading}><ChevronLeft size={16} /> Back</button>
        <button className="btn btn-primary" onClick={handlePlaceOrder} disabled={loading} style={{ minWidth: 180 }}>
          {loading ? (
            <><div className="spinner" /> Processing…</>
          ) : (
            <><Check size={16} /> Place Order</>
          )}
        </button>
      </div>
    </div>
  );
};

// ============================================================
// STEP 6 — CONFIRMED
// ============================================================
const Step6 = ({ data }) => {
  const navigate = useNavigate();
  const { clearCart } = useCart();
  const orderId = `OL-${Date.now().toString().slice(-8)}`;

  // Save demo order
  const saveOrder = () => {
    try {
      const orders = JSON.parse(localStorage.getItem('odorlock_orders') || '[]');
      orders.unshift({
        id: orderId,
        date: new Date().toISOString(),
        status: 'confirmed',
        customer: data.customer,
        shipping: data.shipping,
        delivery: data.delivery,
        payment: data.paymentMethod,
      });
      localStorage.setItem('odorlock_orders', JSON.stringify(orders));
      clearCart();
    } catch {}
  };

  // Save on mount
  useState(() => { saveOrder(); }, []);

  return (
    <div style={{ textAlign: 'center', padding: '32px 20px' }}>
      <div style={{ width: 80, height: 80, background: 'var(--green-muted)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
        <CheckCircle size={40} color="var(--green)" />
      </div>
      <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--navy)', marginBottom: 8 }}>Order Confirmed!</h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: 24, fontSize: '1rem' }}>
        Thank you for your order. We'll send updates to {data.customer?.email}.
      </p>
      <div style={{ background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '20px', display: 'inline-block', marginBottom: 32, textAlign: 'left', minWidth: 280 }}>
        <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 4 }}>Order ID</div>
        <div style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--navy)', fontFamily: 'monospace', marginBottom: 12 }}>{orderId}</div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Delivery to: {data.shipping?.city}, {data.shipping?.state}
        </div>
        <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          Method: {data.delivery === 'express' ? 'Express (2–3 days)' : 'Standard (5–7 days)'}
        </div>
        <div style={{ marginTop: 8, fontSize: '0.8125rem', color: 'var(--text-light)' }}>
          ⚠️ This is a demo order. No actual product has been dispatched.
        </div>
      </div>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
        <button className="btn btn-primary" onClick={() => navigate('/track-order')}>Track Order <ChevronRight size={16} /></button>
        <button className="btn btn-outline" onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    </div>
  );
};

// ============================================================
// CHECKOUT PAGE
// ============================================================
const CheckoutPage = () => {
  const { items } = useCart();
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const navigate = useNavigate();

  if (items.length === 0 && step < 5) {
    return (
      <Page>
        <div style={{ padding: '80px 24px', textAlign: 'center' }}>
          <h2 style={{ marginBottom: 12 }}>Your cart is empty</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Add a product before proceeding to checkout.</p>
          <button className="btn btn-primary" onClick={() => navigate('/product')}>View Product</button>
        </div>
      </Page>
    );
  }

  const stepComponents = [
    <Step1 data={data} setData={setData} onNext={() => setStep(1)} />,
    <Step2 data={data} setData={setData} onNext={() => setStep(2)} onBack={() => setStep(0)} />,
    <Step3 data={data} setData={setData} onNext={() => setStep(3)} onBack={() => setStep(1)} />,
    <Step4 data={data} setData={setData} onNext={() => setStep(4)} onBack={() => setStep(2)} />,
    <Step5 data={data} items={items} onNext={() => setStep(5)} onBack={() => setStep(3)} />,
    <Step6 data={data} />,
  ];

  return (
    <Page>
      <div style={{ background: 'var(--off-white)', borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
        <div className="container">
          <h1 style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--navy)' }}>Checkout</h1>
        </div>
      </div>

      <section className="section" style={{ padding: '40px 0 80px' }}>
        <div className="container">
          {/* Step indicator */}
          <div className="checkout-steps" style={{ marginBottom: 32 }}>
            {STEPS.slice(0, 6).map((s, i) => (
              <div key={s} className={`checkout-step-btn ${i === step ? 'active' : i < step ? 'done' : ''}`}>
                {i < step ? <Check size={12} style={{ display: 'inline', marginRight: 4 }} /> : null}
                {s}
              </div>
            ))}
          </div>

          <div className="checkout-wrap">
            <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: '32px', boxShadow: 'var(--shadow-sm)' }}>
              {stepComponents[step]}
            </div>
            {step < 5 && <OrderSummary items={items} />}
          </div>
        </div>
      </section>
    </Page>
  );
};

export default CheckoutPage;
