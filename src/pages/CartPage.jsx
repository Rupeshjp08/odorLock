import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ShoppingCart, Trash2 } from 'lucide-react';
import { Page, PageHero } from '../components/shared';
import { useCart } from '../context/CartContext';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, clearCart, totalItems } = useCart();
  const navigate = useNavigate();

  return (
    <Page>
      <PageHero
        badge="Shopping Cart"
        title="Your Cart"
        subtitle={totalItems > 0
          ? `${totalItems} item${totalItems > 1 ? 's' : ''} in your cart.`
          : 'Your cart is empty.'}
      />

      <section className="section" style={{ paddingTop: 40 }}>
        <div className="container">
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '64px 0' }}>
              <ShoppingCart size={56} style={{ color: 'var(--text-light)', margin: '0 auto 20px' }} />
              <h3 style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: 8 }}>Your cart is empty</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Choose a colour and add OdorLock to continue.</p>
              <Link to="/product" className="btn btn-primary">View Product <ChevronRight size={16} /></Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 40, alignItems: 'start' }}>
              {/* Cart Items */}
              <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 32 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h2 style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--navy)' }}>
                    Cart Items
                  </h2>
                  <button
                    onClick={clearCart}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#EF4444', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                  >
                    <Trash2 size={14} /> Clear cart
                  </button>
                </div>

                {items.map(item => (
                  <div key={item.cartKey} style={{ display: 'flex', gap: 20, paddingBottom: 24, marginBottom: 24, borderBottom: '1px solid var(--border)' }}>
                    {/* Image */}
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img
                        src={item.image}
                        alt={item.variantName}
                        style={{ width: 110, height: 110, objectFit: 'contain', borderRadius: 'var(--radius-md)', border: '2px solid var(--border)', background: 'var(--off-white)', padding: 4 }}
                      />
                      {/* Colour dot */}
                      <div style={{
                        position: 'absolute', bottom: 6, right: 6,
                        width: 18, height: 18, borderRadius: '50%',
                        background: item.color,
                        border: `2px solid ${item.colorBorder}`,
                        boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
                      }} title={item.variantLabel} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 4, color: 'var(--navy)' }}>{item.name}</h3>

                      {/* Variant pill */}
                      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-full)', padding: '3px 10px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: 10 }}>
                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, border: `1.5px solid ${item.colorBorder}` }} />
                        {item.variantLabel}
                      </div>

                      <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: 12 }}>
                        Price calculated at checkout
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <button className="qty-btn" onClick={() => updateQuantity(item.cartKey, item.quantity - 1)}>−</button>
                        <span style={{ fontWeight: 700, fontSize: '1rem', minWidth: 24, textAlign: 'center' }}>{item.quantity}</span>
                        <button className="qty-btn" onClick={() => updateQuantity(item.cartKey, item.quantity + 1)}>+</button>
                        <button
                          onClick={() => removeFromCart(item.cartKey)}
                          style={{ marginLeft: 16, color: 'var(--text-muted)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8125rem' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <Link to="/product" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--green)', fontSize: '0.875rem', fontWeight: 600, marginTop: 8 }}>
                  + Add another colour variant
                </Link>
              </div>

              {/* Sticky Order Summary */}
              <div style={{ position: 'sticky', top: 84 }}>
                <div style={{ background: 'white', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: 28, boxShadow: 'var(--shadow-md)' }}>
                  <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 20, color: 'var(--navy)' }}>Order Summary</h3>

                  {items.map(item => (
                    <div key={item.cartKey} style={{ display: 'flex', gap: 12, marginBottom: 16, alignItems: 'center' }}>
                      <img src={item.image} alt="" style={{ width: 52, height: 52, borderRadius: 8, objectFit: 'contain', border: '1px solid var(--border)', background: 'var(--off-white)', padding: 4 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.8125rem', color: 'var(--navy)' }}>{item.name}</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 2 }}>
                          <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, border: `1.5px solid ${item.colorBorder}` }} />
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{item.variantLabel}</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                      </div>
                    </div>
                  ))}

                  <div style={{ borderTop: '1px solid var(--border)', paddingTop: 16, marginTop: 4 }} />

                  <div style={{ background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '12px 16px', marginBottom: 16, fontSize: '0.8125rem', color: 'var(--text-muted)', textAlign: 'center', lineHeight: 1.5 }}>
                    Order total will be calculated securely at checkout.
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                    <span>Delivery</span>
                    <span style={{ color: 'var(--green)', fontWeight: 600 }}>Free</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                    <span>Warranty</span>
                    <span>1 Year</span>
                  </div>

                  <button
                    className="btn btn-primary w-full"
                    style={{ justifyContent: 'center' }}
                    onClick={() => navigate('/checkout')}
                  >
                    Proceed to Checkout <ChevronRight size={16} />
                  </button>
                  <Link to="/product" style={{ display: 'block', textAlign: 'center', marginTop: 12, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                    ← Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </Page>
  );
};

export default CartPage;
