import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ChevronRight, Truck, Shield, Lock, Droplets, Wind,
  Sparkles, Timer, Check, ArrowRight, Star, Plus,
  RefreshCw, Clock, Zap
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useScrollReveal, Stars, useToast } from '../components/shared';
import {
  FEATURES, WORKFLOW_STEPS, COMPARISON_ROWS, DEMO_TESTIMONIALS, FAQS
} from '../data/config';
import { OdorLock3DViewer } from '../components/OdorLock3DViewer';

// ============================================================
// TRUST BADGE ICON MAP
// ============================================================
const TrustIcon = ({ id }) => {
  if (id === 'delivery') return <Truck size={16} />;
  if (id === 'warranty') return <Shield size={16} />;
  return <Lock size={16} />;
};

const FEATURE_ICONS = { droplets: Droplets, wind: Wind, sparkles: Sparkles, timer: Timer };

// ============================================================
// HERO SECTION
// ============================================================
const Hero = () => {
  const { addToCart } = useCart();
  const toast = useToast();
  const navigate = useNavigate();

  const handleBuy = () => { addToCart(); toast?.('OdorLock added to cart!', 'success'); navigate('/cart'); };
  const handleSeeHow = () => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-grid">
          {/* Left */}
          <div className="fade-in-up">
            <div className="hero-badge">Smart Helmet Care Device</div>
            <h1 className="hero-title">
              A Fresher Helmet.<br />
              <span className="green">After Every Ride.</span>
            </h1>
            <p className="hero-desc">
              OdorLock automatically dries, freshens and cares for your helmet — so you can ride with comfort and confidence.
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-lg" onClick={handleBuy}>
                Buy OdorLock <ChevronRight size={18} />
              </button>
              <button className="btn btn-outline btn-lg" onClick={handleSeeHow}>
                See How It Works
              </button>
            </div>
            <div className="hero-trust">
              {[
                { id: 'delivery', title: 'Free Delivery', sub: 'Across India' },
                { id: 'warranty', title: '1 Year Warranty', sub: 'Peace of mind' },
                { id: 'payments', title: 'Secure Payments', sub: 'UPI / Cards / COD' },
              ].map(t => (
                <div key={t.id} className="trust-item">
                  <div className="trust-icon"><TrustIcon id={t.id} /></div>
                  <div className="trust-text">
                    <span className="label">{t.title}</span>
                    <span className="sublabel">{t.sub}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Seamless Floating Product Render */}
          <div className="hero-product-stage fade-in-up fade-in-up-delay-2">
            {/* Atmospheric soft green glow behind the device */}
            <div className="hero-product-glow" aria-hidden="true" />

            {/* Subtle realistic floor contact shadow underneath the base */}
            <div className="hero-floor-shadow" aria-hidden="true" />

            {/* Freshness Badge */}
            <div className="hero-freshness-badge">
              Freshness in minutes <span>✓</span>
            </div>

            {/* Main Transparent Product Render — no card, no border, no white box */}
            <img
              src="/product-hero.png"
              alt="OdorLock Smart Helmet Care Device"
              className="hero-product-render"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// WHY ODORLOCK
// ============================================================
const WhyOdorLock = () => {
  const [ref, visible] = useScrollReveal();
  const features = FEATURES.slice(0, 4);

  return (
    <section className="section" id="features" ref={ref}>
      <div className="container">
        <div className="section-header centered">
          <h2 className="section-title">Why OdorLock?</h2>
          <p className="section-subtitle">Because your helmet works hard. It deserves better care.</p>
        </div>
        <div className="features-grid">
          {features.map((f, i) => {
            const Icon = FEATURE_ICONS[f.icon] || Sparkles;
            return (
              <div 
                key={f.id} 
                className="card fade-in-up" 
                style={{ 
                  animationDelay: `${i * 0.1}s`, 
                  opacity: visible ? 1 : 0, 
                  transform: visible ? 'none' : 'translateY(20px)', 
                  transition: `all 0.5s ease ${i * 0.1}s`,
                  display: 'flex',
                  flexDirection: 'column',
                  padding: 18,
                  overflow: 'hidden'
                }}
              >
                {/* Feature Hardware Image */}
                <div style={{
                  position: 'relative',
                  width: '100%',
                  height: 160,
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  background: 'radial-gradient(circle at 50% 50%, rgba(29, 185, 84, 0.08) 0%, #F8FAFC 85%)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  marginBottom: 14,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img 
                    src={f.image} 
                    alt={f.title} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain', 
                      padding: 10,
                      transition: 'transform 0.3s ease',
                    }} 
                    loading="lazy"
                  />
                  <div style={{
                    position: 'absolute',
                    top: 8,
                    left: 8,
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(6px)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.625rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                    border: '1px solid rgba(0,0,0,0.06)',
                  }}>
                    {f.category}
                  </div>
                  <div style={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    background: 'rgba(29, 185, 84, 0.12)',
                    border: '1px solid rgba(29, 185, 84, 0.25)',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.625rem',
                    fontWeight: 800,
                    color: 'var(--green-dark)',
                  }}>
                    {f.metric}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <div className="card-icon" style={{ width: 34, height: 34, marginBottom: 0 }}>
                    <Icon size={18} />
                  </div>
                  <h3 className="heading-md" style={{ margin: 0, fontSize: '1rem' }}>{f.title}</h3>
                </div>

                <p className="body-sm text-muted" style={{ margin: '0 0 12px 0', flex: 1 }}>{f.shortDesc}</p>

                {/* Benefits Tag Bar */}
                <div style={{ 
                  display: 'flex', 
                  flexWrap: 'wrap', 
                  gap: 4, 
                  paddingTop: 10, 
                  borderTop: '1px solid var(--border)' 
                }}>
                  {f.benefits.slice(0, 2).map((b) => (
                    <span 
                      key={b} 
                      style={{ 
                        background: 'var(--off-white)', 
                        color: 'var(--text-secondary)', 
                        fontSize: '0.625rem', 
                        fontWeight: 600, 
                        padding: '2px 8px', 
                        borderRadius: 'var(--radius-full)',
                        border: '1px solid var(--border)'
                      }}
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-40">
          <Link to="/features" className="btn btn-outline">
            See All Features <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// HOW IT WORKS
// ============================================================
const HowItWorks = () => {
  const stepsRef = useRef(null);
  const [visibleSteps, setVisibleSteps] = useState([]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const idx = parseInt(entry.target.dataset.step);
          setVisibleSteps(prev => [...new Set([...prev, idx])]);
        }
      });
    }, { threshold: 0.3 });

    const steps = stepsRef.current?.querySelectorAll('.works-step');
    steps?.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <section className="section works-section" id="how-it-works">
      <div className="container">
        <div className="works-grid">
          {/* Left */}
          <div>
            <div className="section-label">Simple Steps</div>
            <h2 className="section-title">How OdorLock Works</h2>
            <p className="section-subtitle">Just 4 easy steps to a cleaner, fresher helmet.</p>
            <div className="mt-32">
              <Link to="/how-it-works" className="btn btn-primary">
                See Full Process <ChevronRight size={16} />
              </Link>
            </div>
          </div>

          {/* Right — Steps */}
          <div className="works-steps" ref={stepsRef}>
            {WORKFLOW_STEPS.map((step, i) => (
              <div key={step.id} className={`works-step ${visibleSteps.includes(i) ? 'visible active' : ''}`} data-step={i}>
                <div className="step-circle">
                  <span className="step-num">{step.id}</span>
                  {i === 0 && <img src="/product.jpg" alt="" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: '50%' }} />}
                  {i === 1 && <RefreshCw size={24} color="var(--green)" />}
                  {i === 2 && <Clock size={24} color="var(--navy)" />}
                  {i === 3 && <img src="/product.jpg" alt="" style={{ width: 36, height: 36, objectFit: 'cover', borderRadius: '50%', filter: 'hue-rotate(90deg)' }} />}
                </div>
                <div>
                  <div className="step-title">{step.title}</div>
                  <div className="step-desc">{step.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// COMPARISON
// ============================================================
const Comparison = () => {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="section comparison-section" ref={ref}>
      <div className="container">
        <div className="section-header centered">
          <h2 className="section-title">OdorLock vs. Regular Care</h2>
          <p className="section-subtitle">A smarter, easier and more convenient way to care for your helmet.</p>
        </div>
        <div className="comparison-grid">
          <div className="comparison-table">
            <div className="comparison-table-head">
              <div>Feature</div>
              <div className="col-odorlock">OdorLock</div>
              <div>Traditional Methods</div>
            </div>
            {COMPARISON_ROWS.map((row, i) => (
              <div key={i} className="comparison-row" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(-12px)', transition: `all 0.4s ease ${i * 0.08}s` }}>
                <div className="col-feature">
                  {i === 0 && <Clock size={14} />}
                  {i === 1 && <Sparkles size={14} />}
                  {i === 2 && <Zap size={14} />}
                  {i === 3 && <Shield size={14} />}
                  {i === 4 && <RefreshCw size={14} />}
                  {i === 5 && <Check size={14} />}
                  {row.feature}
                </div>
                <div className="col-odorlock-val">
                  <Check size={12} style={{ display: 'inline', marginRight: 4, color: 'var(--green)' }} />
                  {row.odorlock}
                </div>
                <div className="col-traditional-val">{row.traditional}</div>
              </div>
            ))}
          </div>

          <div className="comparison-aside">
            <div className="comparison-aside-product">
              <img src="/product.jpg" alt="OdorLock Device" />
            </div>
            <div className="comparison-aside-tagline">Better care.<br />Longer life.</div>
            <p className="comparison-aside-sub">Keep your helmet in great condition, ride after ride.</p>
            <div className="mt-24">
              <Link to="/product" className="btn btn-primary">
                Get OdorLock <ChevronRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// REVIEWS
// ============================================================
const Reviews = () => {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="section reviews-section" ref={ref}>
      <div className="container">
        <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <h2 className="section-title">What Our Customers Say</h2>
            <p className="section-subtitle">Real riders. Real experiences.</p>
          </div>
          <Link to="/reviews" className="btn btn-ghost" style={{ flexShrink: 0 }}>
            View All Reviews <ArrowRight size={14} />
          </Link>
        </div>
        <div className="reviews-grid">
          {DEMO_TESTIMONIALS.map((t, i) => (
            <div key={t.id} className="review-card" style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(16px)', transition: `all 0.5s ease ${i * 0.12}s` }}>
              <div className="review-header">
                <div className="review-avatar">{t.avatar}</div>
                <div className="review-meta">
                  <div className="name">{t.name}</div>
                  <div className="location">{t.location}</div>
                  {t.verified && <div className="verified"><Check size={10} /> Verified Buyer</div>}
                </div>
              </div>
              <Stars rating={t.rating} />
              <p className="review-text">"{t.review}"</p>
              <div className="review-date">{t.date}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// FAQ PREVIEW
// ============================================================
const FAQPreview = () => {
  const [openId, setOpenId] = useState(null);
  const preview = FAQS.slice(0, 6);

  return (
    <section className="section faq-section">
      <div className="container">
        <div className="section-header" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40 }}>
          <div>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything you need to know about OdorLock.</p>
          </div>
          <Link to="/faq" className="btn btn-ghost" style={{ flexShrink: 0 }}>
            View All FAQs <ArrowRight size={14} />
          </Link>
        </div>
        <div className="faq-grid">
          {preview.map(faq => (
            <div key={faq.id} className={`faq-item ${openId === faq.id ? 'open' : ''}`}>
              <button className="faq-question" onClick={() => setOpenId(openId === faq.id ? null : faq.id)}>
                <span>{faq.question}</span>
                <span className="faq-icon"><Plus size={12} /></span>
              </button>
              <div className="faq-answer">
                <div className="faq-answer-inner">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// 3D INTERACTIVE SHOWCASE
// ============================================================
const ThreeDExperience = () => {
  return (
    <section className="section" id="3d-model" style={{ background: 'var(--off-white)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '72px 0' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 36px' }}>
          <div className="badge badge-green" style={{ marginBottom: 12 }}>Next-Gen 3D Interactive Studio</div>
          <h2 className="section-title">Explore OdorLock in Full 3D</h2>
          <p className="section-subtitle">
            Drag to rotate in 360°, inspect the 12-layer exploded internal engineering architecture, reveal internal mechanics via interactive X-Ray wipe, and inspect orthographic blueprints in real time.
          </p>
        </div>

        <OdorLock3DViewer height="600px" />
      </div>
    </section>
  );
};

// ============================================================
// HOME PAGE
// ============================================================
const HomePage = () => (
  <>
    <Hero />
    <WhyOdorLock />
    <HowItWorks />
    <Comparison />
    <ThreeDExperience />
    <Reviews />
    <FAQPreview />
  </>
);

export default HomePage;
