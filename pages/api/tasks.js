import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";
import { getUserCollection } from "@/utils/functions";
import clientPromise from "@/lib/mongodb";

export default async function handler(req, res) {
  const session = await getSession(req, res);
  if (!session || !session.user) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  const { method, body, query } = req;
  const userId = session.user.sub;

  const client = await clientPromise;
  const db = client.db("clind-project");
  const collection = db.collection(getUserCollection(userId));

  switch (method) {
    case "GET":
      try {
        const tasks = await collection.find({}).limit(100).toArray(); // Limit to 100 tasks
        res.status(200).json(tasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        res.status(500).json({ error: "Error fetching tasks" });
      }
      break;

    case "POST":
      try {
        const newTask = {
          text: body.text,
          isPriority: body.isPriority || false,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await collection.insertOne(newTask);
        res.status(201).json({ ...newTask, _id: result.insertedId });
      } catch (error) {
        console.error("Error creating task:", error);
        res.status(500).json({ error: "Error creating task" });
      }
      break;

    case "PUT":
      try {
        const { id, ...updateData } = body;
        const result = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...updateData, updatedAt: new Date() } }
        );
        if (result.modifiedCount === 1) {
          res.status(200).json({ message: "Task updated successfully" });
        } else {
          res.status(404).json({ error: "Task not found" });
        }
      } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Error updating task" });
      }
      break;

    case "DELETE":
      try {
        const { id } = body;
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Task deleted successfully" });
        } else {
          res.status(404).json({ error: "Task not found" });
        }
      } catch (error) {
        console.error("Error deleting task:", error);
        res.status(500).json({ error: "Error deleting task" });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
