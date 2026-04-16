# GlitterGameDay Etsy Store Agent

A Claude-powered AI agent that manages [glittergameday.etsy.com](https://glittergameday.etsy.com) — handling SEO optimisation, sales analysis, social media content generation, and traffic growth toward the **$2,000/month revenue goal**.

---

## Quick Start

### 1. Install dependencies
```bash
cd etsy-agent
pip install -r requirements.txt
```

### 2. Set up credentials
```bash
cp .env.example .env
# Edit .env and fill in your keys
```

**Required credentials:**
| Variable | Where to get it |
|----------|----------------|
| `ANTHROPIC_API_KEY` | [console.anthropic.com](https://console.anthropic.com) |
| `ETSY_API_KEY` | [etsy.com/developers](https://www.etsy.com/developers/register) |
| `ETSY_ACCESS_TOKEN` | Etsy OAuth2 flow (see below) |
| `ETSY_SHOP_ID` | Etsy Shop Manager → Settings → Info & Appearance |

### 3. Load environment variables
```bash
export $(cat .env | xargs)
# or use: source .env (if you add 'export' to each line)
```

### 4. Run the agent
```bash
# Interactive chat mode
python agent.py

# Quick-start tasks (recommended starting points)
python agent.py --task seo        # Audit listings and improve SEO
python agent.py --task sales      # 30-day sales report + gap analysis
python agent.py --task social     # Generate a week of Instagram content
python agent.py --task strategy   # Full traffic plan + 90-day roadmap
python agent.py --task calendar   # Next month's content calendar
python agent.py --task pricing    # Pricing analysis
python agent.py --task reviews    # Review summary and insights

# One-shot questions
python agent.py "What should I post on TikTok this week?"
python agent.py "How many orders do I need per day to hit $2000 this month?"
python agent.py --verbose --task seo   # See tool calls + reasoning
```

---

## What the Agent Can Do

| Capability | Command |
|-----------|---------|
| Etsy SEO audit — title, tags, description improvements | `--task seo` |
| Sales report + revenue gap analysis | `--task sales` |
| 7-day Instagram/TikTok/Pinterest content calendar | `--task social` |
| Full traffic strategy (traditional + non-traditional) | `--task strategy` |
| 30-day content/sports event marketing calendar | `--task calendar` |
| Pricing analysis and recommendations | `--task pricing` |
| Review sentiment analysis | `--task reviews` |
| Interactive Q&A about your store | `python agent.py` |

---

## Etsy OAuth2 Setup

The Etsy Open API v3 requires OAuth2 authentication to read/write your shop.

1. **Register your app** at [etsy.com/developers/register](https://www.etsy.com/developers/register)
2. Set the redirect URI to `http://localhost:3003`
3. Request these scopes: `listings_r listings_w shops_r transactions_r`
4. Run the OAuth2 flow to obtain an access token
5. Paste the access token into your `.env` file

> **Demo mode:** If Etsy credentials are missing or invalid, the agent runs in demo mode with sample data so you can still test all features.

---

## File Structure

```
etsy-agent/
├── agent.py              # Main Claude-powered agent (entry point)
├── etsy_client.py        # Etsy Open API v3 client
├── tools.py              # Tool definitions and implementations
├── strategies/
│   └── traffic_plan.md   # Full traffic strategy document
├── requirements.txt
├── .env.example
└── README.md
```

---

## Revenue Roadmap

| Phase | Weeks | Focus | Est. Monthly Revenue |
|-------|-------|-------|----------------------|
| Foundation | 1–2 | SEO audit + listing refresh | +20% from baseline |
| Growth | 3–8 | Pinterest + TikTok launch | $500–$900 |
| Scale | 9–16 | Ads + influencer gifting + email | $1,200–$1,600 |
| Goal | 17+ | Seasonal peaks + bundles | $2,000+ |

Run `python agent.py --task strategy` for the complete 90-day action plan.

---

## Traffic Strategy Summary

**Traditional:** Etsy SEO, Etsy Ads, Pinterest, Email marketing, Facebook Groups, Seasonal sales

**Non-traditional:** TikTok process videos, Sorority bulk orders, Micro-influencer gifting, Sports Reddit communities, YouTube tutorials, Game-day pop-ups, Local boutique wholesale

See `strategies/traffic_plan.md` for the full breakdown.
