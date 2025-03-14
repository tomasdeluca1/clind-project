import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession(req, res);

  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const userId = session.user.sub;
  const client = await clientPromise;
  const db = client.db("clind-project");
  const collection = db.collection("users");

  switch (req.method) {
    case "GET": {
      const settings = await collection.findOne({ auth0Id: userId });
      return res.status(200).json(settings || { userId, theme: "emerald" });
    }

    case "PUT": {
      const { theme } = req.body;

      await collection.updateOne(
        { auth0Id: userId },
        { $set: { theme } },
        { upsert: true }
      );
      return res.status(200).json({ message: "Settings updated successfully" });
    }

    default:
      return res.status(405).json({ error: "Method not allowed" });
  }
});
