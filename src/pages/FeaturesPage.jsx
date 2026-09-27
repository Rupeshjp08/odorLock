import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Droplets, 
  Wind, 
  Sparkles, 
  Timer, 
  Package, 
  RefreshCw, 
  VolumeX, 
  HardHat, 
  Zap, 
  ChevronRight, 
  Check,
  Cpu,
  Layers,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Page, PageHero, useScrollReveal } from '../components/shared';
import { FEATURES } from '../data/config';

const ICON_MAP = { 
  droplets: Droplets, 
  wind: Wind, 
  sparkles: Sparkles, 
  timer: Timer, 
  package: Package, 
  'refresh-cw': RefreshCw, 
  'volume-x': VolumeX, 
  'hard-hat': HardHat, 
  zap: Zap 
};

const FeaturesPage = () => {
  const [activeFeature, setActiveFeature] = useState(FEATURES[0]);
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [ref, visible] = useScrollReveal();

  return (
    <Page>
      <PageHero
        badge="Precision Engineering"
        title="OdorLock Architecture & Features"
        subtitle="Designed from the inside out. Explore every sensor, air channel, and hardware innovation engineered for rider health."
      />

      {/* Feature Grid */}
      <section className="section" style={{ paddingTop: 40, paddingBottom: 60 }}>
        <div className="container">
          {/* Grid of 9 Cards with Integrated Hardware Image and Benefit Bars */}
          <div 
            ref={ref}
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
              gap: 28 
            }} 
          >
            {FEATURES.map((f, i) => {
              const Icon = ICON_MAP[f.icon] || Sparkles;
              const isActive = activeFeature.id === f.id;
              const isHovered = hoveredFeature === f.id;

              return (
                <div 
                  key={f.id}
                  className="feature-card"
                  onMouseEnter={() => setHoveredFeature(f.id)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  onClick={() => setActiveFeature(f)}
                  tabIndex={0}
                  onKeyDown={e => e.key === 'Enter' && setActiveFeature(f)}
                  role="button"
                  aria-pressed={isActive}
                  style={{
                    cursor: 'pointer',
                    background: isActive ? '#FFFFFF' : '#FFFFFF',
                    border: isActive 
                      ? '2px solid var(--green)' 
                      : isHovered ? '2px solid rgba(29, 185, 84, 0.4)' : '1px solid var(--border)',
                    borderRadius: 'var(--radius-xl)',
                    padding: 20,
                    boxShadow: isActive 
                      ? '0 16px 36px -8px rgba(29, 185, 84, 0.22), 0 4px 12px rgba(0,0,0,0.04)' 
                      : isHovered 
                      ? '0 12px 30px -6px rgba(15, 23, 42, 0.1)' 
                      : 'var(--shadow-sm)',
                    opacity: visible ? 1 : 0,
                    transform: visible ? 'none' : 'translateY(24px)',
                    transition: `all 0.4s cubic-bezier(0.16, 1, 0.3, 1) ${i * 0.04}s`,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Active Indicator Top Glow Bar */}
                  {isActive && (
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: 4,
                      background: 'var(--green)',
                      boxShadow: '0 0 12px rgba(29, 185, 84, 0.8)',
                    }} />
                  )}

                  {/* ── CARD IMAGE BANNER ──────────────────────────── */}
                  <div style={{
                    position: 'relative',
                    width: '100%',
                    height: 200,
                    borderRadius: 'var(--radius-lg)',
                    overflow: 'hidden',
                    background: 'radial-gradient(circle at 50% 50%, rgba(29, 185, 84, 0.08) 0%, #f8fafc 85%)',
                    border: '1px solid rgba(0,0,0,0.06)',
                    marginBottom: 16,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    {/* Atmospheric Glow behind Image */}
                    <div style={{
                      position: 'absolute',
                      inset: '20%',
                      borderRadius: '50%',
                      background: 'radial-gradient(circle, rgba(29, 185, 84, 0.16) 0%, transparent 70%)',
                      filter: 'blur(16px)',
                      pointerEvents: 'none',
                    }} />

                    {/* Hardware Image */}
                    <img 
                      src={f.image} 
                      alt={f.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                        padding: 12,
                        transform: isHovered || isActive ? 'scale(1.05)' : 'scale(1)',
                        transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                      }}
                      loading="lazy"
                    />

                    {/* Top Left: Category Badge */}
                    <div style={{
                      position: 'absolute',
                      top: 10,
                      left: 10,
                      background: 'rgba(255, 255, 255, 0.94)',
                      backdropFilter: 'blur(8px)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      border: '1px solid rgba(0,0,0,0.06)',
                      boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                      fontSize: '0.6875rem',
                      fontWeight: 700,
                      color: 'var(--navy)',
                      letterSpacing: '0.02em',
                    }}>
                      {f.category}
                    </div>

                    {/* Top Right: Metric Spec Pill */}
                    <div style={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      background: 'rgba(29, 185, 84, 0.12)',
                      border: '1px solid rgba(29, 185, 84, 0.3)',
                      backdropFilter: 'blur(8px)',
                      padding: '3px 10px',
                      borderRadius: 'var(--radius-full)',
                      fontSize: '0.6875rem',
                      fontWeight: 800,
                      color: 'var(--green-dark)',
                    }}>
                      {f.metric}
                    </div>
                  </div>

                  {/* ── CARD HEADER: ICON & TITLE ─────────────────── */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
                    <div 
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: 10,
                        background: isActive ? 'var(--green)' : 'var(--green-muted)',
                        color: isActive ? 'white' : 'var(--green-dark)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Icon size={19} />
                    </div>
                    <div>
                      <h3 style={{ 
                        fontSize: '1.0625rem', 
                        fontWeight: 800, 
                        color: 'var(--navy)', 
                        margin: 0,
                        lineHeight: 1.3 
                      }}>
                        {f.title}
                      </h3>
                    </div>
                  </div>

                  {/* Short Description */}
                  <p style={{ 
                    fontSize: '0.8125rem', 
                    color: 'var(--text-muted)', 
                    lineHeight: 1.55, 
                    margin: '0 0 14px 0',
                    flex: 1 
                  }}>
                    {f.shortDesc}
                  </p>

                  {/* ── THE BENEFITS BAR (INSPECTED & STANDARDIZED) ── */}
                  <div style={{ 
                    display: 'flex', 
                    flexWrap: 'wrap', 
                    gap: 6, 
                    paddingTop: 12,
                    borderTop: '1px solid var(--border)',
                    marginBottom: 12,
                  }}>
                    {f.benefits.map((b) => (
                      <span 
                        key={b} 
                        style={{ 
                          background: isActive 
                            ? 'var(--green)' 
                            : isHovered ? 'rgba(29, 185, 84, 0.15)' : 'var(--off-white)',
                          color: isActive 
                            ? 'white' 
                            : isHovered ? 'var(--green-dark)' : 'var(--text-secondary)',
                          fontSize: '0.6875rem', 
                          fontWeight: 600, 
                          padding: '3px 9px', 
                          borderRadius: 'var(--radius-full)',
                          border: isActive 
                            ? '1px solid var(--green)' 
                            : '1px solid var(--border)',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {b}
                      </span>
                    ))}
                  </div>

                  {/* Bottom Technical Spec Snippet Bar */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    fontSize: '0.6875rem',
                    color: 'var(--text-muted)',
                    background: 'var(--off-white)',
                    padding: '6px 10px',
                    borderRadius: 6,
                    border: '1px solid rgba(0,0,0,0.04)',
                  }}>
                    <span style={{ fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {f.spec.split('•')[0]}
                    </span>
                    <span style={{ 
                      color: isActive ? 'var(--green)' : 'var(--text-muted)', 
                      fontWeight: 700, 
                      display: 'flex', 
                      alignItems: 'center',
                      gap: 2,
                      flexShrink: 0
                    }}>
                      Details <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── FEATURE DEEP-DIVE SPOTLIGHT SECTION ───────────────────── */}
      {activeFeature && (
        <section className="section" style={{ background: 'var(--off-white)', paddingTop: 10, paddingBottom: 64 }}>
          <div className="container">
            <div style={{ 
              background: 'white', 
              border: '1px solid var(--border)', 
              borderRadius: 'var(--radius-xl)', 
              padding: '42px 48px', 
              maxWidth: 960, 
              margin: '0 auto', 
              boxShadow: 'var(--shadow-md)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              {/* Top Accent Strip */}
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: 4,
                background: 'linear-gradient(90deg, var(--green) 0%, #10B981 100%)',
              }} />

              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 44, alignItems: 'center' }}>
                {/* Left Detail Content */}
                <div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
                    <span className="badge badge-green">{activeFeature.category}</span>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--green-dark)' }}>
                      • {activeFeature.metric}
                    </span>
                  </div>

                  <h2 className="section-title" style={{ fontSize: '1.875rem', marginBottom: 14 }}>
                    {activeFeature.title}
                  </h2>

                  <p className="body-md text-muted" style={{ marginBottom: 24, lineHeight: 1.6 }}>
                    {activeFeature.description}
                  </p>

                  {/* Benefits List */}
                  <div style={{ marginBottom: 24 }}>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      fontWeight: 800, 
                      color: 'var(--navy)', 
                      marginBottom: 12, 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.06em' 
                    }}>
                      Core Capabilities
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {activeFeature.benefits.map(b => (
                        <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.9375rem', color: 'var(--text-secondary)' }}>
                          <div style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            background: 'var(--green-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                          }}>
                            <Check size={12} color="var(--green-dark)" strokeWidth={3} />
                          </div>
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Engineering Specification Box */}
                  <div style={{ 
                    background: 'var(--off-white)', 
                    border: '1px solid var(--border)', 
                    borderRadius: 'var(--radius-md)', 
                    padding: '14px 18px', 
                    fontSize: '0.8125rem', 
                    color: 'var(--navy)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4
                  }}>
                    <strong style={{ color: 'var(--green-dark)', fontSize: '0.75rem', letterSpacing: '0.04em' }}>
                      ENGINEERING SPECIFICATION:
                    </strong>
                    <span style={{ fontFamily: 'monospace', fontSize: '0.8125rem', color: 'var(--navy)' }}>
                      {activeFeature.spec}
                    </span>
                  </div>
                </div>

                {/* Right Interactive Image Preview */}
                <div style={{ textAlign: 'center' }}>
                  <div style={{
                    position: 'relative',
                    borderRadius: 'var(--radius-xl)',
                    overflow: 'hidden',
                    background: 'radial-gradient(circle at 50% 50%, rgba(29, 185, 84, 0.12) 0%, #F8FAFC 85%)',
                    border: '1px solid var(--border)',
                    boxShadow: 'var(--shadow-lg)',
                    padding: 24,
                  }}>
                    <img 
                      src={activeFeature.image} 
                      alt={activeFeature.title} 
                      style={{ 
                        width: '100%', 
                        maxHeight: 280, 
                        objectFit: 'contain',
                        borderRadius: 'var(--radius-md)',
                      }} 
                    />

                    <div style={{
                      marginTop: 14,
                      display: 'flex',
                      justifyContent: 'center',
                      gap: 8,
                    }}>
                      <Link 
                        to="/#3d-model" 
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          background: 'var(--navy)',
                          color: 'white',
                          padding: '8px 16px',
                          borderRadius: 'var(--radius-full)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textDecoration: 'none',
                          boxShadow: 'var(--shadow-sm)',
                        }}
                      >
                        <Layers size={14} /> View in 3D Model
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section" style={{ padding: '64px 0' }}>
        <div className="container text-center">
          <h2 className="section-title">Ready to experience it?</h2>
          <p className="section-subtitle" style={{ margin: '12px auto 32px' }}>
            All 9 integrated engineering systems. One seamless helmet care experience.
          </p>
          <Link to="/product" className="btn btn-primary btn-lg">
            Get OdorLock <ChevronRight size={18} />
          </Link>
        </div>
      </section>
    </Page>
  );
};

export default FeaturesPage;
