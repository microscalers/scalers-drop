import React, { useState, useEffect, useRef, useCallback } from "react"
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { base } from 'wagmi/chains'
import { notifyJoinCommand, notifyProvideCommand } from '../../lib/discord'

export type InteractiveCLIProps = {
  onJoin?: () => void
}

export function InteractiveCLI({ onJoin }: InteractiveCLIProps) {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, status: connectStatus, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain, isPending: isSwitching } = useSwitchChain()

  const [history, setHistory] = useState<string[]>(() => {
    // Load history from localStorage on component mount
    try {
      const saved = localStorage.getItem("cli-history")
      const parsed = saved ? JSON.parse(saved) : []
      // Ensure we have an array of strings
      return Array.isArray(parsed) ? parsed.filter(item => typeof item === 'string') : []
    } catch {
      return []
    }
  })
  const [input, setInput] = useState("")
  const [cursorVisible, setCursorVisible] = useState(true)
  const [booting, setBooting] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Helper function to render colored text
  const renderColoredText = (text: string) => {
    // Guard against undefined or null text
    if (!text || typeof text !== 'string') {
      return text || ''
    }

    // Simple color mapping for terminal-like appearance
    const colorMap: { [key: string]: string } = {
      '→': '#00FF99', // Green for arrows
      'docs.microscalers.eth.limo': '#00FF99',
      'members.microscalers.eth.limo': '#00FF99', 
      'dev.microscalers.eth.limo': '#00FF99',
      'microscalers.eth': '#00FF99',
      'trusted compute brokerage': '#00FF99',
      '[ booting microscalers node... ]': '#00CC66',
      '[ connecting to Base L2... ok ✅ ]': '#00FF99',
      '[ initializing wagmi... done ]': '#00FF99',
      'Welcome to Microscalers CLI': '#FFFFFF',
      'type `help` to begin': '#00FF99'
    }

    // Check if any special text needs coloring
    for (const [key, color] of Object.entries(colorMap)) {
      if (text.includes(key)) {
        const parts = text.split(key)
        return (
          <>
            {parts[0]}
            <span style={{ color }}>{key}</span>
            {parts[1]}
          </>
        )
      }
    }
    
    return text
  }

  const bootLines = [
    "    /\\_/\\",
    "   ( -.- )  [accessing blockchain...]",
    "    > ^ ",
    " ──────────────────────────",
    "",
    " __  __ _                 _                          _",
    "|  \\/  (_)_ __ ___  _ __ | | ___  ___ ___  ___  _ __| |_",
    "| |\\/| | | '_ ` _ \\| '_ \\| |/ _ \\/ __/ __|/ _ \\| '__| __|",
    "| |  | | | | | | | | |_) | |  __/\\__ \\__ \\  __/| |  | |_",
    "|_|  |_|_|_| |_| |_| .__/|_|\\___||___/___/\\___||_|   \\__|",
    "                   |_|",
    "        MICROSCALERS.AI  —  trusted compute brokerage",
    "",
    "→ docs.microscalers.eth.limo",
    "→ members.microscalers.eth.limo", 
    "→ dev.microscalers.eth.limo",
    "",
    "[ booting microscalers node... ]",
    "[ connecting to Base L2... ok ✅ ]",
    "[ initializing wagmi... done ]",
    "Welcome to Microscalers CLI — type `help` to begin.",
  ]

  useEffect(() => {
    let idx = 0
    const t = setInterval(() => {
      if (idx < bootLines.length) {
        setHistory((h) => [...h, bootLines[idx]])
        idx++
      } else {
        clearInterval(t)
        setBooting(false)
      }
    }, 900)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 500)
    return () => clearInterval(t)
  }, [])

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight)
  }, [history])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cli-history", JSON.stringify(history))
    } catch (error) {
      console.warn("Failed to save CLI history to localStorage:", error)
    }
  }, [history])

  const handleConnect = useCallback(async () => {
    try {
      const injected = connectors.find(c => (c as any).type === 'injected') ?? connectors[0]
      if (!injected) {
        setHistory(prev => [...prev, 'No wallet connector available'])
        return
      }
      await connect({ connector: injected })
      setHistory(prev => [...prev, 'Connecting wallet … ok ✅'])
    } catch (err) {
      setHistory(prev => [...prev, 'Connect failed'])
    }
  }, [connect, connectors])

  const handleDisconnect = useCallback(() => {
    disconnect()
    setHistory(prev => [...prev, 'Wallet disconnected.'])
  }, [disconnect])

  const handleSwitchBase = useCallback(() => {
    switchChain({ chainId: base.id })
    setHistory(prev => [...prev, 'Switched network → Base L2'])
  }, [switchChain])

  const handleCommand = useCallback((cmd: string) => {
    let output = ""
    const clean = cmd.trim().toLowerCase()

    // Add to history with limit (keep last 100 commands)
    setHistory(prev => {
      const newHistory = [...prev, `$ ${cmd}`]
      return newHistory.length > 100 ? newHistory.slice(-100) : newHistory
    })

    switch (clean) {
      case "help":
        output =
          "Available commands:\nhelp, join, provide, status, connect, disconnect, whoami, chain, switch base, clear, clear-history, version\n\nPortal commands:\nopen docs, open members, open dev, open ens\n\nAPI commands:\napi, curl, quickstart, api-cli"
        break
      case "join":
        output = "→ Opening membership flow ($29 USDC)..."
        onJoin?.()
        
        // Send Discord webhook notification
        if (isConnected && address && chain) {
          notifyJoinCommand(address, chain.id).catch(error => {
            console.warn('Failed to send Discord notification:', error)
          })
        }
        break
      case "provide":
      case "provide-compute":
        output = "→ Opening provider registration flow..."
        
        // Send Discord webhook notification
        if (isConnected && address && chain) {
          notifyProvideCommand(address, chain.id).catch(error => {
            console.warn('Failed to send Discord notification:', error)
          })
        }
        break
      case "status":
        output =
          "Rigs 32 • Scalers 265+ • VRAM 128 GB cluster • Network Base L2"
        break
      case "connect":
        void handleConnect()
        return
      case "disconnect":
        handleDisconnect()
        return
      case "whoami":
        const who = isConnected && address ? `${address}` : 'guest@microscalers.eth'
        output = who
        break
      case "chain":
        const info = chain ? `${chain.name} (id=${chain.id})` : 'not connected'
        output = `Active chain: ${info}`
        break
      case "switch base":
        handleSwitchBase()
        return
      case "version":
        output = "Microscalers CLI v1.1.1"
        break
      case "clear":
        setHistory([])
        return
      case "clear-history":
        setHistory(bootLines)
        output = "Command history cleared"
        break
      case "open docs":
        output = "Opening docs → https://docs.microscalers.eth.limo"
        window.open("https://docs.microscalers.eth.limo", "_blank")
        break
      case "open members":
        output = "Opening members portal → https://members.microscalers.eth.limo"
        window.open("https://members.microscalers.eth.limo", "_blank")
        break
      case "open dev":
        output = "Opening dev portal → https://dev.microscalers.eth.limo"
        window.open("https://dev.microscalers.eth.limo", "_blank")
        break
      case "open ens":
        output = "Opening microscalers.eth ENS root → https://microscalers.eth.limo"
        window.open("https://microscalers.eth.limo", "_blank")
        break
      case "api":
      case "curl":
        output = `Microscalers API Commands:

# Quick start - check cluster status
curl https://api.microscalers.eth.limo/v1/status

# List available rigs
curl -X GET https://api.microscalers.eth.limo/v1/rigs

# Request compute (requires auth)
curl -X POST https://api.microscalers.eth.limo/v1/compute \\
  -H "Authorization: Bearer YOUR_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"gpu_type": "RTX5090", "duration": 3600, "memory": "24GB"}'

# Get your account info
curl -X GET https://api.microscalers.eth.limo/v1/account \\
  -H "Authorization: Bearer YOUR_TOKEN"

# Monitor job status
curl -X GET https://api.microscalers.eth.limo/v1/jobs/JOB_ID \\
  -H "Authorization: Bearer YOUR_TOKEN"

# Get pricing
curl -X GET https://api.microscalers.eth.limo/v1/pricing

# WebSocket for real-time updates
wss://api.microscalers.eth.limo/v1/stream

Ready to integrate with your workflow! 🚀`
        break
      case "quickstart":
        output = `# Copy-paste this into your terminal:
curl https://api.microscalers.eth.limo/v1/status

# Or with jq for pretty output:
curl -s https://api.microscalers.eth.limo/v1/status | jq .

# Get rig availability:
curl -s https://api.microscalers.eth.limo/v1/rigs | jq '.rigs[] | {id, gpu_type, status, price_per_hour}'

Ready to build! 🚀`
        break
      case "api-cli":
        output = `# Microscalers CLI API (Cloudflare Worker):
curl -s https://api.microscalers.ai/cli?cmd=help

# Available commands:
curl -s https://api.microscalers.ai/cli?cmd=docs
curl -s https://api.microscalers.ai/cli?cmd=members
curl -s https://api.microscalers.ai/cli?cmd=dev
curl -s https://api.microscalers.ai/cli?cmd=blocks
curl -s https://api.microscalers.ai/cli?cmd=join

# Works with any terminal or browser!`
        break
      default:
        output = `Command not found: ${cmd}`
    }

    if (output) {
      setHistory(prev => [...prev, output])
    }
  }, [onJoin, isConnected, address, chain, handleConnect, handleDisconnect, handleSwitchBase])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    handleCommand(input)
    setInput("")
  }, [input, handleCommand])

  useEffect(() => {
    if (!booting) inputRef.current?.focus()
  }, [booting])

  return (
    <div
      style={{
        width: "90%",
        maxWidth: "1000px",
        minHeight: "300px",
        backgroundColor: "#000",
        color: "#FFFFFF",
        border: "1px solid #00FF99",
        borderRadius: "8px",
        padding: "2rem",
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "18px",
        lineHeight: 1.6,
        overflowY: "auto",
      }}
      ref={terminalRef}
      onClick={() => !booting && inputRef.current?.focus()}
    >
      {history.map((line, i) => (
        <pre key={i} style={{ margin: 0, whiteSpace: "pre-wrap" }}>
          {renderColoredText(line || '')}
        </pre>
      ))}

      {!booting && (
        <form onSubmit={handleSubmit}>
          <span style={{ color: "#00FF99" }}>$ </span>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isSwitching}
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "#FFFFFF",
              fontFamily: "inherit",
              fontSize: "18px",
              width: "80%",
            }}
          />
          <span
            style={{
              opacity: cursorVisible ? 1 : 0,
              color: "#00FF99",
              fontWeight: "bold",
            }}
          >
            █
          </span>
        </form>
      )}
    </div>
  )
}