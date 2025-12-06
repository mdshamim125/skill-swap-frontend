import Link from "next/link";

export default function PaymentSuccess() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>🎉 Payment Successful!</h1>
      <p>Thank you! Your payment has been completed.</p>
      <Link href="/" style={{ color: "blue", textDecoration: "underline" }}>
        Go back to Home
      </Link>
    </div>
  );
}
