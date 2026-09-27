import { BrowserRouter, Routes, Route, ScrollRestoration, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { Navbar, Footer, ToastContainer } from './components/shared';

// Pages
import HomePage from './pages/HomePage';
import HowItWorksPage from './pages/HowItWorksPage';
import FeaturesPage from './pages/FeaturesPage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import { LoginPage, SignupPage } from './pages/AuthPages';
import AccountPage from './pages/AccountPage';
import ReviewsPage from './pages/ReviewsPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import TrackOrderPage from './pages/TrackOrderPage';
import AboutPage, { PrivacyPage, TermsPage, RefundPage } from './pages/LegalPages';

// ============================================================
// SCROLL TO TOP ON ROUTE CHANGE
// ============================================================
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// ============================================================
// NOT FOUND
// ============================================================
const NotFound = () => (
  <div style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, textAlign: 'center', padding: '0 24px' }}>
    <div style={{ fontSize: '6rem', fontWeight: 900, color: 'var(--border)', lineHeight: 1 }}>404</div>
    <h1 style={{ fontWeight: 700, fontSize: '1.5rem', color: 'var(--navy)' }}>Page not found</h1>
    <p style={{ color: 'var(--text-muted)' }}>The page you're looking for doesn't exist.</p>
    <a href="/" className="btn btn-primary">Back to Home</a>
  </div>
);

// ============================================================
// APP LAYOUT
// ============================================================
const AppLayout = () => (
  <>
    <ScrollToTop />
    <Navbar />
    <main>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/buy" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/account/orders" element={<AccountPage />} />
        <Route path="/reviews" element={<ReviewsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/track-order" element={<TrackOrderPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/refund" element={<RefundPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
    <Footer />
    <ToastContainer />
  </>
);

// ============================================================
// ROOT APP
// ============================================================
const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <CartProvider>
        <AppLayout />
      </CartProvider>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
