"use client";
import clientPromise from "@/lib/mongodb";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { NextResponse } from "next/server";

export default withApiAuthRequired(async function handler(req, res) {
  const session = await getSession();

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const userId = session.user.sub;
  const client = await clientPromise;
  const db = client.db("clind-project");
  const collection = db.collection("users");
  switch (req.method) {
    case "GET":
      const settings = await collection.findOne({ auth0Id: userId });
      return NextResponse.json(settings || { userId, theme: "emerald" });
      break;

    case "PUT":
      const { theme } = await req.json();

      await collection.updateOne(
        { auth0Id: userId },
        { $set: { theme } },
        { upsert: true }
      );
      return NextResponse.json({ message: "Settings updated successfully" });
      break;

    default:
      return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
      );
      break;
  }
});
