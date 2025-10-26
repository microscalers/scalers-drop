// Discord webhook integration for broker ops
const DISCORD_WEBHOOK_URL = import.meta.env.VITE_DISCORD_WEBHOOK_URL

export interface DiscordWebhookData {
  content?: string
  embeds?: Array<{
    title: string
    description: string
    color: number
    fields?: Array<{
      name: string
      value: string
      inline?: boolean
    }>
    timestamp?: string
  }>
}

export async function sendDiscordWebhook(data: DiscordWebhookData): Promise<boolean> {
  if (!DISCORD_WEBHOOK_URL) {
    console.warn('Discord webhook URL not configured')
    return false
  }

  try {
    const response = await fetch(DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      console.error('Discord webhook failed:', response.status, response.statusText)
      return false
    }

    return true
  } catch (error) {
    console.error('Discord webhook error:', error)
    return false
  }
}

export async function notifyJoinCommand(userAddress: string, chainId: number): Promise<void> {
  const data: DiscordWebhookData = {
    content: '🚀 **New Scaler Join Request**',
    embeds: [{
      title: 'JOIN_SCALERS() Command Executed',
      description: 'A user has initiated the join flow for Microscalers membership',
      color: 0x00ff99, // Green color matching the theme
      fields: [
        {
          name: 'User Address',
          value: `\`${userAddress}\``,
          inline: true
        },
        {
          name: 'Network',
          value: `Chain ID: ${chainId}`,
          inline: true
        },
        {
          name: 'Membership Cost',
          value: '$29 USDC',
          inline: true
        },
        {
          name: 'Status',
          value: '⏳ Pending Payment',
          inline: false
        }
      ],
      timestamp: new Date().toISOString()
    }]
  }

  await sendDiscordWebhook(data)
}

export async function notifyProvideCommand(userAddress: string, chainId: number): Promise<void> {
  const data: DiscordWebhookData = {
    content: '⚡ **New Compute Provider**',
    embeds: [{
      title: 'PROVIDE_COMPUTE() Command Executed',
      description: 'A user has initiated the provider flow to offer compute resources',
      color: 0x00ccff, // Blue color for providers
      fields: [
        {
          name: 'Provider Address',
          value: `\`${userAddress}\``,
          inline: true
        },
        {
          name: 'Network',
          value: `Chain ID: ${chainId}`,
          inline: true
        },
        {
          name: 'Provider Type',
          value: 'GPU Compute',
          inline: true
        },
        {
          name: 'Status',
          value: '⏳ Awaiting Verification',
          inline: false
        }
      ],
      timestamp: new Date().toISOString()
    }]
  }

  await sendDiscordWebhook(data)
}