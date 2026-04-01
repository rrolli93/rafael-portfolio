"use client";

import { useEffect, useRef, useState } from "react";

// ─── Data ───────────────────────────────────────────────────────────────────

const CAPABILITIES = [
  { label: "AI Drug Discovery", pct: 92 },
  { label: "Peptide Therapeutics", pct: 88 },
  { label: "Biological Age / Longevity", pct: 85 },
  { label: "Decentralized Science", pct: 80 },
  { label: "Python / Data Science", pct: 78 },
];

const CAREER = [
  {
    period: "2026 – PRESENT",
    title: "Science Lead",
    org: "PeptAI",
    orgHref: null,
    desc: "Leading autonomous AI-driven peptide drug discovery. From target to candidate without human bottlenecks.",
  },
  {
    period: "2025 – PRESENT",
    title: "Biotech Partnerships",
    org: "Molecule AG",
    orgHref: "https://molecule.to",
    desc: "Connecting IP-NFT research funding with biotech founders. Bridging DeSci and traditional pharma.",
  },
  {
    period: "2025 – PRESENT",
    title: "Science Lead",
    org: "Bio Protocol",
    orgHref: "https://bio.xyz",
    desc: "Building open decentralized science infrastructure for the next generation of biotech research.",
  },
  {
    period: "PREVIOUS",
    title: "Co-founder",
    org: "Infinit Biosystems",
    orgHref: null,
    desc: "Founded a longevity biotech startup targeting biological aging mechanisms. EPFL spin-off.",
  },
];

const PROJECTS = [
  {
    name: "PEPTAI",
    tag: "ACTIVE",
    tagColor: "#00ff88",
    role: "SCIENCE LEAD",
    desc: "Autonomous AI-driven peptide drug discovery platform. Generative models for sequence design, structure prediction, and wet-lab prioritization — from target to candidate.",
    chips: ["LLM AGENTS", "DRUG DISCOVERY", "PEPTIDES", "AI"],
    href: null,
  },
  {
    name: "BIOAGE",
    tag: "LIVE",
    tagColor: "#00ff88",
    role: "FOUNDER",
    desc: "Biological age tracking app. Log bloodwork, compute phenotypic age using validated algorithms, monitor your trajectory. Open-source longevity tooling.",
    chips: ["LONGEVITY", "BIOMARKERS", "REACT NATIVE", "HEALTH"],
    href: "https://bioage-mu.vercel.app",
  },
];

const ACCOLADES = [
  { idx: 0, text: "MSc Bioengineering — EPFL (École Polytechnique Fédérale de Lausanne)" },
  { idx: 1, text: "Co-founder — Infinit Biosystems (EPFL spin-off)" },
  { idx: 2, text: "Science Lead — PeptAI autonomous peptide discovery" },
  { idx: 3, text: "Molecule AG Biotech Partnerships" },
  { idx: 4, text: "Bio Protocol DeSci Infrastructure Lead" },
];

// ─── Primitives ──────────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      fontSize: "10px", fontWeight: 600, letterSpacing: "0.18em",
      color: "var(--accent)", textTransform: "uppercase",
      marginBottom: "20px", fontFamily: "var(--font)",
    }}>
      {"// "}{children}
    </p>
  );
}

function Badge({ label, color }: { label: string; color?: string }) {
  return (
    <span style={{
      fontSize: "9px", fontWeight: 700, letterSpacing: "0.16em",
      padding: "2px 8px",
      border: `1px solid ${color || "rgba(0,255,136,0.35)"}`,
      color: color || "var(--accent)",
      background: `${color || "var(--accent)"}12`,
      textTransform: "uppercase",
      fontFamily: "var(--font)",
    }}>{label}</span>
  );
}

function Chip({ label }: { label: string }) {
  return (
    <span style={{
      fontSize: "9px", letterSpacing: "0.12em",
      padding: "2px 7px",
      border: "1px solid var(--border)",
      color: "var(--text-secondary)",
      textTransform: "uppercase",
      fontFamily: "var(--font)",
    }}>{label}</span>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "var(--bg-card)",
      border: "1px solid var(--border)",
      padding: "24px",
      transition: "border-color 0.2s",
      ...style,
    }}
    onMouseEnter={e => (e.currentTarget.style.borderColor = "var(--border-bright)")}
    onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
    >{children}</div>
  );
}

// ─── Blinking cursor ─────────────────────────────────────────────────────────

function Cursor() {
  return (
    <span style={{
      display: "inline-block",
      width: "10px", height: "18px",
      background: "var(--accent)",
      verticalAlign: "middle",
      marginLeft: "4px",
      animation: "blink 1.1s step-end infinite",
    }} />
  );
}

