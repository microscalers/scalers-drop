export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url)
    const cmd = (url.searchParams.get("cmd") || "").toLowerCase()

    // ANSI colors for terminals
    const green = "\x1b[32m"
    const white = "\x1b[37m"
    const reset = "\x1b[0m"

    const header = `
${white}
 __  __ _                 _                          _
|  \\/  (_)_ __ ___  _ __ | | ___  ___ ___  ___  _ __| |_
| |\\/| | | '_ \` _ \\| '_ \\| |/ _ \\/ __/ __|/ _ \\| '__| __|
| |  | | | | | | | | |_) | |  __/\\__ \\__ \\  __/| |  | |_
|_|  |_|_|_| |_| |_| .__/|_|\\___||___/___/\\___||_|   \\__|
                   |_|${reset}
        ${green}microscalers.eth  —  trusted compute brokerage${reset}

`

    let output = ""
    switch (cmd) {
      case "help":
        output =
          "Commands:\n  docs, members, dev, blocks, join\nExample:\n  curl -s https://api.microscalers.ai/cli?cmd=docs"
        break
      case "docs":
        output = `${green}→ docs${reset}  https://docs.microscalers.eth.limo`
        break
      case "members":
        output = `${green}→ members${reset}  https://members.microscalers.eth.limo`
        break
      case "dev":
        output = `${green}→ dev${reset}  https://dev.microscalers.eth.limo`
        break
      case "blocks":
        output = `${green}→ blocks${reset}  https://catchain.microscalers.eth.limo`
        break
      case "join":
        output = `${green}→ join${reset}  https://members.microscalers.eth.limo/join`
        break
      default:
        output = `${white}Microscalers CLI v1.2.0${reset}
Unknown command: ${green}${cmd || "(none)"}${reset}
Try: ${green}help${reset}`
    }

    return new Response(header + output + "\n", {
      headers: {
        "content-type": "text/plain; charset=utf-8",
      },
    })
  },
}