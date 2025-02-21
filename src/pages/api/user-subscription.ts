import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { User, DEFAULT_USER_SUBSCRIPTION } from "@/types/user";

const LEMON_SQUEEZY_API_KEY = process.env.LEMON_SQUEEZY_API_KEY;
const LEMON_SQUEEZY_STORE_ID = process.env.LEMON_SQUEEZY_STORE_ID;

async function checkLemonSqueezySubscription(customerId: string) {
  try {
    const response = await fetch(
      `https://api.lemonsqueezy.com/v1/subscriptions?filter[customer_id]=${customerId}`,
      {
        headers: {
          "Authorization": `Bearer ${LEMON_SQUEEZY_API_KEY}`,
          "Accept": "application/vnd.api+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch subscription from Lemon Squeezy");
    }

    const data = await response.json();
    const subscription = data.data[0];

    if (!subscription) {
      return null;
    }

    return {
      isActive: subscription.attributes.status === "active",
      customerId: subscription.attributes.customer_id,
      variantId: subscription.attributes.variant_id,
      status: subscription.attributes.status,
      renewsAt: subscription.attributes.renews_at,
      endsAt: subscription.attributes.ends_at,
      updatedAt: new Date(),
    };
  } catch (error) {
    console.error("Error checking Lemon Squeezy subscription:", error);
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ error: "Missing userId" });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);

    // Get user and their subscription
    const user = await db
      .collection<User>("users")
      .findOne({ auth0Id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // If user has a customerId, verify subscription with Lemon Squeezy
    if (user.subscription?.customerId) {
      const lemonSqueezySubscription = await checkLemonSqueezySubscription(
        user.subscription.customerId
      );

      // If subscription status differs, update the database
      if (lemonSqueezySubscription && 
          (lemonSqueezySubscription.isActive !== user.subscription.isActive ||
           lemonSqueezySubscription.status !== user.subscription.status)) {
        await db.collection("users").updateOne(
          { auth0Id: userId },
          { $set: { subscription: lemonSqueezySubscription } }
        );
        return res.json({ subscription: lemonSqueezySubscription });
      }
    }

    return res.json({ subscription: user.subscription });
  } catch (error) {
    console.error("Subscription check error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
