"use client";

const ROLES = [
  { title: "Science Lead", org: "PeptAI", period: "2026–present" },
  { title: "Biotech Partnerships", org: "Molecule AG", period: "2025–present" },
  { title: "Science Lead", org: "Bio Protocol", period: "2025–present" },
];

const PROJECTS = [
  {
    name: "PeptAI",
    desc: "Autonomous AI-driven peptide drug discovery platform — from target to candidate without human bottlenecks.",
    tag: "ACTIVE",
    href: null as string | null,
  },
  {
    name: "BioAge",
    desc: "Biological age tracking app — log bloodwork, compute phenotypic age, monitor your trajectory.",
    tag: "LIVE",
    href: "https://bioage-mu.vercel.app" as string | null,
  },
];

function Tag({ label, active }: { label: string; active?: boolean }) {
  return (
    <span style={{
      fontSize: "9px", fontWeight: 600, letterSpacing: "0.14em",
      padding: "2px 7px", borderRadius: "3px",
      border: `1px solid ${active ? "var(--accent)" : "var(--border-hover)"}`,
      color: active ? "var(--accent)" : "var(--text-muted)",
      background: active ? "var(--accent-dim)" : "transparent",
      textTransform: "uppercase" as const,
    }}>{label}</span>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: "var(--bg-card)", border: "1px solid var(--border)",
      borderRadius: "6px", padding: "28px", ...style,
    }}>{children}</div>
  );
}

function SectionLabel({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <p style={{
      fontSize: "9px", fontWeight: 600, letterSpacing: "0.18em",
      color: "var(--text-muted)", textTransform: "uppercase" as const,
      marginBottom: "20px", ...style,
    }}>{children}</p>
  );
}

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font)" }}>
      {/* Top bar */}
      <header style={{
        borderBottom: "1px solid var(--border)", padding: "16px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, background: "rgba(10,10,10,0.88)",
        backdropFilter: "blur(12px)", zIndex: 100,
      }}>
        <span style={{ fontSize: "13px", fontWeight: 700, letterSpacing: "0.06em", color: "var(--text)" }}>
          RAF
        </span>
        <nav style={{ display: "flex", gap: "28px" }}>
          {[
            { label: "Email", href: "mailto:rafael.rolli.galaxy@gmail.com" },
            { label: "LinkedIn", href: "https://www.linkedin.com/in/rafael-alain-rolli/" },
          ].map((l) => (
            <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
              style={{ fontSize: "12px", color: "var(--text-secondary)", letterSpacing: "0.04em" }}>
              {l.label}
            </a>
          ))}
        </nav>
      </header>

      <main style={{ maxWidth: "960px", margin: "0 auto", padding: "60px 24px 100px" }}>
        {/* HERO */}
        <section style={{ marginBottom: "56px" }}>
          <p style={{
            fontSize: "11px", fontWeight: 600, letterSpacing: "0.18em",
            color: "var(--accent)", textTransform: "uppercase" as const, marginBottom: "16px",
          }}>Zurich, Switzerland</p>
          <h1 style={{
            fontSize: "clamp(34px, 5vw, 54px)", fontWeight: 700, lineHeight: 1.08,
            letterSpacing: "-0.025em", color: "var(--text)", marginBottom: "22px",
          }}>Rafael Alain Rolli</h1>
          <p style={{
            fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.8,
            maxWidth: "600px", fontWeight: 400,
          }}>
            Biotechnologist and entrepreneur building at the intersection of AI, biotech, and
            decentralized science. Co-founder of Infinit Biosystems. Currently Science Lead at
            Molecule Protocol, working on autonomous AI-driven peptide drug discovery.
            Previously EPFL MSc Bioengineering.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "30px", flexWrap: "wrap" }}>
            <a href="mailto:rafael.rolli.galaxy@gmail.com"
              style={{
                padding: "10px 20px", borderRadius: "5px", background: "var(--accent)",
                color: "#fff", fontSize: "13px", fontWeight: 500, letterSpacing: "0.02em",
              }}>Get in touch</a>
            <a href="https://www.linkedin.com/in/rafael-alain-rolli/" target="_blank" rel="noreferrer"
              style={{
                padding: "10px 20px", borderRadius: "5px", border: "1px solid var(--border-hover)",
                color: "var(--text-secondary)", fontSize: "13px", fontWeight: 500,
              }}>LinkedIn →</a>
          </div>
        </section>

        {/* GRID */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }} className="two-col">
          {/* Roles */}
          <Card>
            <SectionLabel>Current Roles</SectionLabel>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {ROLES.map((r) => (
                <div key={r.title + r.org}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)" }}>{r.title}</span>
                    <span style={{ fontSize: "10px", color: "var(--text-muted)", letterSpacing: "0.04em" }}>{r.period}</span>
                  </div>
                  <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>{r.org}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Education */}
          <Card>
            <SectionLabel>Education</SectionLabel>
            <p style={{ fontSize: "13px", fontWeight: 600, color: "var(--text)", marginBottom: "6px" }}>
              MSc Bioengineering
            </p>
            <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginBottom: "20px" }}>
              EPFL — École Polytechnique Fédérale de Lausanne
            </p>
            <div style={{
              padding: "12px 16px", borderRadius: "4px",
              background: "var(--accent-dim)", border: "1px solid var(--accent-glow)",
            }}>
              <p style={{ fontSize: "11px", color: "var(--accent)", fontWeight: 600, letterSpacing: "0.04em" }}>
                Infinit Biosystems
              </p>
              <p style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "3px" }}>Co-founder</p>
            </div>
          </Card>
        </div>

        {/* PROJECTS */}
        <div style={{ marginBottom: "16px" }}>
          <SectionLabel style={{ marginBottom: "16px" }}>Projects</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }} className="two-col">
            {PROJECTS.map((p) => (
              <Card key={p.name}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)", letterSpacing: "-0.01em" }}>
                    {p.href
                      ? <a href={p.href} target="_blank" rel="noreferrer" style={{ color: "inherit" }}>{p.name} ↗</a>
                      : p.name}
                  </span>
                  <Tag label={p.tag} active />
                </div>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.7 }}>{p.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* FOCUS */}
        <Card>
          <SectionLabel>Focus Areas</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
            {["AI Drug Discovery","Peptide Therapeutics","Biological Age","Decentralized Science","Longevity","Autonomous Research","Bioengineering","DeSci"].map((tag) => (
              <span key={tag} style={{
                fontSize: "11px", padding: "5px 12px", borderRadius: "4px",
                border: "1px solid var(--border)", color: "var(--text-secondary)",
              }}>{tag}</span>
            ))}
          </div>
        </Card>
      </main>

      <footer style={{
        borderTop: "1px solid var(--border)", padding: "20px 32px",
        display: "flex", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>© 2026 Rafael Alain Rolli</span>
        <span style={{ fontSize: "11px", color: "var(--text-muted)" }}>Zurich, Switzerland</span>
      </footer>

      <style>{`
        @media (max-width: 640px) { .two-col { grid-template-columns: 1fr !important; } }
        a { transition: color 0.15s, opacity 0.15s; }
      `}</style>
    </div>
  );
}
