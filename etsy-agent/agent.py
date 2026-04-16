"""
GlitterGameDay Etsy Store Agent
================================
A Claude-powered agent that manages the glittergameday Etsy store.

Usage
-----
  # Interactive mode (chat with the agent):
  python agent.py

  # One-shot mode:
  python agent.py "Give me a 30-day content calendar for football season"

  # Specific tasks:
  python agent.py --task seo          # Audit and suggest SEO improvements
  python agent.py --task sales        # Sales report + revenue gap analysis
  python agent.py --task social       # Generate a week of social media content
  python agent.py --task strategy     # Print the full traffic strategy
  python agent.py --task calendar     # Generate next month's content calendar
"""

from __future__ import annotations

import os
import sys
import json
import argparse
import textwrap
from typing import Any

import anthropic

from etsy_client import client_from_env
from tools import TOOL_SCHEMAS, dispatch

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------

MODEL = "claude-opus-4-6"

SYSTEM_PROMPT = textwrap.dedent("""
    You are an expert Etsy store manager and e-commerce growth strategist
    for GlitterGameDay (glittergameday.etsy.com) — a store that sells
    glitter-themed, game-day / sports-fan merchandise such as custom
    glitter tumblers, rhinestone game-day shirts, glitter hats, and
    personalised fan accessories.

    The owner's primary goal is to reach **$2,000 per month** in Etsy
    revenue. The current estimated monthly revenue is significantly below
    that target.

    Your responsibilities:
    1. Analyse listings and suggest title/tag/description improvements for
       Etsy SEO (make sure primary keywords lead titles).
    2. Identify the best traffic-driving strategies — traditional (Etsy Ads,
       Pinterest, email) and non-traditional (TikTok process videos, sports
       Reddit communities, influencer gifting, etc.).
    3. Generate engaging social-media content tailored to the sports-fan
       / game-day audience.
    4. Monitor sales data and flag when the monthly revenue target is on or
       off track.
    5. Proactively surface seasonal opportunities (Super Bowl, March Madness,
       MLB Opening Day, NFL Draft, etc.).

    When you use a tool, wait for its result before continuing.
    Be concise, action-oriented, and specific. Avoid generic advice —
    always tie recommendations back to GlitterGameDay's niche.
""").strip()

# Quick-start prompts for the --task shortcuts
TASK_PROMPTS: dict[str, str] = {
    "seo": (
        "Fetch the first page of active listings and identify the top 3 "
        "listings that most need SEO improvement. For each one, explain "
        "what's weak and provide a fully rewritten title plus 13 tags."
    ),
    "sales": (
        "Pull the 30-day sales report, then calculate how many more orders "
        "per day are needed to hit $2,000/month given our average order "
        "value. Suggest the three highest-impact actions to close the gap."
    ),
    "social": (
        "Generate a 7-day Instagram content calendar for this week, "
        "including caption, 3 story ideas, and relevant hashtags for each "
        "post. Focus on the sports fan / game day angle."
    ),
    "strategy": (
        "Retrieve the full traffic strategy document and then give me a "
        "prioritised 90-day action plan with specific weekly milestones "
        "to reach $2,000/month."
    ),
    "calendar": (
        "Generate a 30-day content and marketing calendar for next month, "
        "identifying the key sports events we should tie promotions to, "
        "and the exact posting schedule across Instagram, TikTok, and "
        "Pinterest."
    ),
    "pricing": (
        "Run a pricing analysis of our listings and recommend any price "
        "changes that would increase conversion rate or average order value "
        "without reducing overall revenue."
    ),
    "reviews": (
        "Summarise our recent reviews, highlight the top praise points we "
        "should feature in listings and social posts, and identify any "
        "recurring issues to address."
    ),
}


# ---------------------------------------------------------------------------
# Agentic loop
# ---------------------------------------------------------------------------

