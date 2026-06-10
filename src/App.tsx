import { useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface Service {
  icon: string;
  title: string;
  description: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const services: Service[] = [
  {
    icon: "⚡",
    title: "Workflow Automation",
    description:
      "Eliminate repetitive manual tasks. We design and deploy end-to-end automation pipelines that save your team hundreds of hours a month.",
  },
  {
    icon: "🤖",
    title: "AI Agent Development",
    description:
      "Custom AI agents that handle customer support, lead qualification, data processing, and more — running 24/7 without oversight.",
  },
  {
    icon: "🔗",
    title: "Systems Integration",
    description:
      "Connect your CRM, ERP, marketing tools, and databases into one seamless, automated ecosystem.",
  },
  {
    icon: "📊",
    title: "Analytics & Reporting",
    description:
      "Automated dashboards and reports delivered to your inbox. Real-time insights without manual data wrangling.",
  },
  {
    icon: "💬",
    title: "AI Chatbots & Assistants",
    description:
      "Intelligent conversational agents trained on your business data — deployed across your website, Slack, WhatsApp, and more.",
  },
  {
    icon: "🚀",
    title: "AI Strategy Consulting",
    description:
      "Not sure where to start? We audit your operations and identify the highest-ROI automation opportunities for your business.",
  },
];

const steps: ProcessStep[] = [
  {
    number: "01",
    title: "Discovery Call",
    description:
      "We learn about your business, your bottlenecks, and where automation can have the biggest impact.",
  },
  {
    number: "02",
    title: "Strategy & Design",
    description:
      "Our team maps out a custom automation architecture tailored to your workflows and tech stack.",
  },
  {
    number: "03",
    title: "Build & Integrate",
    description:
      "We build, test, and deploy your automation systems — fully integrated with your existing tools.",
  },
  {
    number: "04",
    title: "Launch & Optimise",
    description:
      "Go live with confidence. We monitor performance and continuously refine for maximum efficiency.",
  },
];

const testimonials: Testimonial[] = [
  {
    quote:
      "Velor Digital automated our entire onboarding process. What used to take 3 days now happens in under an hour. Exceptional work.",
    author: "Sarah Okonkwo",
    role: "COO, FinScale Africa",
  },
  {
    quote:
      "The AI agent they built handles 80% of our support tickets without human intervention. Our team can finally focus on real problems.",
    author: "Marcus Chen",
    role: "Head of Product, NexaFlow",
  },
  {
    quote:
      "We went from 40 hours of manual reporting per month to zero. The ROI was visible within the first two weeks.",
    author: "Priya Sharma",
    role: "Operations Lead, BrightPath SaaS",
  },
];

const faqs: FAQItem[] = [
  {
    question: "How long does a typical project take?",
    answer:
      "Most projects are scoped and delivered within 2–6 weeks, depending on complexity. Simple automations can be live in under a week.",
  },
  {
    question: "What tools and platforms do you work with?",
    answer:
      "We work across Make (Integromat), n8n, Zapier, Python, OpenAI, Anthropic, HubSpot, Salesforce, Notion, Airtable, Slack, and many more.",
  },
  {
    question: "Do I need a technical team to maintain the automations?",
    answer:
      "No. We build systems that are easy to monitor and manage. We also provide documentation and ongoing support so your team stays in control.",
  },
  {
    question: "How do you price your services?",
    answer:
      "We offer fixed-scope project pricing and monthly retainer packages. Book a discovery call and we'll recommend the best fit for your needs.",
  },
  {
    question: "Can you automate something specific to our industry?",
    answer:
      "Yes. We've built automations for e-commerce, SaaS, finance, healthcare, logistics, and agencies. Book a call and we'll tell you what's possible.",
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      <div style={styles.navInner}>
        <a href="#hero" style={styles.logo}>
          Velor<span style={styles.logoDot}>.</span>Digital
        </a>

        <div style={styles.navLinks}>
          {["Services", "Process", "Results", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={styles.navLink}
            >
              {item}
            </a>
          ))}
          <a href="#contact" style={styles.navCta}>
            Book a Call
          </a>
        </div>

        <button
          style={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {menuOpen && (
        <div style={styles.mobileMenu}>
          {["Services", "Process", "Results", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={styles.mobileLink}
              onClick={() => setMenuOpen(false)}
            >
              {item}
            </a>
          ))}
          <a
            href="#contact"
            style={styles.mobileCta}
            onClick={() => setMenuOpen(false)}
          >
            Book a Call
          </a>
        </div>
      )}
    </nav>
  );
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <div style={styles.card}>
      <div style={styles.cardIcon}>{service.icon}</div>
      <h3 style={styles.cardTitle}>{service.title}</h3>
      <p style={styles.cardDesc}>{service.description}</p>
    </div>
  );
}

