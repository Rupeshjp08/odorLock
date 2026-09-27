import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Page, PageHero } from '../components/shared';
import { FAQS } from '../data/config';

const FAQPage = () => {
  const [openId, setOpenId] = useState(null);
  const [search, setSearch] = useState('');

  const filtered = FAQS.filter(f =>
    !search || f.question.toLowerCase().includes(search.toLowerCase()) || f.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Page>
      <PageHero
        badge="Support"
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about OdorLock."
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 860, margin: '0 auto' }}>
          {/* Search */}
          <div style={{ position: 'relative', marginBottom: 40 }}>
            <input
              className="form-input"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search FAQs…"
              style={{ paddingLeft: 16, fontSize: '1rem' }}
            />
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1.125rem', fontWeight: 500 }}>No results for "{search}"</p>
              <p style={{ marginTop: 8 }}>Try a different search term or <button style={{ color: 'var(--green)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }} onClick={() => setSearch('')}>clear the search</button></p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {filtered.map(faq => (
                <div key={faq.id} className={`faq-item ${openId === faq.id ? 'open' : ''}`}>
                  <button
                    className="faq-question"
                    onClick={() => setOpenId(openId === faq.id ? null : faq.id)}
                    aria-expanded={openId === faq.id}
                    aria-controls={`faq-answer-${faq.id}`}
                  >
                    <span>{faq.question}</span>
                    <span className="faq-icon"><Plus size={12} /></span>
                  </button>
                  <div className="faq-answer" id={`faq-answer-${faq.id}`} role="region">
                    <div className="faq-answer-inner">{faq.answer}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Contact CTA */}
          <div style={{ marginTop: 56, background: 'var(--off-white)', border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)', padding: '40px', textAlign: 'center' }}>
            <h3 style={{ fontWeight: 700, fontSize: '1.25rem', color: 'var(--navy)', marginBottom: 8 }}>Still have questions?</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: 24 }}>Our support team is ready to help.</p>
            <a href="/contact" className="btn btn-primary">Contact Support</a>
          </div>
        </div>
      </section>
    </Page>
  );
};

export default FAQPage;
