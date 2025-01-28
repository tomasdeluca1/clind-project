import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { Subscription, User } from "@/types";

const WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const signature = req.headers["x-signature"];
  // Verify webhook signature here...

  const { data, meta } = req.body;
  const { event_name } = meta;

  const client = await clientPromise;
  const db = client.db();

  try {
    switch (event_name) {
      case "subscription_created":
      case "subscription_updated": {
        const subscription: Subscription = {
          userId: data.attributes.user_id,
          status: data.attributes.status,
          planId: data.attributes.product_id,
          variantId: data.attributes.variant_id,
          lemonSqueezyId: data.id,
          currentPeriodEnd: new Date(data.attributes.ends_at),
          cancelAtPeriodEnd: data.attributes.cancel_at_period_end,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await db.collection<User>("users").updateOne(
          { auth0Id: subscription.userId },
          {
            $set: {
              subscription,
              isSubscribed: subscription.status === "active",
            },
          }
        );
        break;
      }

      case "subscription_cancelled": {
        await db.collection<User>("users").updateOne(
          { "subscription.lemonSqueezyId": data.id },
          {
            $set: {
              "subscription.status": "cancelled",
              "subscription.updatedAt": new Date(),
              isSubscribed: false,
            },
          }
        );
        break;
      }
    }

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Webhook error:", error);
    res
      .status(500)
      .json({ success: false, error: "Webhook processing failed" });
  }
}

export const config = {
  api: {
    bodyParser: false, // Needed for signature verification
  },
};
