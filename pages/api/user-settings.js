import { connectToDatabase } from "../../lib/mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  const session = await getSession(req, res);
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const userId = session.user.sub;
  const db = await connectToDatabase();
  const collection = db.collection("users");

  switch (req.method) {
    case "GET":
      const settings = await collection.findOne({ userId });
      res.status(200).json(settings || { userId, theme: "emerald" });
      break;

    case "PUT":
      const { theme } = req.body;

      await collection.updateOne(
        { auth0Id: userId },
        { $set: { theme } },
        { upsert: true }
      );
      res.status(200).json({ message: "Settings updated successfully" });
      break;

    default:
      res.status(405).end();
      break;
  }
}