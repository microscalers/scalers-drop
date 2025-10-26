import React from "react"

export function TerminalLanding() {
  return (
    <main
      style={{
        backgroundColor: "#000",
        color: "#00FF99",
        fontFamily: "JetBrains Mono, monospace",
        padding: "2rem",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <pre style={{ color: "#00FF99", margin: 0 }}>
{`  ^._.^ [accessing blockchain...]`}
        </pre>
        <h1 style={{ fontSize: "2rem", margin: "1rem 0" }}>
          MICROSCALE<span style={{ color: "#fff" }}>RS.AI</span>
        </h1>
        <p style={{ opacity: 0.8 }}>
          industrial-grade gpu infrastructure. ens-verified. base l2 escrow.
        </p>
      </div>

      <section
        style={{
          border: "1px solid #00FF99",
          padding: "1rem 2rem",
          borderRadius: "8px",
          marginBottom: "2rem",
          width: "fit-content",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>$ microscalers --status</h3>
        <div style={{ display: "flex", gap: "2rem" }}>
          <div>
            <div style={{ fontSize: "1.5rem", color: "#fff" }}>32</div>
            <small>R 5090 RIGS</small>
          </div>
          <div>
            <div style={{ fontSize: "1.5rem", color: "#fff" }}>265+</div>
            <small>VERIFIED SCALERS</small>
          </div>
          <div>
            <div style={{ fontSize: "1.5rem", color: "#fff" }}>128GB</div>
            <small>VRAM CLUSTER</small>
          </div>
        </div>
      </section>

      <section
        style={{
          border: "1px solid #00FF99",
          padding: "1rem 2rem",
          borderRadius: "8px",
          width: "fit-content",
          textAlign: "left",
          marginBottom: "3rem",
        }}
      >
        <h3 style={{ marginBottom: "1rem" }}>network log</h3>
        <p style={{ opacity: 0.8 }}>
          &gt; blockchain_verified: every provider verified on-chain.
          trustcall oracle escrow.
          <br />
          &gt; high_perf_hardware: rtx 5090 gpus. 7950x cpus. nvme arrays.
          10gb/s networking.
        </p>
      </section>

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          marginTop: "auto",
          borderTop: "1px solid #00FF99",
          paddingTop: "1rem",
          fontSize: "0.9rem",
          opacity: 0.8,
          textAlign: "center",
        }}
      >
        <p>
          $ build-id:{" "}
          <code>{import.meta.env.VITE_BUILD_ID || "local-dev"}</code> |
          deployed: {new Date().toUTCString()}
          <br />
          <a
            href="https://microscalers.eth.limo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00FF99" }}
          >
            microscalers.eth
          </a>{" "}
          •{" "}
          <a
            href="https://trustcat.eth.limo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00FF99" }}
          >
            trustcat.eth
          </a>
        </p>
      </footer>
    </main>
  )
}
