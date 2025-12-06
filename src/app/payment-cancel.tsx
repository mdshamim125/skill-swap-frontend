import Link from "next/link";

export default function PaymentCancel() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>❌ Payment Cancelled</h1>
      <p>Your payment was cancelled. You can try again anytime.</p>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go back to Home
      </Link>
    </div>
  );
}
