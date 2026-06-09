import { useState, useRef, useEffect, RefObject } from "react";

const BRAND = {
  agency: "VelorDigital",
  tagline: "Customer Support, Automated.",
  primaryColor: "#00d4aa",
  darkColor: "#060d1a",
  accentColor: "#4ade80",
};

const SYSTEM_PROMPT = `You are Aria, an AI customer support assistant for Lumio — a project management SaaS.

Help with: billing, login issues, feature questions, bug reports, plan changes, refunds.

Policies:
- Free 14-day trial, no credit card required
- Plans: Starter ($29/mo), Pro ($79/mo), Enterprise (custom)
- Refunds within 30 days
- AI support 24/7, human agents Mon–Fri 9am–6pm EST

Tone: warm, professional, concise. Max 3 sentences unless listing steps. Offer human escalation for complex issues.`;

function useInView(threshold = 0.15): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

function ChatWidget() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! I'm Aria, Lumio's AI support agent. Ask me anything 👋" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  const SUGGESTIONS = ["How do I upgrade?", "I can't log in", "Refund policy?"];

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const next: Message[] = [...messages, { role: "user", content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: next.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, something went wrong.";
      setMessages(p => [...p, { role: "assistant", content: reply }]);
      if (reply.toLowerCase().includes("human") || reply.toLowerCase().includes("escalate")) setEscalated(true);
    } catch { setMessages(p => [...p, { role: "assistant", content: "Connection error. Please try again." }]); }
    setLoading(false);
  }

  return (
    <div style={{
      background: "#0d1625", borderRadius: 20,
      border: "1px solid rgba(0,212,170,0.2)",
      overflow: "hidden",
      boxShadow: "0 0 0 1px rgba(0,212,170,0.1), 0 40px 100px rgba(0,0,0,0.6)",
    }}>
      <div style={{ background: "linear-gradient(135deg, #00d4aa, #00b8d9)", padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.2)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
        <div>
          <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, fontFamily: "'DM Sans', sans-serif" }}>Aria — Lumio Support</div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", opacity: 0.9 }} />
            <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 11, fontFamily: "'DM Sans', sans-serif" }}>Live AI Demo · Try it now</span>
          </div>
        </div>
      </div>

      {escalated && (
        <div style={{ background: "#1a2a1a", borderBottom: "1px solid #2d4a2d", padding: "8px 14px", fontSize: 12, color: "#86efac", fontFamily: "'DM Sans', sans-serif" }}>
          🧑‍💼 Human agent notified — joining in ~2 min
        </div>
      )}

      <div style={{ height: 300, overflowY: "auto", padding: "16px 14px 8px" }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
            {m.role === "assistant" && (
              <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #00d4aa, #00b8d9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, marginRight: 7, flexShrink: 0, marginTop: 2 }}>⚡</div>
            )}
            <div style={{
              maxWidth: "72%", padding: "10px 14px",
              borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
              background: m.role === "user" ? "linear-gradient(135deg, #00d4aa, #00b8d9)" : "rgba(255,255,255,0.05)",
              color: m.role === "user" ? "#060d1a" : "#cbd5e1",
              fontSize: 13, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif",
              border: m.role === "assistant" ? "1px solid rgba(255,255,255,0.06)" : "none",
              whiteSpace: "pre-wrap",
            }}>{m.content}</div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 14px", marginBottom: 10 }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg, #00d4aa,#00b8d9)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>⚡</div>
            <div style={{ display: "flex", gap: 5 }}>
              {[0,1,2].map(i => <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4aa", animation: "bounce 1.2s infinite", animationDelay: `${i*0.2}s` }} />)}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {messages.length <= 1 && (
        <div style={{ padding: "0 14px 10px", display: "flex", gap: 6, flexWrap: "wrap" }}>
          {SUGGESTIONS.map((s, i) => (
            <button key={i} onClick={() => send(s)} style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.25)", borderRadius: 100, padding: "5px 12px", fontSize: 12, color: "#00d4aa", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{s}</button>
          ))}
        </div>
      )}

      <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8 }}>
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") send(input); }}
          placeholder="Type a message..."
          style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "9px 13px", color: "#e2e8f0", fontSize: 13, fontFamily: "'DM Sans', sans-serif", outline: "none" }}
        />
        <button onClick={() => send(input)} disabled={!input.trim() || loading} style={{ width: 36, height: 36, borderRadius: 10, border: "none", background: input.trim() ? "linear-gradient(135deg, #00d4aa, #00b8d9)" : "rgba(255,255,255,0.08)", cursor: input.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke={input.trim() ? "#060d1a" : "#475569"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

interface StatCardProps { value: string; label: string; delay: string; }
function StatCard({ value, label, delay }: StatCardProps) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ textAlign: "center", padding: "28px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, transition: `all 0.6s ease ${delay}`, opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(20px)" }}>
      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, color: "#00d4aa", marginBottom: 6 }}>{value}</div>
      <div style={{ color: "#64748b", fontSize: 13, fontFamily: "'DM Sans', sans-serif" }}>{label}</div>
    </div>
  );
}

