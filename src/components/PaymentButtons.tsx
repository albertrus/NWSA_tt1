"use client";

import { useState } from "react";

const EXAM_PRICE_CENTS = 4900; // $49.00
const EXAM_PRICE_DISPLAY = "$49.00";
const EXAM_LABEL = "NWSA TT1 Practice Exam";

interface PaymentButtonsProps {
  userEmail: string;
  userName: string;
}

export function PaymentButtons({ userEmail, userName }: PaymentButtonsProps) {
  const [processing, setProcessing] = useState<"shopify" | "apple" | "google" | null>(null);
  const [result, setResult] = useState<"success" | "declined" | "unavailable" | null>(null);

  const handleShopifyPay = async () => {
    setProcessing("shopify");
    setResult(null);
    try {
      // Replace SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_TOKEN with your values.
      // This creates a Shopify checkout via the Storefront API and redirects to it.
      const res = await fetch(
        `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN ?? "your-store.myshopify.com"}/api/2024-01/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token":
              process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN ?? "",
          },
          body: JSON.stringify({
            query: `mutation {
              checkoutCreate(input: {
                email: "${userEmail}",
                lineItems: [{ variantId: "${process.env.NEXT_PUBLIC_SHOPIFY_VARIANT_ID ?? ""}", quantity: 1 }]
              }) {
                checkout { webUrl }
                checkoutUserErrors { message }
              }
            }`,
          }),
        }
      );
      const data = await res.json();
      const checkoutUrl = data?.data?.checkoutCreate?.checkout?.webUrl;
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        setResult("declined");
      }
    } catch {
      setResult("declined");
    } finally {
      setProcessing(null);
    }
  };

  const handleApplePay = async () => {
    if (!("PaymentRequest" in window)) {
      setResult("unavailable");
      return;
    }
    setProcessing("apple");
    setResult(null);
    try {
      const request = new PaymentRequest(
        [{ supportedMethods: "https://apple.com/apple-pay",
           data: {
             version: 3,
             // Replace with your Apple Pay merchant identifier and domain
             merchantIdentifier: process.env.NEXT_PUBLIC_APPLE_PAY_MERCHANT_ID ?? "merchant.com.your.app",
             merchantCapabilities: ["supports3DS"],
             supportedNetworks: ["visa", "masterCard", "amex", "discover"],
             countryCode: "US",
           },
        }],
        {
          total: { label: EXAM_LABEL, amount: { currency: "USD", value: "49.00" } },
          id: `exam-purchase-${Date.now()}`,
        }
      );
      const canPay = await request.canMakePayment();
      if (!canPay) {
        setResult("unavailable");
        setProcessing(null);
        return;
      }
      const response = await request.show();
      // Send response.details to your payment processor here
      await response.complete("success");
      setResult("success");
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setResult("declined");
      }
    } finally {
      setProcessing(null);
    }
  };

  const handleGooglePay = async () => {
    if (!("PaymentRequest" in window)) {
      setResult("unavailable");
      return;
    }
    setProcessing("google");
    setResult(null);
    try {
      const request = new PaymentRequest(
        [{ supportedMethods: "https://google.com/pay",
           data: {
             environment: "TEST", // change to "PRODUCTION" for live
             apiVersion: 2,
             apiVersionMinor: 0,
             // Replace with your Google Pay merchant ID
             merchantInfo: {
               merchantId: process.env.NEXT_PUBLIC_GOOGLE_PAY_MERCHANT_ID ?? "01234567890123456789",
               merchantName: "NWSA TT1 Prep",
             },
             allowedPaymentMethods: [{
               type: "CARD",
               parameters: {
                 allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                 allowedCardNetworks: ["AMEX", "DISCOVER", "MASTERCARD", "VISA"],
               },
               tokenizationSpecification: {
                 type: "PAYMENT_GATEWAY",
                 // Replace with your payment gateway (e.g. stripe, braintree)
                 parameters: {
                   gateway: "stripe",
                   "stripe:version": "2024-06-20",
                   "stripe:publishableKey": process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "",
                 },
               },
             }],
             transactionInfo: {
               totalPriceStatus: "FINAL",
               totalPrice: "49.00",
               currencyCode: "USD",
               countryCode: "US",
             },
           },
        }],
        {
          total: { label: EXAM_LABEL, amount: { currency: "USD", value: "49.00" } },
        }
      );
      const canPay = await request.canMakePayment();
      if (!canPay) {
        setResult("unavailable");
        setProcessing(null);
        return;
      }
      const response = await request.show();
      // Send response.details to your payment processor here
      await response.complete("success");
      setResult("success");
    } catch (err: unknown) {
      if (err instanceof Error && err.name !== "AbortError") {
        setResult("declined");
      }
    } finally {
      setProcessing(null);
    }
  };

  if (result === "success") {
    return (
      <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-6 text-center space-y-3">
        <svg className="w-12 h-12 text-green-400 mx-auto" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-green-400 font-semibold text-lg">Payment successful!</p>
        <p className="text-[#546E7A] text-sm">
          Welcome, {userName.split(" ")[0]}. You now have full access to the practice exam.
          A confirmation will be sent to {userEmail}.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {result === "declined" && (
        <div className="bg-[#FF5722]/10 border border-[#FF5722]/30 rounded-xl p-3 text-sm text-[#FF5722]">
          Payment could not be processed. Please try again or use a different method.
        </div>
      )}
      {result === "unavailable" && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-3 text-sm text-yellow-400">
          That payment method isn&apos;t available on this device or browser. Please try another option.
        </div>
      )}

      {/* Shopify / Shop Pay */}
      <button
        onClick={handleShopifyPay}
        disabled={!!processing}
        className="w-full flex items-center justify-center gap-3 bg-[#5A31F4] hover:bg-[#4A21E4] text-white font-semibold py-4 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing === "shopify" ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Processing…
          </span>
        ) : (
          <>
            {/* Shop Pay bag icon */}
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm7 17H5V8h14v12zm-7-8c-1.1 0-2-.9-2-2H8c0 2.21 1.79 4 4 4s4-1.79 4-4h-2c0 1.1-.9 2-2 2z"/>
            </svg>
            <span>Pay with Shop Pay · {EXAM_PRICE_DISPLAY}</span>
          </>
        )}
      </button>

      {/* Apple Pay */}
      <button
        onClick={handleApplePay}
        disabled={!!processing}
        className="w-full flex items-center justify-center gap-3 bg-black hover:bg-[#1a1a1a] text-white font-semibold py-4 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-white/10"
      >
        {processing === "apple" ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Processing…
          </span>
        ) : (
          <>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
            </svg>
            <span>Pay with Apple Pay · {EXAM_PRICE_DISPLAY}</span>
          </>
        )}
      </button>

      {/* Google Pay */}
      <button
        onClick={handleGooglePay}
        disabled={!!processing}
        className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-50 text-[#3c4043] font-semibold py-4 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed border border-[#dadce0]"
      >
        {processing === "google" ? (
          <span className="flex items-center gap-2 text-[#3c4043]">
            <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
            </svg>
            Processing…
          </span>
        ) : (
          <>
            {/* Google Pay mark */}
            <svg className="h-5" viewBox="0 0 41 17" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.526 2.635v4.083h2.518c.6 0 1.096-.202 1.488-.605.403-.402.605-.882.605-1.437 0-.544-.202-1.018-.605-1.422-.392-.413-.888-.62-1.488-.62h-2.518zm0 5.52v4.736h-1.504V1.198h3.99c1.013 0 1.873.337 2.582 1.012.72.675 1.08 1.497 1.08 2.466 0 .991-.36 1.819-1.08 2.482-.697.652-1.559.978-2.583.978h-2.485zM27.194 10.667c0 .566.21 1.042.631 1.426.42.385.936.577 1.547.577.838 0 1.544-.317 2.117-.952l.836.868c-.72.844-1.744 1.266-3.073 1.266-1.11 0-2.035-.358-2.772-1.075-.726-.717-1.09-1.622-1.09-2.715 0-1.071.36-1.972 1.08-2.7.72-.739 1.629-1.109 2.727-1.109 1.207 0 2.15.395 2.826 1.185.687.79 1.03 1.798 1.03 3.024v.205h-5.86zm4.388-1.295c-.048-.567-.258-1.026-.63-1.377-.37-.362-.838-.543-1.403-.543-.544 0-1.008.187-1.392.562-.372.362-.6.816-.686 1.358h4.111zM38.863 6.26L36.8 12.293h-.005l-2.084-6.033h-1.637l2.832 7.67-.76 1.978c-.186.524-.523.786-1.012.786-.111 0-.284-.032-.52-.095v1.392c.189.05.39.074.605.074.96 0 1.687-.54 2.182-1.62l3.267-9.184h-1.805zM10.464 11.577a5.68 5.68 0 01-3.898 1.538C3.845 13.115 1.5 10.77 1.5 7.938 1.5 5.106 3.845 2.76 6.566 2.76c1.424 0 2.625.509 3.568 1.44l-1.012 1.012C8.398 4.51 7.56 4.11 6.566 4.11c-2.124 0-3.844 1.695-3.844 3.828 0 2.133 1.72 3.828 3.844 3.828 1.24 0 2.129-.495 2.695-1.069.47-.47.776-1.139.896-2.054H6.566V7.28h4.527c.048.27.07.544.07.828 0 1.364-.382 2.677-1.699 3.469z" fill="#3c4043"/>
              <path d="M6.566 2.76c1.424 0 2.625.509 3.568 1.44L9.122 5.212C8.398 4.51 7.56 4.11 6.566 4.11c-2.124 0-3.844 1.695-3.844 3.828 0 2.133 1.72 3.828 3.844 3.828 1.24 0 2.129-.495 2.695-1.069.47-.47.776-1.139.896-2.054H6.566V7.28h4.527c.048.27.07.544.07.828 0 1.364-.382 2.677-1.699 3.469a5.68 5.68 0 01-3.898 1.538C3.845 13.115 1.5 10.77 1.5 7.938 1.5 5.106 3.845 2.76 6.566 2.76z" fill="#4285f4"/>
              <path d="M10.134 4.2C9.191 3.27 7.99 2.76 6.566 2.76 3.845 2.76 1.5 5.106 1.5 7.938h1.222c0-2.133 1.72-3.828 3.844-3.828.994 0 1.832.4 2.556 1.102l1.012-1.012z" fill="#34a853"/>
            </svg>
            <span>Pay with Google Pay · {EXAM_PRICE_DISPLAY}</span>
          </>
        )}
      </button>

      <p className="text-center text-xs text-[#546E7A]">
        Secure payment · 30-day money-back guarantee · Instant access
      </p>

      {/* Price breakdown */}
      <div className="border-t border-[#4A5568] pt-4 mt-2 space-y-1 text-sm">
        <div className="flex justify-between text-[#546E7A]">
          <span>{EXAM_LABEL}</span>
          <span>{EXAM_PRICE_DISPLAY}</span>
        </div>
        <div className="flex justify-between font-semibold text-white">
          <span>Total</span>
          <span>{EXAM_PRICE_DISPLAY}</span>
        </div>
      </div>
    </div>
  );
}

export { EXAM_PRICE_CENTS, EXAM_PRICE_DISPLAY, EXAM_LABEL };
