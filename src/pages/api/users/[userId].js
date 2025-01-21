import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "@/lib/mongodb";
import { sendNotifyMeNotification } from "@/utils/functions";

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
    let user = await db.collection("users").findOne({ auth0Id: userId });

    if (!user) {
      // Create new user if they don't exist
      user = {
        auth0Id: userId,
        name: session.user.name,
        email: session.user.email,
        lastLoginDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await db.collection("users").insertOne(user);
      await sendNotifyMeNotification();
    }

    res.status(200).json({
      lastLoginDate: user.lastLoginDate || null,
      name: user.name || null,
      email: user.email || null,
      auth0Id: user.auth0Id,
      createdAt: user.createdAt || null,
      updatedAt: user.updatedAt || null,
    });
  } catch (error) {
    console.error("Error fetching/creating user data:", error);
    res.status(500).json({ error: "Error fetching/creating user data" });
  }
}
