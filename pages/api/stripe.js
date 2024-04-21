import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const params = {
        submit_type: "pay",
        mode: "payment",
        payment_method_types: ["card", "paypal"],
        billing_address_collection: "required",
        shipping_address_collection: { allowed_countries: ["GB"] },
        shipping_options: [
          { shipping_rate: "shr_1NnVOfLpZald5BFx2Hqs6AfF" },
          { shipping_rate: "shr_1NnVLRLpZald5BFxItM9TH6L" },
        ],
        line_items: req.body.map((item) => {
          const size = "Size: " + item.choice;
          const img = item.image[0].asset._ref;
          const newImage = img
            .replace(
              "image-",
              "https://cdn.sanity.io/images/4db8s61y/production/"
            )
            .replace("-png", ".png")
            .replace("-jpeg", ".jpeg")
            .replace("-webp", ".webp");
          return {
            price_data: {
              currency: "gbp",
              product_data: {
                name: item.name,
                images: [newImage],
                description: size,
              },
              // the unit_amount is calculated from pennies or cents, etc.
              unit_amount: item.price * 100,
            },
            adjustable_quantity: {
              enabled: true,
              minimum: 1,
            },
            quantity: item.quantity,
          };
        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/`,
      };
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create(params);

      res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json(err.message);
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
