"use client";

export function EmailSubscribeForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        required
        placeholder="Enter your email address"
        className="flex-1 bg-[#1E2A3A] border border-[#2D3748] text-white placeholder-[#546E7A] rounded-xl px-5 py-3 text-sm focus:outline-none focus:border-[#1E88E5]"
      />
      <button
        type="submit"
        className="bg-[#1E88E5] text-white px-8 py-3 rounded-xl font-semibold text-sm hover:bg-[#1565C0] transition-colors whitespace-nowrap"
      >
        Subscribe
      </button>
    </form>
  );
}
