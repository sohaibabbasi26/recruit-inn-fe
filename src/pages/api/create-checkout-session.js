import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, clientId, priceId } = req.body;

    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId, // Dynamically pass the price ID
            quantity: 1,
          },
        ],
        mode: "subscription", // or 'payment' based on your needs
        customer_email: email, // Prefill email
        metadata: { clientId }, // Add custom metadata
        success_url: `${process.env.NEXT_PUBLIC_URL}/client/${clientId}`,
        cancel_url: `${process.env.NEXT_PUBLIC_URL}/client/${clientId}`,
      });

      res.status(200).json({ url: session.url });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
