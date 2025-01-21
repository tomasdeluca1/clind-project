import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const session = await getSession(req, res);
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { userId, lastLoginDate } = req.body;

  if (session.user.sub !== userId) {
    return res.status(403).json({ error: "Not authorized" });
  }

  const client = await clientPromise;
  const db = client.db();

  try {
    const existingUser = await db
      .collection("users")
      .findOne({ auth0Id: userId });

    if (!existingUser) {
      await Promise.all([
        db.collection("users").insertOne({
          auth0Id: userId,
          name: session.user.name,
          email: session.user.email,
          lastLoginDate: new Date(lastLoginDate),
          createdAt: new Date(),
          updatedAt: new Date(),
        }),
        await sendNotifyMeNotification(),
      ]);
    }
    const result = await db.collection("users").updateOne(
      { auth0Id: userId },
      {
        $set: { lastLoginDate: new Date(lastLoginDate) },
        $setOnInsert: { auth0Id: userId },
      },
      { upsert: true }
    );

    if (result.matchedCount === 0 && result.upsertedCount === 0) {
      return res
        .status(404)
        .json({ error: "User not found and couldn't be created" });
    }

    res.status(200).json({ message: "Last login date updated successfully" });
  } catch (error) {
    console.error("Error updating last login date:", error);
    res.status(500).json({ error: "Error updating last login date" });
  }
}
