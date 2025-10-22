const API_URL = 'https://microscalers-api.dm-6ab.workers.dev/api'

export async function createJob(data: {
  wallet: string
  gpuType: string
  duration: number
  purpose: string
}) {
  const response = await fetch(`${API_URL}/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
  return response.json()
}

export async function getJob(jobId: string) {
  const response = await fetch(`${API_URL}/jobs/${jobId}`)
  return response.json()
}

export async function getUserJobs(wallet: string) {
  const response = await fetch(`${API_URL}/jobs?wallet=${wallet}`)
  return response.json()
}

export async function getRigs() {
  const response = await fetch(`${API_URL}/rigs`)
  return response.json()
}