// ─── Skill bar ───────────────────────────────────────────────────────────────

function SkillBar({ label, pct }: { label: string; pct: number }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setAnimated(true); obs.disconnect(); }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ marginBottom: "14px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
        <span style={{ fontSize: "11px", color: "var(--text-secondary)", letterSpacing: "0.06em" }}>{label}</span>
        <span style={{ fontSize: "10px", color: "var(--accent)", letterSpacing: "0.08em" }}>{pct}%</span>
      </div>
      <div style={{ height: "2px", background: "rgba(0,255,136,0.1)" }}>
        <div style={{
          height: "100%",
          background: "var(--accent)",
          width: animated ? `${pct}%` : "0%",
          transition: "width 1.2s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "0 0 8px rgba(0,255,136,0.4)",
        }} />
      </div>
    </div>
  );
}

// ─── Fade-in on scroll ────────────────────────────────────────────────────────

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); obs.disconnect(); }
    }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(16px)",
      transition: `opacity 0.55s ease ${delay}ms, transform 0.55s ease ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Home() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toISOString().replace("T", " ").split(".")[0] + " UTC");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const grid: React.CSSProperties = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "2px",
  };

  const gridFull: React.CSSProperties = {
    gridColumn: "1 / -1",
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font)" }}>

      {/* ── NAV ── */}
      <header style={{
        borderBottom: "1px solid var(--border)",
        padding: "14px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0,
        background: "rgba(8,8,8,0.92)",
        backdropFilter: "blur(16px)",
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{
            display: "inline-block", width: "7px", height: "7px",
            borderRadius: "50%", background: "var(--accent)",
            boxShadow: "0 0 8px var(--accent)",
            animation: "blink 2s ease-in-out infinite",
          }} />
          <span style={{ fontSize: "12px", fontWeight: 700, letterSpacing: "0.14em", color: "var(--text)" }}>
            RAF // DASHBOARD
          </span>
        </div>
        <nav style={{ display: "flex", gap: "4px" }}>
          {[
            { label: "EMAIL", href: "mailto:rafael.rolli.galaxy@gmail.com" },
            { label: "LINKEDIN", href: "https://www.linkedin.com/in/rafael-alain-rolli/" },
            { label: "GITHUB", href: "https://github.com/rrolli93" },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{
              fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em",
              color: "var(--text-secondary)",
              padding: "5px 12px",
              border: "1px solid var(--border)",
              transition: "all 0.15s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--accent)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border-bright)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-secondary)";
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--border)";
            }}
            >{l.label}</a>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: "1020px", margin: "0 auto", padding: "2px 24px 80px" }}>

        {/* ── GRID ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2px" }}>

          {/* ID CARD */}
          <FadeIn delay={0}>
            <Card style={{ gridColumn: "1 / -1" }}>
              <SectionLabel>ID_CARD &nbsp;<span style={{ color: "var(--text-muted)" }}>ONLINE</span></SectionLabel>
              <h1 style={{
                fontSize: "clamp(28px, 4vw, 46px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "#fff",
                lineHeight: 1.1,
                marginBottom: "20px",
                fontFamily: "var(--font)",
              }}>
                Hello World<Cursor />
              </h1>
              <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "4px 12px", maxWidth: "560px" }}>
                {[
                  ["> Subject:", "Rafael Alain Rolli"],
                  ["> Role:", "Biotechnologist & Entrepreneur"],
                  ["> Mission:", "AI + Biotech + Decentralized Science"],
                  ["> Location:", "Zurich, Switzerland · 47.3769° N, 8.5417° E"],
                ].map(([k, v]) => (
                  <>
                    <span key={k + "k"} style={{ color: "var(--text-muted)", fontSize: "11px", whiteSpace: "nowrap" }}>{k}</span>
                    <span key={k + "v"} style={{ color: "var(--text-secondary)", fontSize: "11px" }}>{v}</span>
                  </>
                ))}
              </div>
            </Card>
          </FadeIn>

          {/* CAPABILITIES */}
          <FadeIn delay={50}>
            <Card style={{ height: "100%" }}>
              <SectionLabel>SYS_CAPABILITIES</SectionLabel>
              {CAPABILITIES.map(c => <SkillBar key={c.label} label={c.label} pct={c.pct} />)}
            </Card>
          </FadeIn>

          {/* CAREER */}
          <FadeIn delay={100}>
            <Card style={{ height: "100%" }}>
              <SectionLabel>CAREER_LOGS</SectionLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                {CAREER.map((c, i) => (
                  <div key={i}>
                    <div style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.14em", marginBottom: "3px" }}>
                      {c.period}
                    </div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "12px", fontWeight: 600, color: i === 0 ? "var(--accent)" : "var(--text)" }}>
                        {c.title}
                      </span>
                      {c.orgHref
                        ? <a href={c.orgHref} target="_blank" rel="noreferrer"
                            style={{ fontSize: "11px", color: "var(--accent)", opacity: 0.7 }}>{c.org}</a>
                        : <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{c.org}</span>
                      }
                    </div>
                    <p style={{ fontSize: "10px", color: "var(--text-muted)", lineHeight: 1.6 }}>{c.desc}</p>
                  </div>
                ))}
              </div>
            </Card>
          </FadeIn>

          {/* PROJECTS */}
          {PROJECTS.map((p, i) => (
            <FadeIn key={p.name} delay={150 + i * 50}>
              <Card style={{ height: "100%" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                  <SectionLabel>{"CAM_0" + (i + 1)}</SectionLabel>
                  <Badge label={p.tag} color={p.tagColor} />
                </div>
                <h3 style={{
                  fontSize: "18px", fontWeight: 700, letterSpacing: "0.06em",
                  color: "#fff", marginBottom: "4px", fontFamily: "var(--font)",
                }}>{p.name}</h3>
                <p style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.14em", marginBottom: "12px" }}>
                  ROLE: {p.role}
                </p>
                <p style={{ fontSize: "11px", color: "var(--text-secondary)", lineHeight: 1.65, marginBottom: "16px" }}>
                  {p.desc}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "5px", marginBottom: p.href ? "16px" : "0" }}>
                  {p.chips.map(ch => <Chip key={ch} label={ch} />)}
                </div>
                {p.href && (
                  <a href={p.href} target="_blank" rel="noreferrer" style={{
                    display: "inline-block",
                    marginTop: "12px",
                    fontSize: "10px", fontWeight: 600, letterSpacing: "0.12em",
                    color: "var(--accent)",
                    border: "1px solid var(--border-bright)",
                    padding: "5px 14px",
                  }}>OPEN →</a>
                )}
              </Card>
            </FadeIn>
          ))}

          {/* ACCOLADES */}
          <FadeIn delay={200}>
            <Card style={{ gridColumn: "1 / -1" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <SectionLabel>ACCOLADES_TERM</SectionLabel>
                <Badge label="ROOT ACCESS" />
              </div>
              <p style={{ fontSize: "10px", color: "var(--text-muted)", marginBottom: "16px", letterSpacing: "0.08em" }}>
                {">"} ./list_credentials.sh
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {ACCOLADES.map(a => (
                  <div key={a.idx} style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)", minWidth: "22px", fontWeight: 600 }}>
                      [{a.idx}]
                    </span>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>{a.text}</span>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: "16px", fontSize: "10px", color: "var(--text-muted)" }}>
                {">"} _ <span style={{ animation: "blink 1.1s step-end infinite", display: "inline-block" }}>|</span>
              </p>
            </Card>
          </FadeIn>

          {/* GEOLOCATION */}
          <FadeIn delay={250}>
            <Card style={{ gridColumn: "1 / -1" }}>
              <SectionLabel>GEOLOCATION</SectionLabel>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", alignItems: "center" }}>
                <div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {[
                      { loc: "Zurich, Switzerland", coords: "47.3769° N, 8.5417° E", active: true },
                      { loc: "EPFL, Lausanne", coords: "46.5197° N, 6.5659° E", active: false },
                    ].map(l => (
                      <div key={l.loc} style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                        <span style={{
                          width: "7px", height: "7px", borderRadius: "50%",
                          background: l.active ? "var(--accent)" : "#ff8844",
                          boxShadow: l.active ? "0 0 6px var(--accent)" : "0 0 6px #ff8844",
                          flexShrink: 0,
                        }} />
                        <div>
                          <div style={{ fontSize: "11px", color: "var(--text)" }}>{l.loc}</div>
                          <div style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>{l.coords}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.1em", marginBottom: "4px" }}>SECTOR</div>
                  <div style={{ fontSize: "13px", color: "var(--accent)", letterSpacing: "0.1em" }}>EUROPE</div>
                  <div style={{ fontSize: "9px", color: "var(--text-muted)", letterSpacing: "0.08em", marginTop: "8px" }}>
                    SYS_CLOCK: {time || "—"}
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>

        </div>
      </main>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid var(--border)",
        padding: "16px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.1em" }}>
          SYSTEM STATUS: <span style={{ color: "var(--accent)" }}>OPTIMAL</span>
        </span>
        <span style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.08em" }}>
          © 2026 RAFAEL ALAIN ROLLI // INITIATED: 2015 // UPDATED: 2026
        </span>
      </footer>

    </div>
  );
}
