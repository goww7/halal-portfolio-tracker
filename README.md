<p align="center">
  <h1 align="center">Halal Portfolio Tracker</h1>
  <p align="center"><strong>Open-source Shariah-compliance tracker for your stock portfolio.</strong></p>
</p>

<p align="center">
  <a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="MIT License"></a>
  <a href="https://nextjs.org"><img src="https://img.shields.io/badge/Next.js-14-black?logo=next.js" alt="Next.js 14"></a>
  <a href="https://halalterminal.com"><img src="https://img.shields.io/badge/HalalTerminal-API-10b981" alt="Halal Terminal API"></a>
</p>

<p align="center">
  <a href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgoww7%2Fhalal-portfolio-tracker&env=HALAL_TERMINAL_API_KEY&envDescription=Free%20key%20at%20halalterminal.com&envLink=https%3A%2F%2Fhalalterminal.com">
    <img src="https://vercel.com/button" alt="Deploy with Vercel" />
  </a>
</p>

---

Enter your stock holdings → get per-stock Shariah compliance, portfolio-level halal %, and purification owed. No signup, no tracking, MIT-licensed.

## Features

- **Per-holding badges** — ✅ Halal / ❌ Non-compliant / ⚠️ Review, with the methodology used
- **Portfolio summary** — total value, compliant %, and estimated purification owed
- **Live prices** — pulled from the same API call, so values reflect today
- **Self-hostable** — Next.js 14 App Router, deploys to Vercel in 30 seconds
- **No database, no auth** — your portfolio never leaves your browser session

---

## One-click deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fgoww7%2Fhalal-portfolio-tracker&env=HALAL_TERMINAL_API_KEY&envDescription=Free%20key%20at%20halalterminal.com&envLink=https%3A%2F%2Fhalalterminal.com)

You'll be prompted for `HALAL_TERMINAL_API_KEY` — grab a [free key here](https://halalterminal.com) (500 tokens/month, no credit card).

---

## Run locally

```bash
git clone https://github.com/goww7/halal-portfolio-tracker.git
cd halal-portfolio-tracker
npm install
cp .env.example .env.local
# add HALAL_TERMINAL_API_KEY=ht_...
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## How it works

1. The browser posts your holdings to `/api/scan`.
2. The route handler calls Halal Terminal's `/api/portfolio/scan` and `/api/quotes/batch` in parallel.
3. We compute compliant %, total value, and purification owed from the merged response.

The API key stays on the server — it is never exposed to the browser.

---

## Configuration

| Env var | Required | Description |
|---|---|---|
| `HALAL_TERMINAL_API_KEY` | yes | Free key at [halalterminal.com](https://halalterminal.com) |
| `HALAL_API_BASE` | no | Override the API base URL (default: `https://api.halalterminal.com`) |

---

## Customizing

- **Branding** — edit `app/layout.tsx` and `app/page.tsx`
- **Methodology display** — adjust `components/ResultsTable.tsx`
- **Fields shown** — extend `lib/halal.ts` with additional endpoints (zakat, news, ETF screening) — see the [API docs](https://halalterminal.com)

---

## Disclaimer

Automated screening output, **not a fatwa**. Consult a qualified scholar for personal rulings. The purification estimate uses the methodology returned by the API and is provided as a starting point.

---

## Learn more

- [Halal ETF analysis](https://www.halalterminal.com/research/halal-etf-analysis)
- [Is my stock halal? Screener](https://www.halalterminal.com/stocks)
- [Shariah-compliant ETFs compared (2026)](https://www.halalterminal.com/research/sharia-etf-comprehensive-analysis)
- [What is Islamic finance?](https://www.halalterminal.com/research/what-is-islamic-finance)
- [API reference](https://api.halalterminal.com/api-reference)

## Part of the Halal Terminal ecosystem

[Website](https://www.halalterminal.com) · [API](https://api.halalterminal.com/api-reference) · [Python SDK](https://github.com/goww7/halalterminal-sdk-python) · [JS SDK](https://github.com/goww7/halalterminal-sdk-js) · [MCP server](https://github.com/goww7/halalterminal-mcp) · [Claude plugin](https://github.com/goww7/halalterminal-claude-skills) · [Discord bot](https://github.com/goww7/halal-discord-bot) · [TradingView indicator](https://github.com/goww7/halal-pine)

---

## Related projects

Other open-source tools in the Halal Terminal ecosystem:

| Project | What it is |
|---|---|
| [**halal-discord-bot**](https://github.com/goww7/halal-discord-bot) | Discord bot — `/halal`, `/portfolio`, `/trending` slash commands |
| [**halal-pine**](https://github.com/goww7/halal-pine) | TradingView Pine v5 indicator with daily-refreshed compliance data |
| [**halalterminal-claude-skills**](https://github.com/goww7/halalterminal-claude-skills) | Claude Code plugin with screening skills + portfolio-builder subagent |
| [**halalterminal-mcp**](https://github.com/goww7/halalterminal-mcp) | MCP server for any MCP-compatible client (Cursor, Cline, Codex…) |
| [**yassir-oss**](https://github.com/goww7/yassir-oss) | Open-source ReAct agent for financial research |

---

## License

MIT — see [LICENSE](LICENSE).

<p align="center"><sub>Built on top of <a href="https://halalterminal.com">Halal Terminal</a>.</sub></p>


---

Part of the [Halal Terminal open ecosystem](https://github.com/goww7/awesome-islamic-finance):
[API](https://api.halalterminal.com) · [MCP server](https://github.com/goww7/halalterminal-mcp) · [Python SDK](https://github.com/goww7/halalterminal-sdk-python) · [JS SDK](https://github.com/goww7/halalterminal-sdk-js) · [Datasets](https://github.com/goww7/sp500-shariah-compliance) · [Awesome Islamic Finance](https://github.com/goww7/awesome-islamic-finance)
