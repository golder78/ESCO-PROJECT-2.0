"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    address: "",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Example: this should come from cart / product total
  const totalAmount = 1500;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMpesaPayment = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/mpesa/stkpush", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone: form.phone,
          amount: totalAmount,
          fullName: form.fullName,
          email: form.email,
          address: form.address,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("STK Push sent successfully. Check your phone and enter your M-Pesa PIN.");
      } else {
        setMessage(data.error || "Payment initiation failed.");
      }
    } catch (error) {
      console.error(error);
      setMessage("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-10 max-w-lg mx-auto">
      <h1 className="text-3xl font-serif text-yellow-600 mb-6">Checkout</h1>

      <form className="space-y-4" onSubmit={handleMpesaPayment}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={form.fullName}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Shipping Address"
          className="w-full border p-2 rounded"
          value={form.address}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="phone"
          placeholder="M-Pesa Number (e.g. 0712345678)"
          className="w-full border p-2 rounded"
          value={form.phone}
          onChange={handleChange}
          required
        />

        <div className="border rounded p-3 bg-gray-50">
          <p className="text-lg font-semibold">Total: KES {totalAmount}</p>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2 bg-yellow-600 text-white rounded w-full"
        >
          {loading ? "Sending Prompt..." : "Pay with M-Pesa"}
        </button>

        {message && (
          <p className="text-sm mt-3 text-center text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
}