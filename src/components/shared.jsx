import { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search, User, ShoppingCart, Menu, X, Leaf,
  Truck, Shield, Lock, Wind, Droplets, Sparkles,
  Timer, ChevronRight, Star, Plus, Minus, Trash2,
  CheckCircle, AlertCircle, Info, AlertTriangle,
  Package, RefreshCw, ZapOff, HardHat, Zap, VolumeX
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { NAV_LINKS, FOOTER_LINKS, BRAND, SEARCHABLE_CONTENT, FAQS, FEATURES } from '../data/config';

// ============================================================
// ICON MAP
// ============================================================
export const ICONS = {
  droplets: Droplets,
  wind: Wind,
  sparkles: Sparkles,
  timer: Timer,
  package: Package,
  'refresh-cw': RefreshCw,
  'volume-x': VolumeX,
  'hard-hat': HardHat,
  zap: Zap,
  'zap-off': ZapOff,
  star: Star,
  check: CheckCircle,
  truck: Truck,
  shield: Shield,
  lock: Lock,
  leaf: Leaf,
};

// ============================================================
// LOGO
// ============================================================
export const OdorLockLogo = ({ size = 'md', variant = 'default', className = '', style = {}, imgStyle = {} }) => {
  const heights = { sm: 30, md: 38, lg: 50 };
  const h = heights[size] || heights.md;
  const src = variant === 'white' ? '/logo-white.png' : '/logo.png';
  return (
    <Link to="/" className={`navbar-logo ${className}`} style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', ...style }}>
      <img
        src={src}
        alt="OdorLock — Clean Helmets. Safer Rides."
        style={{
          height: h,
          width: 'auto',
          maxWidth: '100%',
          objectFit: 'contain',
          display: 'block',
          ...imgStyle,
        }}
      />
    </Link>
  );
};

// ============================================================
// TOAST SYSTEM
// ============================================================
let toastFn = null;
export const useToast = () => toastFn;

export const ToastContainer = () => {
  const [toasts, setToasts] = useState([]);

  toastFn = (msg, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, msg, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  };

  const icons = { success: <CheckCircle size={16} />, error: <AlertCircle size={16} />, info: <Info size={16} /> };

  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast ${t.type}`}>
          {icons[t.type]}
          <span className="toast-msg">{t.msg}</span>
          <button onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', marginLeft: 4 }}>
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
};

// ============================================================
// SEARCH OVERLAY
// ============================================================
export const SearchOverlay = ({ open, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) { setQuery(''); setResults([]); setTimeout(() => inputRef.current?.focus(), 100); }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const q = query.toLowerCase();
    const found = [];
    SEARCHABLE_CONTENT.forEach(item => {
      if (item.title.toLowerCase().includes(q) || item.keywords.some(k => k.includes(q))) found.push({ ...item, type: 'page' });
    });
    FAQS.forEach(faq => {
      if (faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q))
        found.push({ title: faq.question, path: '/faq', type: 'faq' });
    });
    FEATURES.forEach(f => {
      if (f.title.toLowerCase().includes(q) || f.shortDesc.toLowerCase().includes(q))
        found.push({ title: f.title, path: '/features', type: 'feature' });
    });
    setResults(found.slice(0, 8));
  }, [query]);

  const handleSelect = (path) => { navigate(path); onClose(); };

  const typeLabel = { page: 'Page', faq: 'FAQ', feature: 'Feature' };

  return (
    <>
      <div className={`search-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 2001, pointerEvents: open ? 'all' : 'none', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '80px 24px 24px' }}>
        <div className={`search-box`} style={{ opacity: open ? 1 : 0, transform: open ? 'translateY(0)' : 'translateY(-20px)', transition: 'all 0.3s ease', pointerEvents: open ? 'all' : 'none' }} onClick={e => e.stopPropagation()}>
          <div className="search-input-wrap">
            <Search size={18} color="var(--text-muted)" />
            <input ref={inputRef} value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Search OdorLock..." autoComplete="off" />
            <button className="icon-btn" onClick={onClose}><X size={18} /></button>
          </div>
          <div className="search-results">
            {results.length > 0 ? results.map((r, i) => (
              <div key={i} className="search-result-item" onClick={() => handleSelect(r.path)}>
                <ChevronRight size={14} color="var(--text-muted)" />
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.9375rem', color: 'var(--navy)' }}>{r.title}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{typeLabel[r.type]} · {r.path}</div>
                </div>
              </div>
            )) : query ? (
              <div className="search-no-results">
                <Search size={32} color="var(--text-light)" style={{ margin: '0 auto 12px' }} />
                <div style={{ fontWeight: 500 }}>No results for "{query}"</div>
                <div style={{ fontSize: '0.875rem', marginTop: 4 }}>Try searching for features, FAQs, or pages</div>
              </div>
            ) : (
              <div className="search-no-results" style={{ padding: '20px' }}>
                <div style={{ fontSize: '0.875rem' }}>Search for features, FAQs, pages and more</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

// ============================================================
// CART DRAWER
// ============================================================
export const CartDrawer = ({ open, onClose }) => {
  const { items, removeFromCart, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => { onClose(); navigate('/checkout'); };

  return (
    <>
      <div className={`cart-overlay ${open ? 'open' : ''}`} onClick={onClose} />
      <div className={`cart-drawer ${open ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Cart ({items.reduce((s, i) => s + i.quantity, 0)} items)</h2>
          <button className="icon-btn" onClick={onClose}><X size={20} /></button>
        </div>
        <div className="cart-body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <ShoppingCart size={48} />
              <div>
                <div style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--navy)', marginBottom: 4 }}>Your cart is empty</div>
                <div style={{ fontSize: '0.875rem' }}>Add OdorLock to get started</div>
              </div>
              <button className="btn btn-primary btn-sm" onClick={() => { onClose(); navigate('/product'); }}>
                View Product
              </button>
            </div>
          ) : (
            <>
              {items.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <div className="cart-item-name">{item.name}</div>
                    <div className="cart-item-note">Price calculated at checkout</div>
                    <div className="cart-item-qty">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span className="qty-val">{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>Remove</button>
                  </div>
                </div>
              ))}
              <button className="btn btn-ghost btn-sm" onClick={clearCart} style={{ color: '#EF4444', marginTop: 8 }}>
                <Trash2 size={14} /> Clear Cart
              </button>
            </>
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-footer">
            <div className="cart-notice">Order total will be calculated at checkout.</div>
            <button className="btn btn-primary w-full" style={{ justifyContent: 'center' }} onClick={handleCheckout}>
              Proceed to Checkout <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// ============================================================
// MOBILE MENU
// ============================================================
const MobileMenu = ({ open, onClose }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLink = (href) => { navigate(href); onClose(); };
  const handleLogout = () => { logout(); onClose(); };

  return (
    <div className={`mobile-menu ${open ? 'open' : ''}`}>
      <div className="mobile-menu-header">
        <OdorLockLogo />
        <button className="icon-btn" onClick={onClose}><X size={22} /></button>
      </div>
      <div className="mobile-nav-links">
        {NAV_LINKS.map(l => (
          <button key={l.href} className="mobile-nav-link" onClick={() => handleLink(l.href)}>{l.label}</button>
        ))}
        <div className="divider" />
        {isAuthenticated ? (
          <>
            <button className="mobile-nav-link" onClick={() => handleLink('/account')}>
              <User size={16} style={{ marginRight: 8 }} /> {user?.name || 'Account'}
            </button>
            <button className="mobile-nav-link" onClick={handleLogout} style={{ color: '#EF4444' }}>Logout</button>
          </>
        ) : (
          <>
            <button className="mobile-nav-link" onClick={() => handleLink('/login')}>Login</button>
            <button className="mobile-nav-link" onClick={() => handleLink('/signup')}>Sign Up</button>
          </>
        )}
      </div>
      <div className="mobile-menu-footer">
        <button className="btn btn-primary w-full" style={{ justifyContent: 'center' }}
          onClick={() => handleLink('/product')}>
          Get OdorLock <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

// ============================================================
// NAVBAR
// ============================================================
export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  const isActive = (href) => {
    if (href === '/') return location.pathname === '/';
    return location.pathname.startsWith(href);
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="navbar-inner">
            <OdorLockLogo />
            <div className="navbar-nav">
              {NAV_LINKS.map(l => (
                <Link key={l.href} to={l.href} className={`nav-link ${isActive(l.href) ? 'active' : ''}`}>
                  {l.label}
                </Link>
              ))}
            </div>
            <div className="navbar-actions">
              <button className="icon-btn" onClick={() => setSearchOpen(true)} aria-label="Search"><Search size={18} /></button>
              <button className="icon-btn" onClick={() => navigate(isAuthenticated ? '/account' : '/login')} aria-label="Account">
                <User size={18} />
              </button>
              <button className="icon-btn" onClick={() => setCartOpen(true)} aria-label="Cart" style={{ position: 'relative' }}>
                <ShoppingCart size={18} />
                {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
              </button>
              <button className="hamburger" onClick={() => setMenuOpen(true)} aria-label="Menu">
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </nav>
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} />
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
};

// ============================================================
// FOOTER
// ============================================================
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <OdorLockLogo size="md" variant="white" className="logo" style={{ marginBottom: 20 }} />
            <div className="footer-social">
              {[
                { href: BRAND.social.instagram, label: 'Ig', icon: '◯' },
                { href: BRAND.social.youtube, label: 'Yt', icon: '▶' },
                { href: BRAND.social.facebook, label: 'Fb', icon: 'f' },
                { href: BRAND.social.linkedin, label: 'Li', icon: 'in' },
                { href: BRAND.social.twitter, label: 'X', icon: 'X' },
              ].map(s => (
                <a key={s.label} href={s.href} className="social-icon" target="_blank" rel="noopener noreferrer"
                  aria-label={s.label} title={s.label}>
                  <span style={{ fontWeight: 700, fontSize: '0.75rem' }}>{s.icon}</span>
                </a>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-heading">Navigate</div>
            <div className="footer-links">
              {FOOTER_LINKS.main.map(l => (
                <Link key={l.href} to={l.href} className="footer-link">{l.label}</Link>
              ))}
            </div>
          </div>
          <div>
            <div className="footer-heading">Legal</div>
            <div className="footer-links">
              {FOOTER_LINKS.legal.map(l => (
                <Link key={l.href} to={l.href} className="footer-link">{l.label}</Link>
              ))}
            </div>
            <div className="footer-heading" style={{ marginTop: 24 }}>Contact</div>
            <div className="footer-links">
              <a href={`mailto:${BRAND.email}`} className="footer-link">{BRAND.email}</a>
              <a href={`tel:${BRAND.phone.replace(/\s/g, '')}`} className="footer-link">{BRAND.phone}</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {currentYear} OdorLock. All rights reserved.</p>
          <div className="footer-legal">
            {FOOTER_LINKS.legal.map(l => (
              <Link key={l.href} to={l.href}>{l.label}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// ============================================================
// PAGE WRAPPER
// ============================================================
export const Page = ({ children, className = '' }) => (
  <div className={`page ${className}`}>{children}</div>
);

// ============================================================
// PAGE HERO HEADER
// ============================================================
export const PageHero = ({ badge, title, subtitle }) => (
  <div className="page-hero">
    <div className="container">
      {badge && <div className="badge badge-green mb-16">{badge}</div>}
      <h1 className="section-title" style={{ margin: '0 auto 12px', textAlign: 'center' }}>{title}</h1>
      {subtitle && <p className="section-subtitle" style={{ margin: '0 auto', textAlign: 'center' }}>{subtitle}</p>}
    </div>
  </div>
);

// ============================================================
// STARS
// ============================================================
export const Stars = ({ rating = 5 }) => (
  <div className="stars">
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={14} fill={i <= rating ? '#F59E0B' : 'none'} color={i <= rating ? '#F59E0B' : '#CBD5E1'} />
    ))}
  </div>
);

// ============================================================
// SCROLL REVEAL HOOK
// ============================================================
export const useScrollReveal = (threshold = 0.15) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);

  return [ref, visible];
};

// ============================================================
// FORM FIELD
// ============================================================
export const FormField = ({ label, required, error, hint, children }) => (
  <div className="form-group">
    {label && (
      <label className="form-label">
        {label}{required && <span className="required"> *</span>}
      </label>
    )}
    {children}
    {error && <div className="form-error"><AlertCircle size={12} />{error}</div>}
    {hint && !error && <div className="form-hint">{hint}</div>}
  </div>
);

// ============================================================
// PROTECTED ROUTE
// ============================================================
export const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !isAuthenticated) navigate('/login', { state: { from: location.pathname } });
  }, [isAuthenticated, loading, navigate, location]);

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div className="spinner spinner-green" />
    </div>
  );

  return isAuthenticated ? children : null;
};
