import { Link } from 'react-router-dom';
import { ChevronRight, Leaf, Target, Shield } from 'lucide-react';
import { Page, PageHero } from '../components/shared';
import { BRAND } from '../data/config';

const AboutPage = () => (
  <Page>
    <PageHero
      badge="About Us"
      title="About OdorLock"
      subtitle="Designed for riders who care about their gear — and their rides."
    />

    <section className="section">
      <div className="container" style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center', marginBottom: 64 }}>
          <div>
            <h2 className="section-title" style={{ marginBottom: 20 }}>The OdorLock Story</h2>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 16 }}>
              OdorLock was born from a simple observation: riders care deeply about their motorcycles, but helmet care is often overlooked. A helmet that absorbs sweat ride after ride can become uncomfortable, unpleasant to wear, and difficult to maintain manually.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: 16 }}>
              We set out to design a smart, automatic device that makes helmet care effortless. OdorLock is designed to help reduce moisture, unpleasant odor, and support the overall hygiene of your helmet — automatically, after every ride.
            </p>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8 }}>
              Our goal is simple: cleaner helmets and safer, more comfortable rides for every rider in India.
            </p>
          </div>
          <div>
            <img src="/product.jpg" alt="OdorLock Device" style={{ width: '100%', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-lg)', border: '1px solid var(--border)' }} />
          </div>
        </div>

        {/* Values */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h2 className="section-title">Our Values</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginBottom: 64 }}>
          {[
            { icon: Leaf, title: 'Responsible Design', desc: 'We make only claims supported by our product design. No exaggerations. No fake statistics.' },
            { icon: Target, title: 'Rider First', desc: 'Every design decision is made with the rider in mind — practical, convenient, and built for daily use.' },
            { icon: Shield, title: 'Honest Quality', desc: 'We\'re committed to building a product that genuinely works and genuinely helps.' },
          ].map(v => (
            <div key={v.title} className="card">
              <div className="card-icon"><v.icon size={20} /></div>
              <h3 className="heading-md mb-8">{v.title}</h3>
              <p className="body-sm text-muted">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div style={{ background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 32 }}>
          <h3 style={{ fontWeight: 700, color: 'var(--navy)', marginBottom: 12 }}>Important Note</h3>
          <p style={{ color: 'var(--text-muted)', lineHeight: 1.7, fontSize: '0.9375rem' }}>
            OdorLock is designed to help reduce moisture and unpleasant odor, and to support helmet hygiene. It is not a medical device and does not claim to provide clinical sterilization, disease prevention, or guaranteed elimination of bacteria. We are a consumer hardware startup committed to honest, responsible product communication.
          </p>
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Contact Us <ChevronRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  </Page>
);

// ============================================================
// LEGAL PAGES
// ============================================================
const LegalSection = ({ title, children }) => (
  <div style={{ marginBottom: 36 }}>
    <h2 style={{ fontWeight: 700, fontSize: '1.125rem', color: 'var(--navy)', marginBottom: 12, borderLeft: '3px solid var(--green)', paddingLeft: 12 }}>{title}</h2>
    <div style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.9375rem' }}>{children}</div>
  </div>
);

export const PrivacyPage = () => (
  <Page>
    <PageHero badge="Legal" title="Privacy Policy" subtitle="How OdorLock collects, uses, and protects your information." />
    <section className="section">
      <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: 40, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <strong>Note:</strong> This policy is a placeholder for legal review purposes. Before launching commercially, consult a legal professional to ensure compliance with applicable Indian laws including the Information Technology Act and the upcoming Digital Personal Data Protection Act.
        </div>

        <LegalSection title="1. Information We Collect">
          <p>We may collect information you provide directly, such as your name, email address, phone number, shipping address, and order details when you purchase from us or create an account.</p>
          <p style={{ marginTop: 8 }}>We may also collect basic usage information such as pages visited and device type to improve our website and services.</p>
        </LegalSection>

        <LegalSection title="2. How We Use Your Information">
          <p>We use your information to:</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>Process and fulfill your orders</li>
            <li>Send you order updates and support communications</li>
            <li>Improve our products and services</li>
            <li>Respond to your inquiries and support requests</li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Data Storage and Security">
          <p>Your personal information is stored securely. We do not store real payment card numbers. Payment processing is handled by trusted payment gateway providers.</p>
        </LegalSection>

        <LegalSection title="4. Sharing Your Information">
          <p>We do not sell, rent, or trade your personal information to third parties. We may share information with trusted service providers necessary to fulfil your order (e.g. shipping partners), subject to confidentiality obligations.</p>
        </LegalSection>

        <LegalSection title="5. Your Rights">
          <p>You may request access to, correction of, or deletion of your personal information by contacting us at {BRAND.email}.</p>
        </LegalSection>

        <LegalSection title="6. Cookies">
          <p>Our website may use cookies to improve your browsing experience. You can disable cookies in your browser settings, though some functionality may be affected.</p>
        </LegalSection>

        <LegalSection title="7. Changes to This Policy">
          <p>We may update this policy from time to time. The date of the latest revision will be indicated at the top of the page.</p>
        </LegalSection>

        <LegalSection title="8. Contact">
          <p>For privacy-related queries, contact us at: <a href={`mailto:${BRAND.email}`} style={{ color: 'var(--green)' }}>{BRAND.email}</a></p>
        </LegalSection>
      </div>
    </section>
  </Page>
);

export const TermsPage = () => (
  <Page>
    <PageHero badge="Legal" title="Terms & Conditions" subtitle="Please read these terms carefully before using OdorLock or our website." />
    <section className="section">
      <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: 40, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <strong>Note:</strong> These terms are placeholder content for legal review purposes. Consult a legal professional before commercial launch.
        </div>

        <LegalSection title="1. Acceptance of Terms">
          <p>By accessing or using the OdorLock website and purchasing our products, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our website or services.</p>
        </LegalSection>

        <LegalSection title="2. Products and Descriptions">
          <p>We make every effort to describe our products accurately. Product specifications listed as "coming soon" are subject to change. We reserve the right to update product information without prior notice.</p>
        </LegalSection>

        <LegalSection title="3. Orders and Purchases">
          <p>All orders are subject to acceptance and availability. We reserve the right to cancel or refuse any order. Order confirmation does not constitute acceptance until dispatched.</p>
        </LegalSection>

        <LegalSection title="4. Intellectual Property">
          <p>All content on this website, including the OdorLock name, logo, images, and copy, is the intellectual property of OdorLock Technologies Pvt. Ltd. and may not be reproduced without written permission.</p>
        </LegalSection>

        <LegalSection title="5. Limitation of Liability">
          <p>OdorLock is designed to support helmet hygiene. We make no medical claims. Our liability for any product defect is limited to the purchase price of the product or replacement at our discretion.</p>
        </LegalSection>

        <LegalSection title="6. Governing Law">
          <p>These terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of courts in Bengaluru, Karnataka.</p>
        </LegalSection>

        <LegalSection title="7. Changes to Terms">
          <p>We may modify these terms at any time. Continued use of our website constitutes acceptance of the updated terms.</p>
        </LegalSection>

        <LegalSection title="8. Contact">
          <p>For terms-related queries: <a href={`mailto:${BRAND.email}`} style={{ color: 'var(--green)' }}>{BRAND.email}</a></p>
        </LegalSection>
      </div>
    </section>
  </Page>
);

export const RefundPage = () => (
  <Page>
    <PageHero badge="Legal" title="Refund Policy" subtitle="Our return and refund policy for OdorLock products." />
    <section className="section">
      <div className="container" style={{ maxWidth: 760, margin: '0 auto' }}>
        <div style={{ background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: '16px 20px', marginBottom: 40, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
          <strong>Note:</strong> This is a placeholder refund policy for legal review purposes. Finalise with a legal professional before commercial launch.
        </div>

        <LegalSection title="1. Return Window">
          <p>We accept returns within 7 days of delivery, provided the product is unused, undamaged, and in its original packaging.</p>
        </LegalSection>

        <LegalSection title="2. Eligibility">
          <p>To be eligible for a return:</p>
          <ul style={{ paddingLeft: 20, marginTop: 8 }}>
            <li>The product must be in its original, unused condition</li>
            <li>Original packaging, warranty card, and accessories must be included</li>
            <li>Proof of purchase is required</li>
          </ul>
        </LegalSection>

        <LegalSection title="3. Non-Returnable Items">
          <p>Products showing signs of use, damage, or missing original components are not eligible for return.</p>
        </LegalSection>

        <LegalSection title="4. Refund Process">
          <p>Once your return is received and inspected, we will notify you by email. Approved refunds will be processed within 7–10 business days to the original payment method.</p>
        </LegalSection>

        <LegalSection title="5. Defective or Damaged Products">
          <p>If you receive a defective or damaged product, please contact us at {BRAND.email} within 48 hours of delivery with photographs. We will arrange a replacement or full refund at our discretion.</p>
        </LegalSection>

        <LegalSection title="6. Warranty">
          <p>OdorLock comes with a 1-year limited warranty covering manufacturing defects. Warranty does not cover damage caused by misuse, accident, or unauthorized modifications.</p>
        </LegalSection>

        <LegalSection title="7. Contact">
          <p>For refund requests and support: <a href={`mailto:${BRAND.email}`} style={{ color: 'var(--green)' }}>{BRAND.email}</a> or <a href={`tel:${BRAND.phone.replace(/\s/g,'')}`} style={{ color: 'var(--green)' }}>{BRAND.phone}</a></p>
        </LegalSection>
      </div>
    </section>
  </Page>
);

export default AboutPage;
