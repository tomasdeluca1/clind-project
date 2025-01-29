import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { User, DEFAULT_USER_SUBSCRIPTION } from "@/types/user";

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

    return res.json({ subscription: user.subscription });
  } catch (error) {
    console.error("Subscription check error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}
