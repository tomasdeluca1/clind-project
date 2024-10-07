import { getSession } from "@auth0/nextjs-auth0";
import { clientPromise } from "lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const session = await getSession(req, res);
  if (!session) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const client = await clientPromise;
  const db = client.db("clind-project");
  const collection = db.collection("todos");

  if (req.method === "GET") {
    const todos = await collection
      .find({ userEmail: session.user.email, status: { $ne: "archived" } })
      .sort({ createdAt: -1 })
      .toArray();
    res.status(200).json(todos);
  } else if (req.method === "POST") {
    const { text } = req.body;
    const now = new Date();
    const todo = {
      text,
      userEmail: session.user.email,
      createdAt: now,
      folder: now.toISOString().split("T")[0],
      status: "active",
      isCompleted: false,
      completedAt: null,
    };
    const result = await collection.insertOne(todo);
    res.status(201).json({ ...todo, _id: result.insertedId });
  } else if (req.method === "PUT") {
    const { id, status, isCompleted } = req.body;
    const updateData = {
      status,
      archivedAt: status === "archived" ? new Date() : null,
    };
    if (isCompleted !== undefined) {
      updateData.isCompleted = isCompleted;
      updateData.completedAt = isCompleted ? new Date() : null;
    }
    const result = await collection.updateOne(
      { _id: new ObjectId(id), userEmail: session.user.email },
      { $set: updateData }
    );
    if (result.modifiedCount === 1) {
      res.status(200).json({ message: "Todo updated successfully" });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST", "PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