interface FeatureProps { icon: string; title: string; desc: string; delay: string; }
function Feature({ icon, title, desc, delay }: FeatureProps) {
  const [ref, inView] = useInView();
  return (
    <div ref={ref} style={{ display: "flex", gap: 16, alignItems: "flex-start", transition: `all 0.5s ease ${delay}`, opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-20px)" }}>
      <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
      <div>
        <div style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 15, marginBottom: 4, fontFamily: "'DM Sans', sans-serif" }}>{title}</div>
        <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6, fontFamily: "'DM Sans', sans-serif" }}>{desc}</div>
      </div>
    </div>
  );
}

export default function App() {
  const [heroRef, heroIn] = useInView(0.05);
  const grad = "linear-gradient(135deg, #00d4aa, #00b8d9)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060d1a; }
        @keyframes bounce { 0%,80%,100% { transform:translateY(0); } 40% { transform:translateY(-5px); } }
        @keyframes pulse { 0%,100% { opacity:1; } 50% { opacity:0.4; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#060d1a", color: "#f1f5f9" }}>

        {/* Nav */}
        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(6,13,26,0.85)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#fff" }}>{BRAND.agency}</span>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            {["Features", "Pricing", "Demo"].map(l => (
              <a key={l} href="#" style={{ color: "#64748b", fontSize: 14, fontWeight: 500 }}>{l}</a>
            ))}
          </div>
          <button style={{ background: grad, border: "none", borderRadius: 10, padding: "9px 20px", color: "#060d1a", fontWeight: 700, fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Book a Demo</button>
        </nav>

        {/* Hero */}
        <section ref={heroRef} style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 40px 80px", maxWidth: 1200, margin: "0 auto", gap: 60, position: "relative" }}>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "linear-gradient(rgba(0,212,170,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,170,0.04) 1px, transparent 1px)", backgroundSize: "60px 60px", maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%)" }} />

          <div style={{ flex: 1, position: "relative", zIndex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 24, opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(16px)", transition: "all 0.6s ease 0.1s" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4aa", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 12, color: "#00d4aa", fontWeight: 600, letterSpacing: "0.06em" }}>AI-POWERED SUPPORT AUTOMATION</span>
            </div>

            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px, 5vw, 56px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 20, opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.2s" }}>
              Resolve <span style={{ color: "#00d4aa" }}>70%</span> of<br />support tickets<br />
              <span style={{ color: "#475569" }}>before humans</span><br />even see them.
            </h1>

            <p style={{ color: "#64748b", fontSize: 17, lineHeight: 1.7, maxWidth: 440, marginBottom: 36, opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.3s" }}>
              We build custom AI support agents for mid-market companies — fully integrated with your helpdesk, live in 30 days.
            </p>

            <div style={{ display: "flex", gap: 12, opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0)" : "translateY(20px)", transition: "all 0.6s ease 0.4s" }}>
              <button style={{ background: grad, border: "none", borderRadius: 12, padding: "14px 28px", color: "#060d1a", fontWeight: 700, fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 8px 30px rgba(0,212,170,0.3)" }}>Get a Free Audit →</button>
              <button style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 24px", color: "#94a3b8", fontWeight: 500, fontSize: 15, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Watch 2-min video</button>
            </div>

            <div style={{ marginTop: 36, display: "flex", alignItems: "center", gap: 12, opacity: heroIn ? 1 : 0, transition: "all 0.6s ease 0.5s" }}>
              <div style={{ display: "flex" }}>
                {["🧑","👩","🧔","👱","🙋"].map((e,i)=>(
                  <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: `hsl(${i*40+160},60%,35%)`, border: "2px solid #060d1a", marginLeft: i ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>{e}</div>
                ))}
              </div>
              <span style={{ color: "#64748b", fontSize: 13 }}>Trusted by <strong style={{ color: "#94a3b8" }}>40+ mid-market teams</strong></span>
            </div>
          </div>

          <div style={{ flex: 1, maxWidth: 420, opacity: heroIn ? 1 : 0, transform: heroIn ? "translateY(0) scale(1)" : "translateY(30px) scale(0.97)", transition: "all 0.8s ease 0.3s" }}>
            <ChatWidget />
            <p style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: "#334155" }}>↑ This is a live AI agent — type anything</p>
          </div>
        </section>

        {/* Stats */}
        <section style={{ padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
            {([["70%", "Average ticket deflection"], ["< 3s", "AI response time"], ["30 days", "Avg time to go live"], ["$180K", "Avg annual savings"]] as [string, string][]).map(([v,l],i) => (
              <StatCard key={l} value={v} label={l} delay={`${i*0.1}s`} />
            ))}
          </div>
        </section>

        {/* Features */}
        <section style={{ padding: "60px 40px 100px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>Everything you need to automate support</h2>
            <p style={{ color: "#64748b", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>We handle the full stack — AI brain, integrations, training, and ongoing optimization.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, maxWidth: 780, margin: "0 auto" }}>
            {([ ["🧠", "Claude-Powered AI", "Built on Anthropic's Claude — the most accurate AI for nuanced support conversations.", "0s"], ["🔗", "Helpdesk Integration", "Plugs into Zendesk, Freshdesk, Intercom, and HubSpot out of the box.", "0.1s"], ["📚", "Trained on Your Docs", "We ingest your FAQs, SOPs, and policies so the AI knows your business.", "0.2s"], ["🧑‍💼", "Smart Escalation", "Detects frustration and complexity — hands off to humans with full context.", "0.3s"], ["📊", "Live Reporting", "Track deflection rate, CSAT, and cost savings in a real-time dashboard.", "0.4s"], ["🔒", "Enterprise Security", "SOC 2 compatible, GDPR-ready, data stays in your region.", "0.5s"] ] as [string,string,string,string][]).map(([icon, title, desc, delay]) => (
              <Feature key={title} icon={icon} title={title} desc={desc} delay={delay} />
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "60px 40px 100px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>Ready to automate your support?</h2>
          <p style={{ color: "#64748b", fontSize: 16, marginBottom: 32 }}>Free audit · No commitment · Live in 30 days</p>
          <button style={{ background: grad, border: "none", borderRadius: 14, padding: "16px 36px", color: "#060d1a", fontWeight: 700, fontSize: 16, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 12px 40px rgba(0,212,170,0.35)" }}>Book a Free 30-Min Audit →</button>
        </section>

        {/* Footer */}
        <footer style={{ padding: "24px 40px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#1e293b" }}>{BRAND.agency}</span>
          <span style={{ color: "#1e293b", fontSize: 12 }}>© 2026 · Powered by Claude AI</span>
        </footer>
      </div>
    </>
  );
}