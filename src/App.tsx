import { useState, useRef, useEffect } from "react";

const BRAND = {
  agency: "VelorDigital",
  tagline: "Customer Support, Automated.",
  primaryColor: "#00d4aa",
};

const SYSTEM_PROMPT = `You are Aria, an AI customer support assistant for Lumio — a project management SaaS.
Help with: billing, login issues, feature questions, bug reports, plan changes, refunds.
Policies:
- Free 14-day trial, no credit card required
- Plans: Starter ($29/mo), Pro ($79/mo), Enterprise (custom)
- Refunds within 30 days
- AI support 24/7, human agents Mon-Fri 9am-6pm EST
Tone: warm, professional, concise. Max 3 sentences unless listing steps.`;

export default function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Hi! I'm Aria, Lumio's AI support agent. Ask me anything 👋" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [escalated, setEscalated] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const SUGGESTIONS = ["How do I upgrade?", "I can't log in", "Refund policy?"];

  async function send(text: string) {
    if (!text.trim() || loading) return;
    const next = [...messages, { role: "user" as const, content: text }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Sorry, something went wrong.";
      setMessages((p) => [...p, { role: "assistant" as const, content: reply }]);
      if (reply.toLowerCase().includes("human") || reply.toLowerCase().includes("escalate")) {
        setEscalated(true);
      }
    } catch {
      setMessages((p) => [...p, { role: "assistant" as const, content: "Connection error." }]);
    }
    setLoading(false);
  }

  const grad = "linear-gradient(135deg, #00d4aa, #00b8d9)";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Syne:wght@700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060d1a; font-family: 'DM Sans', sans-serif; }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 4px; }
        input { outline: none; }
        a { text-decoration: none; color: #64748b; }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#060d1a", color: "#f1f5f9" }}>

        <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, padding: "16px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "rgba(6,13,26,0.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>⚡</div>
            <span style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, color: "#fff" }}>{BRAND.agency}</span>
          </div>
          <div style={{ display: "flex", gap: 32 }}>
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Demo</a>
          </div>
          <button style={{ background: grad, border: "none", borderRadius: 10, padding: "9px 20px", color: "#060d1a", fontWeight: 700, fontSize: 13, cursor: "pointer" }}>Book a Demo</button>
        </nav>

        <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "120px 40px 80px", maxWidth: 1200, margin: "0 auto", gap: 60 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.2)", borderRadius: 100, padding: "6px 16px", marginBottom: 24 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#00d4aa", animation: "pulse 2s infinite" }} />
              <span style={{ fontSize: 12, color: "#00d4aa", fontWeight: 600, letterSpacing: "0.06em" }}>AI-POWERED SUPPORT AUTOMATION</span>
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px,5vw,56px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: 20 }}>
              Resolve <span style={{ color: "#00d4aa" }}>70%</span> of<br />support tickets<br />
              <span style={{ color: "#475569" }}>before humans</span><br />even see them.
            </h1>
            <p style={{ color: "#64748b", fontSize: 17, lineHeight: 1.7, maxWidth: 440, marginBottom: 36 }}>
              We build custom AI support agents for mid-market companies — fully integrated with your helpdesk, live in 30 days.
            </p>
            <div style={{ display: "flex", gap: 12, marginBottom: 36 }}>
              <button style={{ background: grad, border: "none", borderRadius: 12, padding: "14px 28px", color: "#060d1a", fontWeight: 700, fontSize: 15, cursor: "pointer", boxShadow: "0 8px 30px rgba(0,212,170,0.3)" }}>Get a Free Audit →</button>
              <button style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, padding: "14px 24px", color: "#94a3b8", fontWeight: 500, fontSize: 15, cursor: "pointer" }}>Watch 2-min video</button>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ display: "flex" }}>
                {["🧑","👩","🧔","👱","🙋"].map((e, i) => (
                  <div key={i} style={{ width: 28, height: 28, borderRadius: "50%", background: `hsl(${i*40+160},60%,35%)`, border: "2px solid #060d1a", marginLeft: i ? -8 : 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13 }}>{e}</div>
                ))}
              </div>
              <span style={{ color: "#64748b", fontSize: 13 }}>Trusted by <strong style={{ color: "#94a3b8" }}>40+ mid-market teams</strong></span>
            </div>
          </div>

          <div style={{ flex: 1, maxWidth: 420 }}>
            <div style={{ background: "#0d1625", borderRadius: 20, border: "1px solid rgba(0,212,170,0.2)", overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.6)" }}>
              <div style={{ background: grad, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(0,0,0,0.2)", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚡</div>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Aria — Lumio Support</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#fff", opacity: 0.9 }} />
                    <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 11 }}>Live AI Demo · Try it now</span>
                  </div>
                </div>
              </div>
              {escalated && (
                <div style={{ background: "#1a2a1a", borderBottom: "1px solid #2d4a2d", padding: "8px 14px", fontSize: 12, color: "#86efac" }}>
                  🧑‍💼 Human agent notified — joining in ~2 min
                </div>
              )}
              <div style={{ height: 300, overflowY: "auto", padding: "16px 14px 8px" }}>
                {messages.map((m, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
                    {m.role === "assistant" && (
                      <div style={{ width: 26, height: 26, borderRadius: "50%", background: grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, marginRight: 7, flexShrink: 0, marginTop: 2 }}>⚡</div>
                    )}
                    <div style={{ maxWidth: "72%", padding: "10px 14px", borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.role === "user" ? grad : "rgba(255,255,255,0.05)", color: m.role === "user" ? "#060d1a" : "#cbd5e1", fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "10px 14px" }}>
                    <div style={{ width: 26, height: 26, borderRadius: "50%", background: grad, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12 }}>⚡</div>
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
                    <button key={i} onClick={() => send(s)} style={{ background: "rgba(0,212,170,0.08)", border: "1px solid rgba(0,212,170,0.25)", borderRadius: 100, padding: "5px 12px", fontSize: 12, color: "#00d4aa", cursor: "pointer", fontWeight: 500 }}>{s}</button>
                  ))}
                </div>
              )}
              <div style={{ padding: "10px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 8 }}>
                <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => { if (e.key === "Enter") send(input); }} placeholder="Type a message..." style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, padding: "9px 13px", color: "#e2e8f0", fontSize: 13 }} />
                <button onClick={() => send(input)} disabled={!input.trim() || loading} style={{ width: 36, height: 36, borderRadius: 10, border: "none", background: input.trim() ? grad : "rgba(255,255,255,0.08)", cursor: input.trim() ? "pointer" : "default", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" stroke={input.trim() ? "#060d1a" : "#475569"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            <p style={{ textAlign: "center", marginTop: 10, fontSize: 11, color: "#334155" }}>↑ This is a live AI agent — type anything</p>
          </div>
        </section>

        <section style={{ padding: "0 40px 80px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }}>
            {[["70%","Average ticket deflection"],["< 3s","AI response time"],["30 days","Avg time to go live"],["$180K","Avg annual savings"]].map(([v,l]) => (
              <div key={l} style={{ textAlign: "center", padding: "28px 20px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16 }}>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 40, fontWeight: 800, color: "#00d4aa", marginBottom: 6 }}>{v}</div>
                <div style={{ color: "#64748b", fontSize: 13 }}>{l}</div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "60px 40px 100px", maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 12 }}>Everything you need to automate support</h2>
            <p style={{ color: "#64748b", fontSize: 16, maxWidth: 480, margin: "0 auto" }}>We handle the full stack — AI brain, integrations, training, and ongoing optimization.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 36, maxWidth: 780, margin: "0 auto" }}>
            {[
              ["🧠","Claude-Powered AI","Built on Anthropic's Claude — the most accurate AI for nuanced support conversations."],
              ["🔗","Helpdesk Integration","Plugs into Zendesk, Freshdesk, Intercom, and HubSpot out of the box."],
              ["📚","Trained on Your Docs","We ingest your FAQs, SOPs, and policies so the AI knows your business."],
              ["🧑‍💼","Smart Escalation","Detects frustration and complexity — hands off to humans with full context."],
              ["📊","Live Reporting","Track deflection rate, CSAT, and cost savings in a real-time dashboard."],
              ["🔒","Enterprise Security","SOC 2 compatible, GDPR-ready, data stays in your region."],
            ].map(([icon, title, desc]) => (
              <div key={title} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: "rgba(0,212,170,0.1)", border: "1px solid rgba(0,212,170,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>{icon}</div>
                <div>
                  <div style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 15, marginBottom: 4 }}>{title}</div>
                  <div style={{ color: "#64748b", fontSize: 13, lineHeight: 1.6 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section style={{ padding: "60px 40px 100px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 40, fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 16 }}>Ready to automate your support?</h2>
          <p style={{ color: "#64748b", fontSize: 16, marginBottom: 32 }}>Free audit · No commitment · Live in 30 days</p>
          <button style={{ background: grad, border: "none", borderRadius: 14, padding: "16px 36px", color: "#060d1a", fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: "0 12px 40px rgba(0,212,170,0.35)" }}>Book a Free 30-Min Audit →</button>
        </section>

        <footer style={{ padding: "24px 40px", borderTop: "1px solid rgba(255,255,255,0.04)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, color: "#94a3b8" }}>{BRAND.agency}</span>
          <span style={{ color: "#475569", fontSize: 12 }}>© 2026 · Powered by Claude AI</span>
        </footer>

      </div>
    </>
  );
}
