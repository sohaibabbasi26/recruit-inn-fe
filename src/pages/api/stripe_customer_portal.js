// pages/api/createBillingSession.js
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    const { customerId } = req.body; // Get customer ID from request body

    if (!customerId) {
      return res.status(400).json({ error: "Customer ID is required" });
    }

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: process.env.NEXT_PUBLIC_URL, // Change to your return URL
    });

    res.status(200).json({ url: session.url });
  } catch (error) {
    console.error("Stripe Billing Portal Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
