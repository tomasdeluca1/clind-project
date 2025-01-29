import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";
import { logger } from "@/lib/logger";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { userId, lastLoginDate } = req.body;

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);

    // Convert string date to Date object
    const loginDate = new Date(lastLoginDate);

    const result = await db.collection("users").updateOne(
      { auth0Id: userId },
      {
        $set: {
          lastLoginDate: loginDate,
          updatedAt: new Date(),
        },
      },
      { upsert: false }
    );

    if (result.matchedCount === 0) {
      logger.warn({
        message: "User not found for lastLogin update",
        userId,
      });
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({
      success: true,
      lastLoginDate: loginDate,
    });
  } catch (error) {
    logger.error({
      message: "Error updating last login date",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return res.status(500).json({
      error: "Error updating last login date",
      details: error instanceof Error ? error.message : undefined,
    });
  }
});
