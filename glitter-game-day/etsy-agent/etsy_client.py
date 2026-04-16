"""
Etsy Open API v3 client for the GlitterGameDay store agent.
Handles authentication, listings, orders, stats, and shop data.
"""

import os
import time
import requests
from typing import Any


ETSY_BASE_URL = "https://openapi.etsy.com/v3"


class EtsyClient:
    """Thin wrapper around the Etsy Open API v3."""

    def __init__(self, api_key: str, access_token: str, shop_id: str):
        self.api_key = api_key
        self.access_token = access_token
        self.shop_id = shop_id
        self.session = requests.Session()
        self.session.headers.update({
            "x-api-key": api_key,
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json",
        })

    # ------------------------------------------------------------------
    # Internal helpers
    # ------------------------------------------------------------------

    def _get(self, path: str, params: dict | None = None) -> dict:
        url = f"{ETSY_BASE_URL}{path}"
        resp = self.session.get(url, params=params, timeout=15)
        resp.raise_for_status()
        return resp.json()

    def _put(self, path: str, payload: dict) -> dict:
        url = f"{ETSY_BASE_URL}{path}"
        resp = self.session.put(url, json=payload, timeout=15)
        resp.raise_for_status()
        return resp.json()

    def _post(self, path: str, payload: dict) -> dict:
        url = f"{ETSY_BASE_URL}{path}"
        resp = self.session.post(url, json=payload, timeout=15)
        resp.raise_for_status()
        return resp.json()

    # ------------------------------------------------------------------
    # Shop
    # ------------------------------------------------------------------

    def get_shop(self) -> dict:
        """Return shop metadata (title, announcement, policy, etc.)."""
        return self._get(f"/application/shops/{self.shop_id}")

    def get_shop_stats(self, unit: str = "month", limit: int = 6) -> dict:
        """
        Return visit/revenue stats.
        unit: 'day' | 'week' | 'month'
        """
        return self._get(
            f"/application/shops/{self.shop_id}/stats",
            params={"unit": unit, "limit": limit},
        )

    # ------------------------------------------------------------------
    # Listings
    # ------------------------------------------------------------------

    def get_listings(
        self,
        state: str = "active",
        limit: int = 25,
        offset: int = 0,
    ) -> dict:
        """Return paginated active listings."""
        return self._get(
            f"/application/shops/{self.shop_id}/listings",
            params={"state": state, "limit": limit, "offset": offset},
        )

    def get_listing(self, listing_id: int) -> dict:
        """Return a single listing by ID."""
        return self._get(f"/application/listings/{listing_id}")

    def update_listing(self, listing_id: int, updates: dict) -> dict:
        """
        Update editable listing fields.
        Common fields: title, description, tags (list[str], max 13),
        price, who_made, when_made, taxonomy_id.
        """
        return self._put(
            f"/application/shops/{self.shop_id}/listings/{listing_id}",
            updates,
        )

    def get_listing_inventory(self, listing_id: int) -> dict:
        """Return inventory/variant data for a listing."""
        return self._get(
            f"/application/listings/{listing_id}/inventory"
        )

    # ------------------------------------------------------------------
    # Transactions / Orders
    # ------------------------------------------------------------------

    def get_receipts(
        self,
        was_paid: bool = True,
        was_shipped: bool | None = None,
        limit: int = 25,
        offset: int = 0,
    ) -> dict:
        """Return shop receipts (orders)."""
        params: dict[str, Any] = {
            "was_paid": was_paid,
            "limit": limit,
            "offset": offset,
        }
        if was_shipped is not None:
            params["was_shipped"] = was_shipped
        return self._get(
            f"/application/shops/{self.shop_id}/receipts",
            params=params,
        )

    def get_transactions(self, limit: int = 25, offset: int = 0) -> dict:
        """Return shop transactions (line items sold)."""
        return self._get(
            f"/application/shops/{self.shop_id}/transactions",
            params={"limit": limit, "offset": offset},
        )

    # ------------------------------------------------------------------
    # Reviews
    # ------------------------------------------------------------------

    def get_reviews(self, limit: int = 25, offset: int = 0) -> dict:
        """Return shop reviews."""
        return self._get(
            f"/application/shops/{self.shop_id}/reviews",
            params={"limit": limit, "offset": offset},
        )

    # ------------------------------------------------------------------
    # Taxonomy / SEO helpers
    # ------------------------------------------------------------------

    def get_taxonomy_nodes(self) -> dict:
        """Return Etsy's full seller taxonomy tree."""
        return self._get("/application/seller-taxonomy/nodes")

    def get_suggested_tags(self, listing_id: int) -> dict:
        """Return tag suggestions for an existing listing (if available)."""
        return self._get(
            f"/application/listings/{listing_id}/tags"
        )


def client_from_env() -> EtsyClient:
    """Build an EtsyClient from environment variables."""
    return EtsyClient(
        api_key=os.environ["ETSY_API_KEY"],
        access_token=os.environ["ETSY_ACCESS_TOKEN"],
        shop_id=os.environ.get("ETSY_SHOP_ID", "glittergameday"),
    )