def run_agent(
    user_message: str,
    etsy_client: Any,
    anthropic_client: anthropic.Anthropic,
    verbose: bool = False,
) -> str:
    """
    Run the Claude agent with an agentic tool-use loop.
    Returns the final text response.
    """
    messages: list[dict] = [{"role": "user", "content": user_message}]

    while True:
        response = anthropic_client.messages.create(
            model=MODEL,
            max_tokens=4096,
            system=SYSTEM_PROMPT,
            tools=TOOL_SCHEMAS,
            messages=messages,
        )

        # Collect text output from this turn
        text_parts: list[str] = []
        tool_use_blocks: list[dict] = []

        for block in response.content:
            if block.type == "text":
                text_parts.append(block.text)
            elif block.type == "tool_use":
                tool_use_blocks.append(block)

        if verbose and text_parts:
            print("\n[Agent]", " ".join(text_parts))

        # If the model is done (no more tool calls), return the final answer
        if response.stop_reason == "end_turn" or not tool_use_blocks:
            return "\n".join(text_parts)

        # Append the assistant's response to messages
        messages.append({"role": "assistant", "content": response.content})

        # Execute each tool call and collect results
        tool_results = []
        for tool_block in tool_use_blocks:
            if verbose:
                print(f"\n[Tool call] {tool_block.name}({json.dumps(tool_block.input)})")

            result = dispatch(tool_block.name, tool_block.input, etsy_client)

            if verbose:
                print(f"[Tool result] {result[:200]}{'...' if len(result) > 200 else ''}")

            tool_results.append({
                "type": "tool_result",
                "tool_use_id": tool_block.id,
                "content": result,
            })

        # Feed tool results back to the model
        messages.append({"role": "user", "content": tool_results})


# ---------------------------------------------------------------------------
# Interactive chat
# ---------------------------------------------------------------------------

def interactive_mode(etsy_client: Any, anthropic_client: anthropic.Anthropic) -> None:
    print(
        "\n=== GlitterGameDay Etsy Store Agent ===\n"
        "Type your question or task. Type 'quit' to exit.\n"
        "Quick tasks: seo | sales | social | strategy | calendar | pricing | reviews\n"
    )
    while True:
        try:
            user_input = input("You: ").strip()
        except (EOFError, KeyboardInterrupt):
            print("\nGoodbye!")
            break

        if not user_input:
            continue
        if user_input.lower() in ("quit", "exit", "q"):
            print("Goodbye!")
            break

        # Expand shortcut tasks
        message = TASK_PROMPTS.get(user_input.lower(), user_input)

        print("\nAgent is thinking...\n")
        response = run_agent(message, etsy_client, anthropic_client, verbose=True)
        print(f"\n{'='*60}\n{response}\n{'='*60}\n")


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------

def main() -> None:
    parser = argparse.ArgumentParser(
        description="GlitterGameDay Etsy Store Agent",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent("""
            Quick tasks (--task):
              seo        Audit listings and suggest SEO improvements
              sales      30-day sales report + gap-to-goal analysis
              social     7-day Instagram content calendar
              strategy   Full traffic strategy + 90-day action plan
              calendar   30-day content/marketing calendar
              pricing    Pricing analysis and recommendations
              reviews    Review summary and insights
        """),
    )
    parser.add_argument(
        "prompt",
        nargs="?",
        default=None,
        help="One-shot prompt to run (optional; omit for interactive mode).",
    )
    parser.add_argument(
        "--task",
        choices=list(TASK_PROMPTS.keys()),
        default=None,
        help="Run a predefined quick-start task.",
    )
    parser.add_argument(
        "--verbose", "-v",
        action="store_true",
        help="Show tool calls and intermediate reasoning.",
    )
    args = parser.parse_args()

    # Validate environment
    if not os.getenv("ANTHROPIC_API_KEY"):
        sys.exit(
            "ERROR: ANTHROPIC_API_KEY environment variable is not set.\n"
            "Copy .env.example to .env and fill in your credentials."
        )

    anthropic_client = anthropic.Anthropic()
    etsy_client = client_from_env()

    if args.task:
        message = TASK_PROMPTS[args.task]
        print(f"\nRunning task: {args.task}\n{'='*60}\n")
        response = run_agent(message, etsy_client, anthropic_client, verbose=args.verbose)
        print(response)

    elif args.prompt:
        response = run_agent(args.prompt, etsy_client, anthropic_client, verbose=args.verbose)
        print(response)

    else:
        interactive_mode(etsy_client, anthropic_client)


if __name__ == "__main__":
    main()
