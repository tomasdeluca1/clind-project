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
  if (!session?.user) {
    return res.status(401).json({ success: false, error: "Not authenticated" });
  }

  const { method, body, query } = req;
  const userId = session.user.sub;

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DATABASE);
  const collection = db.collection(`user_${userId}`);

  try {
    switch (method) {
      case "GET": {
        const { id } = query;
        const task = await collection.findOne({
          _id: new ObjectId(id as string),
        });
        return res.status(200).json({ success: true, data: task as Task });
      }

      case "PATCH": {
        const { id } = query;
        const updateData = body as TaskUpdate;

        if (!id || typeof id !== "string" || !ObjectId.isValid(id)) {
          return res.status(400).json({
            success: false,
            error: "Invalid task ID format",
          });
        }

        const updateResult = await collection.findOneAndUpdate(
          { _id: new ObjectId(id) },
          { $set: { ...updateData, updatedAt: new Date() } },
          { returnDocument: "after" }
        );

        if (!updateResult.value) {
          return res
            .status(404)
            .json({ success: false, error: "Task not found" });
        }

        return res.status(200).json({
          success: true,
          data: updateResult.value as Task,
        });
      }

      case "DELETE": {
        const { id } = query;

        if (!id || typeof id !== "string" || !ObjectId.isValid(id)) {
          return res.status(400).json({
            success: false,
            error: "Invalid task ID format",
          });
        }

        const result = await collection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount === 0) {
          return res.status(404).json({
            success: false,
            error: "Task not found",
          });
        }

        return res.status(200).json({
          success: true,
          data: null,
        });
      }

      default:
        res.setHeader("Allow", ["GET", "PATCH", "DELETE"]);
        return res.status(405).json({
          success: false,
          error: `Method ${method} Not Allowed`,
        });
    }
  } catch (error) {
    console.error(`Error in ${method} /api/tasks/${query.id}:`, error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});
