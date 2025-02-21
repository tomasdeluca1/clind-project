import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

const verifyWebhookSignature = (
  payload: string,
  signature: string,
  secret: string
) => {
  const hmac = crypto.createHmac("sha256", secret);
  const digest = hmac.update(payload).digest("hex");
  return crypto.timingSafeEqual(
    Buffer.from(signature),
    Buffer.from(digest)
  );
};

export const config = {
  api: {
    bodyParser: {
      raw: {
        types: ["application/json"],
      },
    },
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const signature = req.headers["x-signature"];
    
    if (!signature || typeof signature !== "string" || !WEBHOOK_SECRET) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    const rawBody = typeof req.body === "string" 
      ? req.body 
      : JSON.stringify(req.body);

    const isValid = verifyWebhookSignature(
      rawBody,
      signature,
      WEBHOOK_SECRET
    );

    if (!isValid) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    const event = JSON.parse(rawBody);
    const { meta, data } = event;

    // Handle subscription events
    if (meta.event_name === "subscription_created" || 
        meta.event_name === "subscription_updated") {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DATABASE);

      const customerId = data.attributes.customer_id;
      const status = data.attributes.status;
      const variantId = data.attributes.variant_id;
      const renewsAt = data.attributes.renews_at;
      const endsAt = data.attributes.ends_at;

      // Update user subscription
      await db.collection("users").updateOne(
        { "subscription.customerId": customerId },
        {
          $set: {
            subscription: {
              isActive: status === "active",
              customerId,
              variantId,
              status,
              renewsAt,
              endsAt,
              updatedAt: new Date(),
            },
          },
        }
      );
    }

    return res.status(200).json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
