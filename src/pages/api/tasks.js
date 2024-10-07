import { connectToDatabase, getUserCollection } from "../../lib/mongodb";
import { ObjectId } from "mongodb";
import { getSession } from "@auth0/nextjs-auth0";

export default async function handler(req, res) {
  const session = await getSession(req, res);
  const { method, body, query } = req;
  const userId = session.user.sub;

  const db = await connectToDatabase();
  const collection = db.collection(getUserCollection(userId));

  switch (method) {
    case "GET":
      try {
        const tasks = await collection.find({}).toArray();
        res.status(200).json(tasks);
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error fetching tasks", error: error.message });
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
        res
          .status(500)
          .json({ message: "Error creating task", error: error.message });
      }
      break;

    case "PUT":
      try {
        const { id, ...updateData } = body;
        if (updateData.status === "archived") {
          await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status: "archived", archivedAt: new Date() } }
          );
        } else {
          await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
          );
        }
        res.status(200).json({ message: "Task updated successfully" });
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error updating task", error: error.message });
      }
      break;

    case "DELETE":
      try {
        const { id } = body;
        console.log("Deleting task with ID:", id);
        const result = await collection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 1) {
          res.status(200).json({ message: "Task deleted successfully" });
        } else {
          res.status(404).json({ message: "Task not found" });
        }
      } catch (error) {
        res
          .status(500)
          .json({ message: "Error deleting task", error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
