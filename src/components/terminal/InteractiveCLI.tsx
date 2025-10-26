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

  const prompt = useMemo(() => {
    const who = isConnected && address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'guest'
    const net = chain?.name ?? 'no-net'
    return `${who}@${net}`
  }, [isConnected, address, chain?.name])

  const appendLines = useCallback((newLines: string | string[], shouldAnimate = true) => {
    const arr = Array.isArray(newLines) ? newLines : [newLines]
    const newLineObjects = arr.map(text => ({ 
      id: nextId.current++, 
      text, 
      isTyping: shouldAnimate,
      displayText: shouldAnimate ? '' : text
    }))
    
    setLines(prev => [...prev, ...newLineObjects])
    
    if (shouldAnimate) {
      setIsTyping(true)
    }
  }, [])

  // Typing animation effect
  useEffect(() => {
    if (!isTyping) return

    const typingLines = lines.filter(line => line.isTyping && line.displayText !== line.text)
    if (typingLines.length === 0) {
      setIsTyping(false)
      return
    }

    const currentLine = typingLines[0]
    const currentLength = currentLine.displayText?.length || 0
    const targetText = currentLine.text

    if (currentLength < targetText.length) {
      typingTimeoutRef.current = setTimeout(() => {
        setLines(prev => prev.map(line => 
          line.id === currentLine.id 
            ? { ...line, displayText: targetText.slice(0, currentLength + 1) }
            : line
        ))
      }, Math.random() * 50 + 20) // Random delay between 20-70ms for realistic typing
    } else {
      // This line is done typing
      setLines(prev => prev.map(line => 
        line.id === currentLine.id 
          ? { ...line, isTyping: false, displayText: targetText }
          : line
      ))
    }

    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [lines, isTyping])

  const printHelp = useCallback(() => {
    appendLines([
      'Commands:',
      '  help              Show this help',
      '  join              Open membership flow ($29 USDC)',
      '  provide           Open provider registration',
      '  status            Show cluster status',
      '  connect           Connect wallet',
      '  disconnect        Disconnect wallet',
      '  whoami            Print current account',
      '  chain             Print active chain',
      '  switch base       Switch network to Base L2',
      '  clear             Clear screen',
      '  clear-history     Clear command history',
      '  version           Print CLI version',
    ])
  }, [appendLines])

  const handleConnect = useCallback(async () => {
    try {
      const injected = connectors.find(c => (c as any).type === 'injected') ?? connectors[0]
      if (!injected) {
        appendLines('No wallet connector available')
        return
      }
      await connect({ connector: injected })
      appendLines('Connecting wallet...')
    } catch (err) {
      appendLines('Connect failed')
    }
  }, [connect, connectors, appendLines])

  const handleDisconnect = useCallback(() => {
    disconnect()
    appendLines('Disconnected')
  }, [disconnect, appendLines])

  const handleSwitchBase = useCallback(() => {
    switchChain({ chainId: base.id })
    appendLines('Switching to Base L2...')
  }, [switchChain, appendLines])

  const handleStatus = useCallback(() => {
    appendLines([
      'SCALERS STATUS:',
      '  RTX_5090_RIGS:   32',
      '  VERIFIED_SCALERS: 265+',
      '  VRAM_CLUSTER:    128GB',
    ])
  }, [appendLines])

  const handleCommand = useCallback((raw: string) => {
    const cmd = raw.trim()
    if (!cmd) return

    // Add to history with limit (keep last 100 commands)
    setHistory(prev => {
      const newHistory = [...prev, cmd]
      return newHistory.length > 100 ? newHistory.slice(-100) : newHistory
    })
    setHistoryIdx(null)
    appendLines(`$ ${cmd}`, false) // Don't animate the command input

    if (cmd === 'help') {
      printHelp()
      return
    }
    if (cmd === 'clear') {
      setLines([])
      nextId.current = 1
      return
    }
    if (cmd === 'clear-history') {
      setHistory([])
      appendLines('Command history cleared')
      return
    }
    if (cmd === 'join') {
      onJoin?.()
      appendLines('Opening JOIN_SCALERS flow...')
      
      // Send Discord webhook notification
      if (isConnected && address && chain) {
        notifyJoinCommand(address, chain.id).catch(error => {
          console.warn('Failed to send Discord notification:', error)
        })
      }
      return
    }
    if (cmd === 'provide' || cmd === 'provide-compute') {
      appendLines('Opening PROVIDE_COMPUTE flow...')
      appendLines('This will open the provider registration process')
      
      // Send Discord webhook notification
      if (isConnected && address && chain) {
        notifyProvideCommand(address, chain.id).catch(error => {
          console.warn('Failed to send Discord notification:', error)
        })
      }
      return
    }
    if (cmd === 'status') {
      handleStatus()
      return
    }
    if (cmd === 'connect') {
      void handleConnect()
      return
    }
    if (cmd === 'disconnect') {
      handleDisconnect()
      return
    }
    if (cmd === 'whoami') {
      const who = isConnected && address ? `${address}` : 'guest'
      appendLines(who)
      return
    }
    if (cmd === 'chain') {
      const info = chain ? `${chain.name} (id=${chain.id})` : 'not connected'
      appendLines(info)
      return
    }
    if (cmd === 'switch base') {
      handleSwitchBase()
      return
    }
    if (cmd === 'version') {
      appendLines('Microscalers CLI v0.1.0')
      return
    }

    appendLines(`Command not found: ${cmd}. Type "help"`)
  }, [appendLines, onJoin, handleStatus, handleConnect, handleDisconnect, isConnected, address, chain, handleSwitchBase, printHelp])

  const onSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return
    const current = input
    setInput('')
    handleCommand(current)
  }, [input, handleCommand])

  const onKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHistoryIdx((idx) => {
        const next = idx === null ? history.length - 1 : Math.max(0, idx - 1)
        const val = history[next]
        if (val !== undefined) setInput(val)
        return next
      })
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHistoryIdx((idx) => {
        if (idx === null) return null
        const next = Math.min(history.length - 1, idx + 1)
        const val = history[next]
        if (val !== undefined) setInput(val)
        return next
      })
    }
  }, [history])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  useEffect(() => {
    if (connectStatus === 'error' && connectError) {
      appendLines('Wallet connect error')
    }
  }, [connectStatus, connectError, appendLines])

  // Save history to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cli-history", JSON.stringify(history))
    } catch (error) {
      console.warn("Failed to save CLI history to localStorage:", error)
    }
  }, [history])

  // Cleanup typing timeout on unmount
  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div style={{
      border: "1px solid #00FF99",
      backgroundColor: "rgba(0, 255, 153, 0.1)",
      borderRadius: "8px",
      marginBottom: "1rem",
      width: "100%",
      maxWidth: "800px"
    }}>
      <style>{`
        @keyframes blink {
          0%, 50% { opacity: 1; }
          51%, 100% { opacity: 0; }
        }
      `}</style>
      <div 
        ref={scrollRef} 
        style={{
          height: "240px",
          overflow: "auto",
          padding: "1rem",
          fontSize: "14px",
          color: "#00FF99",
          fontFamily: "JetBrains Mono, monospace",
          lineHeight: "1.4"
        }}
      >
        {lines.map(line => (
          <div key={line.id} style={{ whiteSpace: "pre-wrap", marginBottom: "0.25rem" }}>
            {line.displayText || line.text}
            {line.isTyping && (
              <span style={{ 
                animation: "blink 1s infinite",
                color: "#00FF99",
                fontWeight: "bold"
              }}>
                _
              </span>
            )}
          </div>
        ))}
      </div>
      <form 
        onSubmit={onSubmit} 
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          borderTop: "1px solid #00FF99",
          padding: "0.75rem",
          backgroundColor: "rgba(0, 0, 0, 0.3)"
        }}
      >
        <span style={{ 
          color: "#00FF99", 
          fontSize: "12px",
          fontFamily: "JetBrains Mono, monospace",
          fontWeight: "bold"
        }}>
          {prompt}$
        </span>
        <input
          ref={inputRef}
          aria-label="CLI input"
          style={{
            flex: 1,
            backgroundColor: "transparent",
            outline: "none",
            border: "none",
            color: "#00FF99",
            fontFamily: "JetBrains Mono, monospace",
            fontSize: "14px"
          }}
          placeholder="type 'help'"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          disabled={isSwitching}
        />
      </form>
    </div>
  )
})
