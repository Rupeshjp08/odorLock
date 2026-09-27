import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  Check, 
  Shield, 
  Truck, 
  Droplets, 
  Wind, 
  Sparkles, 
  Timer, 
  Package, 
  RefreshCw 
} from 'lucide-react';
import { Page, useToast } from '../components/shared';
import { useCart } from '../context/CartContext';
import { PRODUCT } from '../data/config';

// ============================================================
// COLOR SWATCH
// ============================================================
const ColorSwatch = ({ variant, selected, onClick }) => (
  <button
    onClick={onClick}
    aria-label={`Select ${variant.label}`}
    aria-pressed={selected}
    title={variant.label}
    style={{
      width: 40,
      height: 40,
      borderRadius: '50%',
      background: variant.color,
      border: selected
        ? `3px solid var(--green)`
        : `2px solid ${variant.border}`,
      cursor: 'pointer',
      position: 'relative',
      transition: 'all 0.2s ease',
      boxShadow: selected
        ? '0 0 0 3px rgba(29,185,84,0.25)'
        : 'inset 0 0 0 1px rgba(0,0,0,0.12)',
      transform: selected ? 'scale(1.12)' : 'scale(1)',
      outline: 'none',
    }}
  >
    {selected && (
      <span style={{
        position: 'absolute', inset: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <Check
          size={14}
          color={variant.id === 'white' ? '#0F172A' : 'white'}
          strokeWidth={3}
        />
      </span>
    )}
  </button>
);

// ============================================================
// PRODUCT PAGE
// ============================================================
const ProductPage = () => {
  const { addToCart } = useCart();
  const toast = useToast();
  const navigate = useNavigate();

  const [selectedVariant, setSelectedVariant] = useState(PRODUCT.variants[0]);
  const [activeImg, setActiveImg] = useState(PRODUCT.variants[0].image);
  const [added, setAdded] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);

  const handleSelectVariant = (variant) => {
    if (!variant.available) return;
    setImgLoading(true);
    setSelectedVariant(variant);
    setActiveImg(variant.image);
    setTimeout(() => setImgLoading(false), 300);
  };

  const handleAddToCart = () => {
    addToCart(selectedVariant.id, selectedVariant.label);
    setAdded(true);
    toast?.(`${selectedVariant.label} added to your cart!`, 'success');
    setTimeout(() => setAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(selectedVariant.id, selectedVariant.label);
    navigate('/checkout');
  };

  const specs = [
    { icon: Droplets, label: 'Moisture Detection', value: 'Built-in sensor' },
    { icon: Wind, label: 'Airflow', value: 'Directed, gentle' },
    { icon: Sparkles, label: 'Odor Control', value: 'Automatic stage' },
    { icon: Timer, label: 'Shutoff', value: 'Automatic' },
    { icon: Package, label: 'Size', value: 'Compact — specs coming soon' },
    { icon: RefreshCw, label: 'Cycle', value: 'One-touch automatic' },
  ];

  return (
    <Page>
      {/* Breadcrumb */}
      <div style={{ background: 'var(--off-white)', borderBottom: '1px solid var(--border)', padding: '12px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', gap: 8, fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
            <Link to="/" style={{ color: 'var(--text-muted)' }}>Home</Link>
            <span>/</span>
            <span style={{ color: 'var(--navy)' }}>Product</span>
          </div>
        </div>
      </div>

      <section className="section">
        <div className="container">
          <div className="product-grid">

            {/* ── LEFT: PRODUCT IMAGE GALLERY ─────────────────── */}
            <div>
              <div
                className="product-image-main"
                style={{
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
                  borderRadius: 'var(--radius-xl)',
                  border: '1px solid var(--border)',
                }}
              >
                {/* Green ambient glow that matches the product */}
                <div style={{
                  position: 'absolute',
                  bottom: 0, left: '50%',
                  transform: 'translateX(-50%)',
                  width: '70%', height: '30%',
                  background: 'radial-gradient(ellipse, rgba(29,185,84,0.18) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }} />

                <img
                  key={activeImg}
                  src={activeImg}
                  alt={`OdorLock — ${selectedVariant.label}`}
                  style={{
                    width: '100%',
                    aspectRatio: '1',
                    objectFit: 'contain',
                    padding: '24px',
                    opacity: imgLoading ? 0 : 1,
                    transform: imgLoading ? 'scale(0.96)' : 'scale(1)',
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                  }}
                />

                {/* Variant badge on image */}
                <div style={{
                  position: 'absolute', top: 16, left: 16,
                  background: selectedVariant.id === 'black' ? '#1E293B' : 'white',
                  color: selectedVariant.id === 'black' ? 'white' : 'var(--navy)',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-full)',
                  padding: '4px 12px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  boxShadow: 'var(--shadow-sm)',
                }}>
                  {selectedVariant.label}
                </div>
              </div>

              {/* Thumbnail strip */}
              <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                {PRODUCT.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => handleSelectVariant(v)}
                    style={{
                      flex: 1,
                      border: activeImg === v.image
                        ? '2px solid var(--green)'
                        : '2px solid var(--border)',
                      borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      background: 'var(--off-white)',
                      transition: 'border-color 0.2s ease',
                      padding: 0,
                    }}
                    aria-label={`View ${v.label}`}
                    title={v.label}
                  >
                    <img
                      src={v.image}
                      alt={v.label}
                      style={{
                        width: '100%',
                        aspectRatio: '1',
                        objectFit: 'contain',
                        padding: 8,
                      }}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* ── RIGHT: PRODUCT INFO ──────────────────────────── */}
            <div className="fade-in-up fade-in-up-delay-1">
              <div className="product-badge">Smart Helmet Care Device</div>
              <h1 className="product-title">{PRODUCT.name}</h1>
              <p className="product-desc">{PRODUCT.description}</p>

              {/* ── COLOUR SELECTION ──────────────────────── */}
              <div style={{ marginBottom: 28 }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 12,
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: 600,
                    color: 'var(--text-secondary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}>
                    Colour
                  </span>
                  <span style={{
                    fontSize: '0.9375rem',
                    fontWeight: 700,
                    color: 'var(--navy)',
                  }}>
                    {selectedVariant.label}
                  </span>
                </div>

                {/* Swatch row */}
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                  {PRODUCT.variants.map((v) => (
                    <div key={v.id} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                      <ColorSwatch
                        variant={v}
                        selected={selectedVariant.id === v.id}
                        onClick={() => handleSelectVariant(v)}
                      />
                      <span style={{
                        fontSize: '0.6875rem',
                        fontWeight: 500,
                        color: selectedVariant.id === v.id ? 'var(--green-dark)' : 'var(--text-muted)',
                        transition: 'color 0.2s',
                      }}>
                        {v.label.split(' ')[0]}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Selected variant highlight card */}
                <div style={{
                  marginTop: 16,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 18px',
                  background: 'var(--green-muted)',
                  border: '1px solid rgba(29,185,84,0.2)',
                  borderRadius: 'var(--radius-md)',
                  transition: 'all 0.3s ease',
                }}>
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: selectedVariant.color,
                    border: `2px solid ${selectedVariant.border}`,
                    boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.1)',
                    flexShrink: 0,
                  }} />
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.9375rem', color: 'var(--navy)' }}>
                      {selectedVariant.label} selected
                    </div>
                    <div style={{ fontSize: '0.8125rem', color: 'var(--green-dark)' }}>
                      {selectedVariant.available ? '✓ In stock — Ready to ship' : 'Out of stock'}
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Included */}
              <div className="product-included">
                <h4>What's Included</h4>
                <div className="included-list">
                  {PRODUCT.whatsIncluded.map(item => (
                    <div key={item} className="included-item">
                      <Check size={16} /><span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Delivery & Warranty */}
              <div style={{ display: 'flex', gap: 12, marginBottom: 28, flexWrap: 'wrap' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--green-muted)', padding: '10px 16px', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', flex: 1 }}>
                  <Truck size={16} color="var(--green)" />
                  <span style={{ fontWeight: 500, color: 'var(--green-dark)' }}>{PRODUCT.delivery}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--off-white)', padding: '10px 16px', borderRadius: 'var(--radius-md)', fontSize: '0.875rem', border: '1px solid var(--border)', flex: 1 }}>
                  <Shield size={16} color="var(--navy)" />
                  <span style={{ fontWeight: 500, color: 'var(--navy)' }}>{PRODUCT.warranty}</span>
                </div>
              </div>

              {/* Price notice */}
              <div style={{
                background: 'var(--off-white)',
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px 18px',
                marginBottom: 24,
                fontSize: '0.875rem',
                color: 'var(--text-muted)',
                textAlign: 'center',
              }}>
                <strong style={{ color: 'var(--navy)' }}>Pricing information</strong> will be available at checkout.
              </div>

              {/* CTA Buttons */}
              <div className="product-actions" style={{ marginBottom: 28 }}>
                <button
                  className="btn btn-primary btn-lg"
                  onClick={handleAddToCart}
                  disabled={!selectedVariant.available}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  {added
                    ? <><Check size={18} /> Added!</>
                    : <><Package size={18} /> Add to Cart</>}
                </button>
                <button
                  className="btn btn-outline btn-lg"
                  onClick={handleBuyNow}
                  disabled={!selectedVariant.available}
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Buy Now <ChevronRight size={16} />
                </button>
              </div>

              {/* Specs */}
              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 24 }}>
                <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 16, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Specifications
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                  {specs.map(s => (
                    <div key={s.label} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, padding: '10px 14px', background: 'var(--off-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                      <s.icon size={14} color="var(--green)" style={{ flexShrink: 0, marginTop: 2 }} />
                      <div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{s.label}</div>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--navy)', fontWeight: 600 }}>{s.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works teaser */}
      <section style={{ background: 'var(--off-white)', padding: '48px 0' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--navy)', marginBottom: 4 }}>
              Want to see how it works?
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9375rem' }}>
              See the full care cycle explained, step by step.
            </p>
          </div>
          <Link to="/how-it-works" className="btn btn-outline">
            See How It Works <ChevronRight size={16} />
          </Link>
        </div>
      </section>
    </Page>
  );
};

export default ProductPage;
