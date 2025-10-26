import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useAccount, useConnect, useDisconnect, useSwitchChain } from 'wagmi'
import { base } from 'wagmi/chains'
import { notifyJoinCommand, notifyProvideCommand } from '../../lib/discord'

export type InteractiveCLIProps = {
  onJoin?: () => void
}

export const InteractiveCLI = memo(function InteractiveCLI({ onJoin }: InteractiveCLIProps) {
  const { address, isConnected, chain } = useAccount()
  const { connect, connectors, status: connectStatus, error: connectError } = useConnect()
  const { disconnect } = useDisconnect()
  const { switchChain, isPending: isSwitching } = useSwitchChain()

  const [history, setHistory] = useState<string[]>(() => {
    // Load history from localStorage on component mount
    try {
      const saved = localStorage.getItem("cli-history")
      return saved ? JSON.parse(saved) : ['Welcome to Microscalers CLI — type `help` to begin.']
    } catch {
      return ['Welcome to Microscalers CLI — type `help` to begin.']
    }
  })
  const [input, setInput] = useState('')
  const [cursorVisible, setCursorVisible] = useState(true)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Blinking cursor effect
  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 500)
    return () => clearInterval(t)
  }, [])

  // Auto scroll to bottom
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

  // Auto focus input
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

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
        output = "Available commands:\nhelp, join, provide, status, connect, disconnect, whoami, chain, switch base, clear, clear-history, version"
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
        output = "Rigs: 32 • Scalers: 265+ • VRAM: 128 GB cluster • Network: Base L2"
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
        output = "Microscalers CLI v1.0.0"
        break
      case "clear":
        setHistory([])
        return
      case "clear-history":
        setHistory(['Welcome to Microscalers CLI — type `help` to begin.'])
        output = "Command history cleared"
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
    setInput('')
  }, [input, handleCommand])

  // Handle arrow key navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault()
      // Could implement history navigation here if needed
    }
  }, [])

  return (
    <div
      style={{
        width: "80%",
        maxWidth: "900px",
        minHeight: "240px",
        backgroundColor: "#0a0a0a",
        color: "#00FF99",
        border: "1px solid #00FF99",
        borderRadius: "8px",
        padding: "1rem",
        fontFamily: "JetBrains Mono, monospace",
        overflowY: "auto",
      }}
      ref={terminalRef}
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((line, i) => (
        <pre key={i} style={{ margin: 0, whiteSpace: "pre-wrap" }}>
          {line}
        </pre>
      ))}

      <form onSubmit={handleSubmit}>
        <span>$ </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isSwitching}
          style={{
            background: "transparent",
            border: "none",
            outline: "none",
            color: "#00FF99",
            fontFamily: "inherit",
            fontSize: "1rem",
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
    </div>
  )
})