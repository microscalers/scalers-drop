import React, { useState } from 'react'
import { InteractiveCLI } from './InteractiveCLI'
import { WalletConnect } from '../wallet/WalletConnect'
import { ScalersPayment } from '../wallet/ScalersPayment'

export function TerminalLanding() {
  const [showPayment, setShowPayment] = useState(false)

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
      {/* ===== HEADER ===== */}
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "2rem", margin: "1rem 0", fontFamily: "JetBrains Mono, monospace" }}>
          MICROSCALE<span style={{ color: "#fff" }}>RS.AI</span>
        </h1>
        <p style={{ opacity: 0.8, fontFamily: "JetBrains Mono, monospace" }}>
          industrial-grade gpu infrastructure. ens-verified. base l2 escrow.
        </p>
      </div>

      {/* ===== INTERACTIVE CLI ===== */}
      <section style={{ marginTop: "2rem", marginBottom: "3rem", width: "100%" }}>
        <InteractiveCLI onJoin={() => setShowPayment(true)} />
      </section>

      {/* ===== HERO ===== */}
      <section style={{ textAlign: "center", marginBottom: "3rem", width: "100%" }}>

        <div style={{ color: "#00CC66", fontSize: "0.9rem", marginBottom: "0.5rem", fontFamily: "JetBrains Mono, monospace" }}>
          $ ./microscalers --status
        </div>
        <h2 style={{ fontSize: "2rem", marginBottom: "1rem", fontFamily: "JetBrains Mono, monospace" }}>
          Trusted Compute Brokerage
        </h2>
        <p style={{ fontSize: "1.1rem", opacity: 0.85, marginBottom: "2rem", fontFamily: "JetBrains Mono, monospace" }}>
          Industrial-grade GPU infrastructure. ENS-verified. Base L2 escrow.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <button
            onClick={() => setShowPayment(true)}
            style={{
              backgroundColor: "#00FF99",
              color: "#000",
              fontWeight: "bold",
              padding: "0.8rem 1.5rem",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            JOIN_SCALERS() → $29_USDC
          </button>
          <button
            style={{
              background: "transparent",
              color: "#00FF99",
              border: "1px solid #00FF99",
              borderRadius: "6px",
              padding: "0.8rem 1.5rem",
              cursor: "pointer",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            PROVIDE_COMPUTE()
          </button>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section
        style={{
          border: "1px solid #00FF99",
          borderRadius: "8px",
          padding: "1rem 2rem",
          marginBottom: "3rem",
          display: "flex",
          gap: "3rem",
          justifyContent: "center",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", color: "#fff", fontFamily: "JetBrains Mono, monospace" }}>32</div>
          <small style={{ fontFamily: "JetBrains Mono, monospace" }}>R5090 RIGS</small>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", color: "#fff", fontFamily: "JetBrains Mono, monospace" }}>265+</div>
          <small style={{ fontFamily: "JetBrains Mono, monospace" }}>VERIFIED SCALERS</small>
        </div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "1.5rem", color: "#fff", fontFamily: "JetBrains Mono, monospace" }}>128GB</div>
          <small style={{ fontFamily: "JetBrains Mono, monospace" }}>VRAM CLUSTER</small>
        </div>
      </section>

      {/* ===== WALLET / PAYMENT ===== */}
      {showPayment && (
        <div style={{ marginTop: "2rem" }}>
          <WalletConnect />
          <ScalersPayment onClose={() => setShowPayment(false)} />
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <footer
        style={{
          marginTop: "auto",
          borderTop: "1px solid #00FF99",
          paddingTop: "1rem",
          fontSize: "0.9rem",
          opacity: 0.8,
          textAlign: "center",
          fontFamily: "JetBrains Mono, monospace",
        }}
      >
        <p>
          $ build-id:{" "}
          <code style={{ fontFamily: "JetBrains Mono, monospace" }}>{import.meta.env.VITE_BUILD_ID || "local-dev"}</code> |
          deployed: {new Date().toUTCString()}
          <br />
          <a
            href="https://microscalers.eth.limo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00FF99", fontFamily: "JetBrains Mono, monospace" }}
          >
            microscalers.eth
          </a>{" "}
          •{" "}
          <a
            href="https://trustcat.eth.limo"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#00FF99", fontFamily: "JetBrains Mono, monospace" }}
          >
            trustcat.eth
          </a>
        </p>
      </footer>
    </main>
  )
}
