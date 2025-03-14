import crypto from "crypto";
import clientPromise from "@/lib/mongodb";
import { logger } from "@/lib/logger";
import { NextApiRequest, NextApiResponse } from "next";

const WEBHOOK_SECRET = process.env.LEMON_SQUEEZY_WEBHOOK_SECRET;

async function updateSubscription(
  user_email: string,
  subscriptionData: {
    status: string;
    endsAt: string | null;
    updatedAt: string;
    product_id: string;
    variantId: string;
    lemonSqueezyId: string;
    cancelAtPeriodEnd: boolean;
    createdAt: string;
    product_name: string;
  }
) {
  try {
    logger.info({
      message: "Updating subscription",
      user_email,
      subscriptionData,
    });

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);

    logger.info({ message: "Connected to database", dbName: db.databaseName });

    const result = await db.collection("users").updateOne(
      { email: user_email },
      {
        $set: {
          "subscription.status": subscriptionData.status,
          "subscription.currentPeriodEnd": subscriptionData.endsAt
            ? new Date(subscriptionData.endsAt)
            : null,
          "subscription.updatedAt": new Date(subscriptionData.updatedAt),
          "subscription.product_id": subscriptionData.product_id,
          "subscription.variantId": subscriptionData.variantId,
          "subscription.lemonSqueezyId": subscriptionData.lemonSqueezyId,
          "subscription.cancelAtPeriodEnd": subscriptionData.cancelAtPeriodEnd,
          "subscription.createdAt": new Date(subscriptionData.createdAt),
          "subscription.product_name": subscriptionData.product_name,
        },
      }
    );

    logger.info({
      message: "Subscription update result",
      matchedCount: result.matchedCount,
      modifiedCount: result.modifiedCount,
    });

    return result;
  } catch (error) {
    logger.error({
      message: "Error updating subscription",
      error: error instanceof Error ? error.message : "Unknown error",
      user_email,
      subscriptionData,
    });
    throw error;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    logger.info({ message: "Handler invoked", method: req.method });

    // Verify environment
    if (process.env.NEXT_PUBLIC_NODE_ENV !== "production") {
      logger.info({ message: "Webhook received in development mode" });
      return res
        .status(200)
        .json({ message: "Webhook received in development" });
    }

    // Read raw body for signature verification
    const rawBody = await new Promise<string>((resolve, reject) => {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => resolve(body));
      req.on("error", (err) => reject(err));
    });

    // Check signature
    const hmac = crypto.createHmac("sha256", WEBHOOK_SECRET || "");
    const digest = Buffer.from(hmac.update(rawBody).digest("hex"), "utf8");
    const signatureHeader = req.headers["x-signature"];
    const signature = Buffer.from(
      Array.isArray(signatureHeader)
        ? signatureHeader[0]
        : signatureHeader || "",
      "utf8"
    );

    if (!crypto.timingSafeEqual(digest, signature)) {
      logger.error({
        message: "Invalid webhook signature",
        signature: req.headers["x-signature"],
      });
      return res.status(400).json({ error: "Invalid signature" });
    }

    // Parse JSON after verification
    const body = JSON.parse(rawBody);
    const eventType = req.headers["x-event-name"];

    logger.info({
      message: "Webhook received",
      eventName: eventType,
      customData: body.meta.custom_data,
    });

    // Handle subscription events
    switch (eventType) {
      case "subscription_created":
      case "subscription_updated":
      case "subscription_resumed":
        const user_email = body.data.attributes?.user_email;
        if (!user_email) {
          logger.error({
            message: "Missing user_email in webhook",
            webhook: body.meta,
          });
          return res.status(400).json({ error: "Missing customer ID" });
        }

        logger.info({ message: "Customer ID found", user_email });

        await updateSubscription(user_email, {
          status: "active",
          product_name: body.data.attributes.product_name,
          endsAt: body.data.attributes.ends_at,
          updatedAt: body.data.attributes.updated_at,
          product_id: body.data.attributes.product_id,
          variantId: body.data.attributes.variant_id,
          lemonSqueezyId: body.data.id,
          cancelAtPeriodEnd: body.data.attributes.cancel_at_period_end,
          createdAt: body.data.attributes.created_at,
        });

        logger.info({
          message: "Subscription updated successfully",
          user_email,
          status: "active",
        });

        return res
          .status(200)
          .json({ message: "Webhook processed successfully" });

      case "subscription_cancelled":
        const user_email_cancelled = body.data.attributes?.user_email;
        if (!user_email_cancelled) {
          logger.error({
            message: "Missing user_email in webhook",
            webhook: body.meta,
          });
          return res.status(400).json({ error: "Missing customer ID" });
        }

        await updateSubscription(user_email_cancelled, {
          status: "inactive",
          product_name: body.data.attributes.product_name,
          endsAt: body.data.attributes.ends_at,
          updatedAt: body.data.attributes.updated_at,
          product_id: body.data.attributes.product_id,
          variantId: body.data.attributes.variant_id,
          lemonSqueezyId: body.data.id,
          cancelAtPeriodEnd: true,
          createdAt: body.data.attributes.created_at,
        });

        logger.info({
          message: "Subscription cancelled successfully",
          user_email: user_email_cancelled,
          status: "inactive",
        });

        return res.status(200).json({
          message: "Subscription cancelled successfully",
        });

      case "subscription_expired":
        const user_email_expired = body.data.attributes?.user_email;
        if (!user_email_expired) {
          logger.error({
            message: "Missing user_email in webhook",
            webhook: body.meta,
          });
          return res.status(400).json({ error: "Missing customer ID" });
        }

        await updateSubscription(user_email_expired, {
          status: "expired",
          product_name: body.data.attributes.product_name,
          endsAt: body.data.attributes.ends_at,
          updatedAt: body.data.attributes.updated_at,
          product_id: body.data.attributes.product_id,
          variantId: body.data.attributes.variant_id,
          lemonSqueezyId: body.data.id,
          cancelAtPeriodEnd: true,
          createdAt: body.data.attributes.created_at,
        });

        logger.info({
          message: "Subscription expired successfully",
          user_email: user_email_expired,
          status: "expired",
        });

        return res.status(200).json({
          message: "Subscription expired successfully",
        });

      case "subscription_paused":
        const user_email_paused = body.data.attributes?.user_email;
        if (!user_email_paused) {
          logger.error({
            message: "Missing user_email in webhook",
            webhook: body.meta,
          });
          return res.status(400).json({ error: "Missing customer ID" });
        }

        await updateSubscription(user_email_paused, {
          status: "paused",
          product_name: body.data.attributes.product_name,
          endsAt: body.data.attributes.ends_at,
          updatedAt: body.data.attributes.updated_at,
          product_id: body.data.attributes.product_id,
          variantId: body.data.attributes.variant_id,
          lemonSqueezyId: body.data.id,
          cancelAtPeriodEnd: body.data.attributes.cancel_at_period_end,
          createdAt: body.data.attributes.created_at,
        });

        logger.info({
          message: "Subscription paused successfully",
          user_email: user_email_paused,
          status: "paused",
        });

        return res.status(200).json({
          message: "Subscription paused successfully",
        });

      case "order_created":
        // Handle one-time purchases if needed
        logger.info({
          message: "Order created",
          order: body.data.id,
          customer_email: body.data.attributes?.user_email,
        });

        return res.status(200).json({
          message: "Order processed successfully",
        });

      default:
        logger.info({
          message: "Unhandled webhook event",
          eventName: eventType,
        });
        return res.status(200).json({ message: "Unhandled webhook event" });
    }
  } catch (error) {
    logger.error({
      message: "Unexpected webhook error",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return res.status(500).json({ error: "Internal server error" });
  }
}

// Ensure raw body is available for signature verification
export const config = {
  api: {
    bodyParser: false, // Disable built-in Next.js body parsing
  },
};
