import Stripe from "stripe";
import { IncomingMessage } from "http";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export const config = {
  api: {
    bodyParser: false,
  },
};

const getRawBody = async (req) => {
  return new Promise((resolve, reject) => {
    let data = "";
    req.on("data", (chunk) => {
      data += chunk;
    });
    req.on("end", () => {
      resolve(data);
    });
    req.on("error", (err) => {
      reject(err);
    });
  });
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    let event;

    try {
      // Get the raw body
      const rawBody = await getRawBody(req);
      const signature = req.headers["stripe-signature"];

      // Construct the event using the raw body and the signature
      event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);

      // Log the received event type
      //(`Received event: ${event.type}`);

      // Handle the event
      switch (event.type) {
        case "checkout.session.completed":
          const session = event.data.object;
          //("Session ID: ", session);

          // Fulfill the purchase...

          let packageType;
          let priceId;

          if (session?.amount_total === 7500) {
            packageType = "starter";
            priceId = "price_1QbfpTIbmKDX9zs5CJCWmiQ2";
          } else if (session?.amount_total === 25000) {
            packageType = "growth";
            priceId = "price_1QbfrMIbmKDX9zs5Q5sr45a3";
          }else if(session?.amount_total === 50000){
            packageType = "enterprise";
            priceId = "price_1QbfsIIbmKDX9zs54maF5Vpa";
          }
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_REMOTE_URL}/subscribe-payment`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  company_id: session?.metadata?.clientId,
                  package_type: packageType,
                  stripe_customer_id: session?.customer,
                  price_id: priceId,
                  subscription_id: session?.subscription,
                }),
              }
            );

            if (!response.ok) {
              console.error(
                "Error calling subscribe-payment API:",
                await response.text()
              );
            } else {
              //("Payment subscription processed successfully.");
            }
          } catch (apiError) {
            console.error("Error making API call:", apiError.message);
          }
  
          break;
  
        case "customer.subscription.updated":

          const subscription_updated = event.data.object;
          //("Subscription Updated Ran: ", subscription_updated);
          break;


        //   let paidPackageType;
        //   const invoice = event.data.object;
        //   //("Invoice ID: ", invoice);

        //   if (invoice?.amount_paid === 7500) {
        //     paidPackageType = "starter";
        //   } else if (invoice?.amount_paid === 25000) {
        //     paidPackageType = "growth";
        //   } else if (invoice?.amount_paid === 50000) {
        //     paidPackageType = "enterprise";
        //   }

        //  try {
        //     const response = await fetch(
        //       `${process.env.NEXT_PUBLIC_REMOTE_URL}/update-payment`,
        //       {
        //         method: "PUT",
        //         headers: { "Content-Type": "application/json" },
        //         body: JSON.stringify({
        //           stripe_customer_id: invoice?.customer,
        //           package_type: paidPackageType,
        //         }),
        //       }
        //     );

        //     if (!response.ok) {
        //       console.error(
        //         "Error calling subscribe-payment API:",
        //         await response.text()
        //       );
        //     } else {
        //       //("Payment subscription processed successfully.");
        //     }
        //   } catch (apiError) {
        //     console.error("Error making API call:", apiError.message);
        //   }
         

        case "customer.subscription.deleted":
          const subscription = event.data.object;
          //("Subscription ID: ", subscription);

          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_REMOTE_URL}/update-payment`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  stripe_customer_id: subscription.customer,
                  package_type: "free",
                }),
              }
            );

            if (!response.ok) {
              console.error(
                "Error calling subscribe-payment API:",
                await response.text()
              );
            } else {
              //("Payment subscription processed successfully.");
            }
          } catch (apiError) {
            console.error("Error making API call:", apiError.message);
          }
          break;


        default:
          //(`Unhandled event type: ${event.type}`);
      }



      // Respond quickly
      res.status(200).send("Webhook received.");
    } catch (err) {
      console.error(`Webhook error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).json({ error: "Method Not Allowed" });
  }
}
