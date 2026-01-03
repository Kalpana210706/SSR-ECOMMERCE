"use client";

export default function BuyButton({ productId }: { productId: string }) {
  async function handleBuy() {
    const res = await fetch(`/api/products/${productId}/buy`, {
      method: "POST",
    });

    if (res.ok) {
      alert("Purchase successful 🎉");
      window.location.reload(); // 🔥 IMPORTANT
    } else {
      const data = await res.json();
      alert(data.error || "Failed");
    }
  }

  return (
    <button
      onClick={handleBuy}
      className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl"
    >
      Buy Now
    </button>
  );
}