function StepCard({ step }: { step: ProcessStep }) {
  return (
    <div style={styles.stepCard}>
      <div style={styles.stepNumber}>{step.number}</div>
      <h3 style={styles.stepTitle}>{step.title}</h3>
      <p style={styles.stepDesc}>{step.description}</p>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div style={styles.testimonialCard}>
      <p style={styles.testimonialQuote}>"{testimonial.quote}"</p>
      <div>
        <div style={styles.testimonialAuthor}>{testimonial.author}</div>
        <div style={styles.testimonialRole}>{testimonial.role}</div>
      </div>
    </div>
  );
}

function FAQAccordion({ item }: { item: FAQItem }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={styles.faqItem}>
      <button
        style={styles.faqQuestion}
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span>{item.question}</span>
        <span style={styles.faqChevron}>{open ? "−" : "+"}</span>
      </button>
      {open && <p style={styles.faqAnswer}>{item.answer}</p>}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent<HTMLDivElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div style={styles.successBox}>
        <div style={styles.successIcon}>✓</div>
        <h3 style={styles.successTitle}>Message received!</h3>
        <p style={styles.successText}>
          We'll be in touch within one business day.
        </p>
      </div>
    );
  }

  return (
    <div
      role="form"
      onSubmit={handleSubmit}
      style={styles.formWrapper}
    >
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Your name"
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@company.com"
          style={styles.input}
          required
        />
      </div>
      <div style={styles.formGroup}>
        <label style={styles.label} htmlFor="message">
          What would you like to automate?
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Describe your workflows, pain points, or goals…"
          style={{ ...styles.input, ...styles.textarea }}
          rows={5}
          required
        />
      </div>
      <button
        type="button"
        style={styles.submitBtn}
        onClick={() => setSubmitted(true)}
      >
        Send Message →
      </button>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div style={styles.page}>
      <Navbar />

      {/* Hero */}
      <section id="hero" style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.heroBadge}>AI Automation Agency</div>
          <h1 style={styles.heroHeading}>
            Build systems that
            <br />
            <span style={styles.heroAccent}>work while you sleep.</span>
          </h1>
          <p style={styles.heroSubtext}>
            Velor Digital designs and deploys custom AI automations that
            eliminate manual work, reduce costs, and scale your business —
            without hiring more people.
          </p>
          <div style={styles.heroCtas}>
            <a href="#contact" style={styles.primaryBtn}>
              Book a Free Discovery Call
            </a>
            <a href="#services" style={styles.ghostBtn}>
              See What We Build
            </a>
          </div>
          <div style={styles.heroStats}>
            {[
              { value: "200+", label: "Automations Deployed" },
              { value: "40hrs", label: "Avg. Saved Per Client/Mo" },
              { value: "3×", label: "Average ROI" },
            ].map((stat) => (
              <div key={stat.label} style={styles.stat}>
                <div style={styles.statValue}>{stat.value}</div>
                <div style={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>What We Build</div>
          <h2 style={styles.sectionHeading}>
            Automation services that move the needle
          </h2>
          <p style={styles.sectionSubtext}>
            From simple task automation to complex multi-agent AI systems —
            we build exactly what your business needs.
          </p>
          <div style={styles.grid3}>
            {services.map((s) => (
              <ServiceCard key={s.title} service={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section id="process" style={{ ...styles.section, ...styles.sectionDark }}>
        <div style={styles.sectionInner}>
          <div style={{ ...styles.sectionLabel, ...styles.sectionLabelDark }}>
            How It Works
          </div>
          <h2 style={{ ...styles.sectionHeading, color: "#ffffff" }}>
            From idea to automation in 4 steps
          </h2>
          <div style={styles.grid4}>
            {steps.map((step) => (
              <StepCard key={step.number} step={step} />
            ))}
          </div>
        </div>
      </section>

      {/* Results / Testimonials */}
      <section id="results" style={styles.section}>
        <div style={styles.sectionInner}>
          <div style={styles.sectionLabel}>Results</div>
          <h2 style={styles.sectionHeading}>What our clients say</h2>
          <div style={styles.grid3}>
            {testimonials.map((t) => (
              <TestimonialCard key={t.author} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ ...styles.section, background: "#f8f9fb" }}>
        <div style={{ ...styles.sectionInner, maxWidth: "760px" }}>
          <div style={styles.sectionLabel}>FAQ</div>
          <h2 style={styles.sectionHeading}>Common questions</h2>
          <div style={styles.faqList}>
            {faqs.map((faq) => (
              <FAQAccordion key={faq.question} item={faq} />
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={styles.section}>
        <div style={{ ...styles.sectionInner, maxWidth: "640px" }}>
          <div style={styles.sectionLabel}>Get Started</div>
          <h2 style={styles.sectionHeading}>
            Let's build your automation system
          </h2>
          <p style={styles.sectionSubtext}>
            Tell us about your business and we'll identify the highest-ROI
            automation opportunities for you — no commitment required.
          </p>
          <ContactForm />
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div style={styles.footerLogo}>
            Velor<span style={styles.logoDot}>.</span>Digital
          </div>
          <div style={styles.footerTagline}>
            AI Automation Agency — Building systems that work while you sleep.
          </div>
          <div style={styles.footerLinks}>
            <a href="mailto:hello@velordigital.com" style={styles.footerLink}>
              hello@velordigital.com
            </a>
          </div>
          <div style={styles.footerCopy}>
            © {new Date().getFullYear()} Velor Digital. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const COLOR = {
  bg: "#ffffff",
  dark: "#0a0a0f",
  accent: "#6c47ff",
  accentLight: "#ede9ff",
  text: "#1a1a2e",
  muted: "#6b7280",
  border: "#e5e7eb",
  cardBg: "#fafafa",
};

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    color: COLOR.text,
    background: COLOR.bg,
    overflowX: "hidden",
  },

  // Nav
  nav: {
    position: "sticky",
    top: 0,
    zIndex: 100,
    background: "rgba(255,255,255,0.95)",
    backdropFilter: "blur(10px)",
    borderBottom: `1px solid ${COLOR.border}`,
  },
  navInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 24px",
    height: "64px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  logo: {
    fontSize: "20px",
    fontWeight: 800,
    color: COLOR.text,
    textDecoration: "none",
    letterSpacing: "-0.5px",
  },
  logoDot: {
    color: COLOR.accent,
  },
  navLinks: {
    display: "flex",
    gap: "32px",
    alignItems: "center",
  },
  navLink: {
    color: COLOR.muted,
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 500,
    transition: "color 0.2s",
  },
  navCta: {
    background: COLOR.accent,
    color: "#fff",
    padding: "8px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "14px",
    fontWeight: 600,
  },
  hamburger: {
    display: "none",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
    color: COLOR.text,
  },
  mobileMenu: {
    display: "flex",
    flexDirection: "column",
    padding: "16px 24px 24px",
    gap: "16px",
    borderTop: `1px solid ${COLOR.border}`,
  },
  mobileLink: {
    color: COLOR.text,
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: 500,
  },
  mobileCta: {
    background: COLOR.accent,
    color: "#fff",
    padding: "12px 18px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 600,
    textAlign: "center",
  },

  // Hero
  hero: {
    padding: "100px 24px 80px",
    textAlign: "center",
    background: `linear-gradient(180deg, ${COLOR.accentLight}33 0%, ${COLOR.bg} 100%)`,
  },
  heroInner: {
    maxWidth: "800px",
    margin: "0 auto",
  },
  heroBadge: {
    display: "inline-block",
    background: COLOR.accentLight,
    color: COLOR.accent,
    padding: "6px 14px",
    borderRadius: "100px",
    fontSize: "13px",
    fontWeight: 600,
    letterSpacing: "0.5px",
    marginBottom: "24px",
    textTransform: "uppercase",
  },
  heroHeading: {
    fontSize: "clamp(36px, 6vw, 68px)",
    fontWeight: 800,
    lineHeight: 1.1,
    letterSpacing: "-2px",
    margin: "0 0 24px",
    color: COLOR.text,
  },
  heroAccent: {
    color: COLOR.accent,
  },
  heroSubtext: {
    fontSize: "18px",
    color: COLOR.muted,
    lineHeight: 1.7,
    maxWidth: "600px",
    margin: "0 auto 40px",
  },
  heroCtas: {
    display: "flex",
    gap: "16px",
    justifyContent: "center",
    flexWrap: "wrap",
    marginBottom: "60px",
  },
  primaryBtn: {
    background: COLOR.accent,
    color: "#fff",
    padding: "14px 28px",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 700,
  },
  ghostBtn: {
    background: "transparent",
    color: COLOR.text,
    padding: "14px 28px",
    borderRadius: "10px",
    textDecoration: "none",
    fontSize: "15px",
    fontWeight: 600,
    border: `2px solid ${COLOR.border}`,
  },
  heroStats: {
    display: "flex",
    justifyContent: "center",
    gap: "48px",
    flexWrap: "wrap",
  },
  stat: {
    textAlign: "center",
  },
  statValue: {
    fontSize: "32px",
    fontWeight: 800,
    color: COLOR.accent,
    letterSpacing: "-1px",
  },
  statLabel: {
    fontSize: "13px",
    color: COLOR.muted,
    marginTop: "4px",
  },

  // Sections
  section: {
    padding: "80px 24px",
    background: COLOR.bg,
  },
  sectionDark: {
    background: COLOR.dark,
  },
  sectionInner: {
    maxWidth: "1200px",
    margin: "0 auto",
    textAlign: "center",
  },
  sectionLabel: {
    display: "inline-block",
    background: COLOR.accentLight,
    color: COLOR.accent,
    padding: "5px 14px",
    borderRadius: "100px",
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "1px",
    textTransform: "uppercase",
    marginBottom: "16px",
  },
  sectionLabelDark: {
    background: "rgba(108,71,255,0.2)",
  },
  sectionHeading: {
    fontSize: "clamp(26px, 4vw, 42px)",
    fontWeight: 800,
    letterSpacing: "-1px",
    marginBottom: "16px",
    color: COLOR.text,
  },
  sectionSubtext: {
    color: COLOR.muted,
    fontSize: "17px",
    maxWidth: "560px",
    margin: "0 auto 48px",
    lineHeight: 1.6,
  },

  // Grids
  grid3: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "24px",
    marginTop: "48px",
  },
  grid4: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "24px",
    marginTop: "48px",
  },

  // Service card
  card: {
    background: COLOR.cardBg,
    border: `1px solid ${COLOR.border}`,
    borderRadius: "16px",
    padding: "28px",
    textAlign: "left",
    transition: "transform 0.2s, box-shadow 0.2s",
  },
  cardIcon: {
    fontSize: "28px",
    marginBottom: "16px",
  },
  cardTitle: {
    fontSize: "17px",
    fontWeight: 700,
    marginBottom: "10px",
    color: COLOR.text,
  },
  cardDesc: {
    fontSize: "14px",
    color: COLOR.muted,
    lineHeight: 1.6,
    margin: 0,
  },

  // Step card
  stepCard: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "16px",
    padding: "28px",
    textAlign: "left",
  },
  stepNumber: {
    fontSize: "13px",
    fontWeight: 800,
    color: COLOR.accent,
    letterSpacing: "1px",
    marginBottom: "12px",
  },
  stepTitle: {
    fontSize: "18px",
    fontWeight: 700,
    color: "#ffffff",
    marginBottom: "10px",
  },
  stepDesc: {
    fontSize: "14px",
    color: "rgba(255,255,255,0.6)",
    lineHeight: 1.6,
    margin: 0,
  },

  // Testimonials
  testimonialCard: {
    background: COLOR.cardBg,
    border: `1px solid ${COLOR.border}`,
    borderRadius: "16px",
    padding: "28px",
    textAlign: "left",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  testimonialQuote: {
    fontSize: "15px",
    color: COLOR.text,
    lineHeight: 1.7,
    margin: 0,
    flex: 1,
  },
  testimonialAuthor: {
    fontSize: "14px",
    fontWeight: 700,
    color: COLOR.text,
  },
  testimonialRole: {
    fontSize: "13px",
    color: COLOR.muted,
  },

  // FAQ
  faqList: {
    marginTop: "40px",
    textAlign: "left",
  },
  faqItem: {
    borderBottom: `1px solid ${COLOR.border}`,
  },
  faqQuestion: {
    width: "100%",
    background: "none",
    border: "none",
    padding: "20px 0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: 600,
    color: COLOR.text,
    textAlign: "left",
    gap: "16px",
  },
  faqChevron: {
    fontSize: "20px",
    color: COLOR.accent,
    flexShrink: 0,
  },
  faqAnswer: {
    fontSize: "15px",
    color: COLOR.muted,
    lineHeight: 1.7,
    paddingBottom: "20px",
    margin: 0,
  },

  // Contact form
  formWrapper: {
    textAlign: "left",
    marginTop: "40px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "14px",
    fontWeight: 600,
    color: COLOR.text,
  },
  input: {
    padding: "12px 16px",
    border: `1px solid ${COLOR.border}`,
    borderRadius: "10px",
    fontSize: "15px",
    color: COLOR.text,
    outline: "none",
    fontFamily: "inherit",
    background: COLOR.bg,
    transition: "border-color 0.2s",
  },
  textarea: {
    resize: "vertical" as const,
    minHeight: "120px",
  },
  submitBtn: {
    background: COLOR.accent,
    color: "#fff",
    border: "none",
    padding: "14px 28px",
    borderRadius: "10px",
    fontSize: "15px",
    fontWeight: 700,
    cursor: "pointer",
    transition: "opacity 0.2s",
    alignSelf: "flex-start",
  },
  successBox: {
    textAlign: "center",
    padding: "60px 24px",
    marginTop: "40px",
    background: COLOR.accentLight,
    borderRadius: "16px",
  },
  successIcon: {
    fontSize: "40px",
    color: COLOR.accent,
    marginBottom: "12px",
  },
  successTitle: {
    fontSize: "22px",
    fontWeight: 800,
    color: COLOR.text,
    marginBottom: "8px",
  },
  successText: {
    color: COLOR.muted,
    fontSize: "16px",
    margin: 0,
  },

  // Footer
  footer: {
    background: COLOR.dark,
    padding: "48px 24px",
    textAlign: "center",
  },
  footerInner: {
    maxWidth: "800px",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    alignItems: "center",
  },
  footerLogo: {
    fontSize: "22px",
    fontWeight: 800,
    color: "#fff",
    letterSpacing: "-0.5px",
  },
  footerTagline: {
    color: "rgba(255,255,255,0.4)",
    fontSize: "14px",
  },
  footerLinks: {
    display: "flex",
    gap: "24px",
    marginTop: "8px",
  },
  footerLink: {
    color: "rgba(255,255,255,0.5)",
    textDecoration: "none",
    fontSize: "14px",
  },
  footerCopy: {
    color: "rgba(255,255,255,0.25)",
    fontSize: "13px",
    marginTop: "16px",
  },
};
