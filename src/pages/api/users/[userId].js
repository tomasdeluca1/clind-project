import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const session = await getSession(req, res);
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { userId } = req.query;

  if (session.user.sub !== userId) {
    return res.status(403).json({ error: "Not authorized" });
  }

  const client = await clientPromise;
  const db = client.db();

  try {
    const user = await db.collection("users").findOne({ auth0Id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({
      lastLoginDate: user.lastLoginDate || null,
      // Add any other user data you want to return
    });
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Error fetching user data" });
  }
}
