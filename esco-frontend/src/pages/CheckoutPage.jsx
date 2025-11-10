export default function CheckoutPage() {
  return (
    <div className="p-10 max-w-lg mx-auto">
      <h1 className="text-3xl font-serif text-yellow-600 mb-6">Checkout</h1>
      <form className="space-y-4">
        <input type="text" placeholder="Full Name" className="w-full border p-2 rounded" />
        <input type="email" placeholder="Email" className="w-full border p-2 rounded" />
        <input type="text" placeholder="Shipping Address" className="w-full border p-2 rounded" />
        <button className="px-6 py-2 bg-yellow-600 text-white rounded">Place Order</button>
      </form>
    </div>
  );
}
