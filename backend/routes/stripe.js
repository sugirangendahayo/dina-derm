// // backend/routes/stripe.js
// import express from "express";
// import Stripe from "stripe";
// import { authenticate } from "../middleware/authMiddleware.js";

// const router = express.Router();
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// router.post("/create-session", authenticate, async (req, res) => {
//   try {
//     const { items } = req.body;
//     const user_id = req.user.id;

//     // Create line items for Stripe
//     const lineItems = items.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: `Product ${item.variant_id}`,
//           description: "Skincare Product",
//         },
//         unit_amount: Math.round(item.price * 100), // Convert to cents
//       },
//       quantity: item.quantity,
//     }));

//     // Calculate total amount
//     const total_amount = items.reduce(
//       (sum, item) => sum + item.price * item.quantity,
//       0
//     );

//     // Create Stripe checkout session
//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/cart`,
//       metadata: {
//         user_id: user_id.toString(),
//         items: JSON.stringify(items),
//       },
//     });

//     res.json({ id: session.id });
//   } catch (error) {
//     console.error("Stripe session error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// export default router;
