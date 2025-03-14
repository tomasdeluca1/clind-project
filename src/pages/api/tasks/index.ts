import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import clientPromise from "@/lib/mongodb";
import { Task, TaskUpdate, ApiResponse } from "@/types";
import { getUserTierFromProduct } from "@/config/cursor-rules";

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Task | Task[] | null>>
) {
  const session = await getSession(req, res);
  if (!session?.user) {
    return res.status(401).json({ success: false, error: "Not authenticated" });
  }

  const { method, body } = req;
  const userId = session.user.sub;

  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DATABASE);
  const collection = db.collection(`user_${userId}`);

  try {
    switch (method) {
      case "GET": {
        const tasks = await collection.find({}).limit(100).toArray();
        return res.status(200).json({ success: true, data: tasks as Task[] });
      }

      case "POST": {
        // Check task limit for free users
        const user = await db.collection("users").findOne({ auth0Id: userId });
        const subscription = user?.subscription;
        const tier = getUserTierFromProduct(subscription?.product_name || "");

        if (tier === "free") {
          const taskCount = await collection.countDocuments({});
          if (taskCount >= 6) {
            return res.status(403).json({
              success: false,
              error:
                "Free tier limited to 10 tasks. Please upgrade to create more tasks.",
            });
          }
        }

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
        const createdTask = { ...newTask, _id: result.insertedId };

        return res.status(201).json({
          success: true,
          data: createdTask as Task,
        });
      }

      default:
        res.setHeader("Allow", ["GET", "POST"]);
        return res.status(405).json({
          success: false,
          error: `Method ${method} Not Allowed`,
        });
    }
  } catch (error) {
    console.error(`Error in ${method} /api/tasks:`, error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});
