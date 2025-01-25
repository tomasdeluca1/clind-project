import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "@/lib/mongodb";
import { Task, TaskUpdate, ApiResponse } from "@/types";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Task | Task[] | null>>
) {
  const session = await getSession(req, res);
  if (!session || !session.user) {
    return res.status(401).json({ success: false, error: "Not authenticated" });
  }

  const { method, body, query } = req;
  const userId = session.user.sub;

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection(`user_${userId}`);

  try {
    switch (method) {
      case "GET":
        const tasks = await collection.find({}).limit(100).toArray();
        return res.status(200).json({ success: true, data: tasks as Task[] });

      case "POST":
        const newTask: Omit<Task, "_id"> = {
          text: body.text,
          userId: userId,
          isPriority: body.isPriority || false,
          isCompleted: false,
          priority: "medium",
          tags: [],
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        const result = await collection.insertOne(newTask);
        return res.status(201).json({
          success: true,
          data: { ...newTask, _id: result.insertedId } as Task,
        });

      case "PUT":
        const { id, ...updateData } = body as TaskUpdate & { id: string };
        const updateResult = await collection.updateOne(
          { _id: new ObjectId(id) },
          { $set: { ...updateData, updatedAt: new Date() } }
        );
        if (updateResult.modifiedCount === 1) {
          return res.status(200).json({
            success: true,
            message: "Task updated successfully",
          });
        }
        return res
          .status(404)
          .json({ success: false, error: "Task not found" });

      case "DELETE":
        const deleteResult = await collection.deleteOne({
          _id: new ObjectId(body.id),
        });
        if (deleteResult.deletedCount === 1) {
          return res.status(200).json({
            success: true,
            message: "Task deleted successfully",
          });
        }
        return res
          .status(404)
          .json({ success: false, error: "Task not found" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
        return res.status(405).json({
          success: false,
          error: `Method ${method} Not Allowed`,
        });
    }
  } catch (error) {
    console.error(`Error in ${method} /api/tasks:`, error);
    return res.status(500).json({
      success: false,
      error: `Error processing ${method} request`,
    });
  }
});
