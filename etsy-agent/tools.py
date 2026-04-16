"""
Tool definitions and implementations for the GlitterGameDay Etsy agent.
Each tool is a plain Python function; the TOOL_SCHEMAS list provides the
JSON schemas that are passed to the Claude API for tool-use.
"""

from __future__ import annotations

import json
import datetime
from typing import Any

from etsy_client import EtsyClient


# ---------------------------------------------------------------------------
# Tool schemas (sent to Claude API)
# ---------------------------------------------------------------------------

TOOL_SCHEMAS: list[dict] = [
    {
        "name": "get_shop_overview",
        "description": (
            "Fetch high-level shop information: title, announcement, "
            "policies, and recent stats (visits, revenue) for the last "
            "6 months."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "get_listings",
        "description": (
            "Return a list of active listings with title, tags, price, "
            "views, and favourites. Use offset for pagination (25 per page)."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "offset": {
                    "type": "integer",
                    "description": "Number of listings to skip (default 0).",
                    "default": 0,
                }
            },
            "required": [],
        },
    },
    {
        "name": "get_listing_detail",
        "description": "Get full details for a single listing including description and tags.",
        "input_schema": {
            "type": "object",
            "properties": {
                "listing_id": {
                    "type": "integer",
                    "description": "The Etsy listing ID.",
                }
            },
            "required": ["listing_id"],
        },
    },
    {
        "name": "optimize_listing_seo",
        "description": (
            "Analyse a listing's current title, tags, and description, then "
            "return an improved title (max 140 chars), up to 13 SEO tags, "
            "and an improved description opening paragraph."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "listing_id": {
                    "type": "integer",
                    "description": "The Etsy listing ID to optimise.",
                }
            },
            "required": ["listing_id"],
        },
    },
    {
        "name": "update_listing_seo",
        "description": "Apply a new title and tags to a listing.",
        "input_schema": {
            "type": "object",
            "properties": {
                "listing_id": {
                    "type": "integer",
                    "description": "The Etsy listing ID.",
                },
                "title": {
                    "type": "string",
                    "description": "New listing title (max 140 chars).",
                },
                "tags": {
                    "type": "array",
                    "items": {"type": "string"},
                    "description": "Up to 13 SEO tags (each max 20 chars).",
                },
                "description": {
                    "type": "string",
                    "description": "Optional updated listing description.",
                },
            },
            "required": ["listing_id", "title", "tags"],
        },
    },
    {
        "name": "generate_social_content",
        "description": (
            "Generate a week's worth of social media posts for a given "
            "platform (instagram, tiktok, pinterest, facebook) promoting "
            "the GlitterGameDay store. Returns 7 post ideas with captions "
            "and hashtags."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "platform": {
                    "type": "string",
                    "enum": ["instagram", "tiktok", "pinterest", "facebook"],
                    "description": "Social media platform.",
                },
                "theme": {
                    "type": "string",
                    "description": (
                        "Optional focus theme, e.g. 'Super Bowl', "
                        "'March Madness', 'tailgate season'."
                    ),
                },
            },
            "required": ["platform"],
        },
    },
    {
        "name": "get_sales_report",
        "description": (
            "Return a summary of recent sales: number of orders, total "
            "revenue, top-selling items, and average order value."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "days": {
                    "type": "integer",
                    "description": "Look-back window in days (default 30).",
                    "default": 30,
                }
            },
            "required": [],
        },
    },
    {
        "name": "get_reviews_summary",
        "description": (
            "Fetch recent reviews and return a sentiment summary plus any "
            "recurring complaints or praise that could inform product/copy "
            "improvements."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "get_traffic_strategy",
        "description": (
            "Return the full traffic-driving strategy document with "
            "traditional and non-traditional methods, prioritised action "
            "plan, and monthly revenue roadmap to reach $2 000/month."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
    {
        "name": "generate_content_calendar",
        "description": (
            "Create a 30-day content/marketing calendar aligned with "
            "upcoming sports events and seasonal trends for the "
            "GlitterGameDay niche."
        ),
        "input_schema": {
            "type": "object",
            "properties": {
                "month": {
                    "type": "integer",
                    "description": "Target month (1-12). Defaults to current month.",
                },
                "year": {
                    "type": "integer",
                    "description": "Target year. Defaults to current year.",
                },
            },
            "required": [],
        },
    },
    {
        "name": "pricing_analysis",
        "description": (
            "Analyse current listing prices against comparable Etsy "
            "listings and suggest price adjustments to improve conversion "
            "rate while maintaining the $2 000/month revenue target."
        ),
        "input_schema": {
            "type": "object",
            "properties": {},
            "required": [],
        },
    },
]


# ---------------------------------------------------------------------------
# Tool implementations
# ---------------------------------------------------------------------------

def get_shop_overview(client: EtsyClient) -> str:
    try:
        shop = client.get_shop()
        stats = client.get_shop_stats(unit="month", limit=6)
        name = shop.get("shop_name", "GlitterGameDay")
        title = shop.get("title", "")
        announcement = shop.get("announcement", "")[:300]
        stat_rows = []
        for s in stats.get("results", []):
            stat_rows.append(
                f"  {s.get('date','?')}: {s.get('visits', 0)} visits, "
                f"${s.get('revenue', {}).get('amount', 0) / 100:.2f} revenue"
            )
        return (
            f"Shop: {name}\nTitle: {title}\nAnnouncement: {announcement}\n\n"
            f"Monthly stats (last 6 months):\n" + "\n".join(stat_rows)
        )
    except Exception as exc:
        return f"[Etsy API error – running in demo mode]\n{exc}\n\nShop: GlitterGameDay | Glitter game-day merchandise and custom fan gear."


def get_listings(client: EtsyClient, offset: int = 0) -> str:
    try:
        data = client.get_listings(limit=25, offset=offset)
        rows = []
        for listing in data.get("results", []):
            rows.append(
                f"ID {listing['listing_id']}: {listing['title'][:60]} | "
                f"${listing['price']['amount'] / listing['price']['divisor']:.2f} | "
                f"Views: {listing.get('views', 0)} | "
                f"Tags: {', '.join(listing.get('tags', []))}"
            )
        return "\n".join(rows) or "No listings found."
    except Exception as exc:
        return f"[Demo mode – API unavailable]\nExample listing:\nID 1234567: Glitter Game Day Tumbler - Custom NFL Team | $28.00 | Views: 342 | Tags: game day, glitter tumbler, custom tumbler"


def get_listing_detail(client: EtsyClient, listing_id: int) -> str:
    try:
        listing = client.get_listing(listing_id)
        return json.dumps({
            "id": listing["listing_id"],
            "title": listing["title"],
            "description": listing.get("description", "")[:500],
            "tags": listing.get("tags", []),
            "price": listing["price"]["amount"] / listing["price"]["divisor"],
            "views": listing.get("views", 0),
            "num_favorers": listing.get("num_favorers", 0),
        }, indent=2)
    except Exception as exc:
        return f"[Demo mode]\nListing {listing_id}: Could not fetch – {exc}"


def optimize_listing_seo(client: EtsyClient, listing_id: int) -> str:
    """
    Returns SEO improvement suggestions.
    In production the agent itself generates these; this tool fetches
    the raw data so the model can reason over it.
    """
    detail = get_listing_detail(client, listing_id)
    return (
        f"Current listing data for SEO analysis:\n{detail}\n\n"
        "Please analyse the title, tags, and description above and "
        "suggest: (1) an improved 140-char title with primary keyword first, "
        "(2) 13 long-tail SEO tags, (3) an improved first paragraph for the "
        "description that includes the primary keyword naturally."
    )


def update_listing_seo(
    client: EtsyClient,
    listing_id: int,
    title: str,
    tags: list[str],
    description: str | None = None,
) -> str:
    updates: dict[str, Any] = {"title": title[:140], "tags": tags[:13]}
    if description:
        updates["description"] = description
    try:
        client.update_listing(listing_id, updates)
        return f"Listing {listing_id} updated successfully."
    except Exception as exc:
        return f"[Demo mode – update not applied]\nWould have set:\nTitle: {title}\nTags: {tags}\nError: {exc}"


def generate_social_content(
    platform: str,
    theme: str | None = None,
) -> str:
    theme_note = f" with a focus on '{theme}'" if theme else ""
    return (
        f"Generating 7-day {platform.upper()} content calendar{theme_note} "
        f"for GlitterGameDay.\n\n"
        "This prompt is forwarded to the model for content generation. "
        "The agent will produce posts optimised for the platform's "
        "algorithm and the game-day / sports-fan audience."
    )


def get_sales_report(client: EtsyClient, days: int = 30) -> str:
    try:
        receipts = client.get_receipts(was_paid=True, limit=100)
        cutoff = datetime.datetime.utcnow() - datetime.timedelta(days=days)
        total_revenue = 0.0
        order_count = 0
        item_counts: dict[str, int] = {}
        for r in receipts.get("results", []):
            created = datetime.datetime.utcfromtimestamp(r.get("create_timestamp", 0))
            if created < cutoff:
                continue
            order_count += 1
            total_revenue += r.get("grandtotal", {}).get("amount", 0) / 100
            for txn in r.get("transactions", []):
                title = txn.get("title", "Unknown")[:40]
                item_counts[title] = item_counts.get(title, 0) + 1
        top_items = sorted(item_counts.items(), key=lambda x: x[1], reverse=True)[:5]
        avg = total_revenue / order_count if order_count else 0
        return (
            f"Sales report – last {days} days:\n"
            f"  Orders: {order_count}\n"
            f"  Revenue: ${total_revenue:.2f}\n"
            f"  Avg order value: ${avg:.2f}\n"
            f"  Top sellers:\n" +
            "".join(f"    {t}: {c} sold\n" for t, c in top_items)
        )
    except Exception as exc:
        return (
            f"[Demo mode]\nSales report – last {days} days:\n"
            "  Orders: 18\n  Revenue: $504.00\n  Avg order value: $28.00\n"
            "  Top sellers:\n    Glitter Tumbler NFL Custom: 7 sold\n"
            "    Game Day Shirt Rhinestone: 4 sold\n    Glitter Hat Custom Team: 3 sold"
        )


def get_reviews_summary(client: EtsyClient) -> str:
    try:
        data = client.get_reviews(limit=50)
        reviews = data.get("results", [])
        if not reviews:
            return "No reviews found."
        scores = [r.get("rating", 0) for r in reviews]
        avg = sum(scores) / len(scores)
        five_star = sum(1 for s in scores if s == 5)
        comments = [r.get("review", "") for r in reviews if r.get("review")][:10]
        return (
            f"Reviews summary ({len(reviews)} total):\n"
            f"  Average rating: {avg:.1f}/5\n"
            f"  5-star: {five_star}/{len(reviews)}\n"
            f"  Sample comments:\n" +
            "".join(f"  - {c[:120]}\n" for c in comments)
        )
    except Exception as exc:
        return (
            "[Demo mode]\nReviews summary:\n"
            "  Average rating: 4.9/5\n  5-star: 48/50\n"
            "  Common praise: fast shipping, beautiful glitter, exactly as pictured\n"
            "  Occasional notes: packaging could be sturdier for longer shipments"
        )


def get_traffic_strategy() -> str:
    """Read and return the traffic_plan.md document."""
    import pathlib
    plan_path = pathlib.Path(__file__).parent / "strategies" / "traffic_plan.md"
    if plan_path.exists():
        return plan_path.read_text()
    return "Traffic plan not found. Run the agent setup to generate it."


def generate_content_calendar(
    month: int | None = None,
    year: int | None = None,
) -> str:
    now = datetime.date.today()
    month = month or now.month
    year = year or now.year
    month_name = datetime.date(year, month, 1).strftime("%B %Y")
    return (
        f"Generating 30-day content & marketing calendar for {month_name}.\n\n"
        "The agent will map out:\n"
        "  • Sports events that month (NFL, NBA, MLB, NCAA, etc.)\n"
        "  • Etsy sale/promotion timing\n"
        "  • Social media posting schedule (IG, TikTok, Pinterest, FB)\n"
        "  • Email newsletter dates\n"
        "  • Pinterest board update schedule\n"
        "  • New listing launch dates\n"
    )


def pricing_analysis(client: EtsyClient) -> str:
    try:
        data = client.get_listings(limit=25)
        prices = []
        for listing in data.get("results", []):
            prices.append(listing["price"]["amount"] / listing["price"]["divisor"])
        avg_price = sum(prices) / len(prices) if prices else 0
        return (
            f"Pricing analysis ({len(prices)} active listings):\n"
            f"  Average price: ${avg_price:.2f}\n"
            f"  Price range: ${min(prices):.2f} – ${max(prices):.2f}\n\n"
            "Forwarding to model for competitive analysis and recommendations."
        )
    except Exception as exc:
        return (
            "[Demo mode]\nPricing analysis:\n"
            "  Average price: $26.50\n  Range: $8.00 – $65.00\n"
            "  Comparable Etsy stores avg: $24–$35 for custom glitter tumblers\n"
            "  Recommendation: mid-range prices are competitive; "
            "consider $5 bundles to raise avg order value."
        )


# ---------------------------------------------------------------------------
# Dispatcher – called by agent.py to execute tool calls
# ---------------------------------------------------------------------------

def dispatch(
    tool_name: str,
    tool_input: dict,
    client: EtsyClient,
) -> str:
    """Route a tool call from the Claude API to the right function."""
    match tool_name:
        case "get_shop_overview":
            return get_shop_overview(client)
        case "get_listings":
            return get_listings(client, offset=tool_input.get("offset", 0))
        case "get_listing_detail":
            return get_listing_detail(client, tool_input["listing_id"])
        case "optimize_listing_seo":
            return optimize_listing_seo(client, tool_input["listing_id"])
        case "update_listing_seo":
            return update_listing_seo(
                client,
                listing_id=tool_input["listing_id"],
                title=tool_input["title"],
                tags=tool_input["tags"],
                description=tool_input.get("description"),
            )
        case "generate_social_content":
            return generate_social_content(
                platform=tool_input["platform"],
                theme=tool_input.get("theme"),
            )
        case "get_sales_report":
            return get_sales_report(client, days=tool_input.get("days", 30))
        case "get_reviews_summary":
            return get_reviews_summary(client)
        case "get_traffic_strategy":
            return get_traffic_strategy()
        case "generate_content_calendar":
            return generate_content_calendar(
                month=tool_input.get("month"),
                year=tool_input.get("year"),
            )
        case "pricing_analysis":
            return pricing_analysis(client)
        case _:
            return f"Unknown tool: {tool_name}"
