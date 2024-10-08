"use client";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "@/lib/mongodb";

export default withApiAuthRequired(async function handler(req, res) {
  const client = await clientPromise;
  const db = client.db("clind-project");

  const session = await getSession(req, res);

  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  if (req.method === "POST") {
    try {
      const { sub, name, email } = req.body;

      const existingUser = await db
        .collection("users")
        .findOne({ auth0Id: sub });

      if (!existingUser) {
        await db.collection("users").insertOne({
          auth0Id: sub,
          name,
          email,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      res.status(200).json({ message: "User processed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error processing user" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
});
