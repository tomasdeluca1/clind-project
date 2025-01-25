import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@/lib/mongodb";
import { getSession, withApiAuthRequired } from "@auth0/nextjs-auth0";
import { ObjectId } from "mongodb";
import { ApiResponse } from "@/types";

interface Todo {
  _id?: ObjectId;
  text: string;
  userEmail: string;
  createdAt: Date;
  folder: string;
  status: "active" | "archived";
  isCompleted: boolean;
  completedAt: Date | null;
}

export default withApiAuthRequired(async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<Todo | Todo[] | null>>
) {
  const session = await getSession(req, res);
  if (!session) {
    return res.status(401).json({ success: false, error: "Not authenticated" });
  }

  const client = await clientPromise;
  const db = client.db("clind-project");
  const collection = db.collection<Todo>("todos");

  try {
    switch (req.method) {
      case "GET":
        const todos = await collection
          .find({ userEmail: session.user.email, status: { $ne: "archived" } })
          .sort({ createdAt: -1 })
          .toArray();
        return res.status(200).json({ success: true, data: todos });

      case "POST":
        const { text } = req.body;
        const now = new Date();
        const todo: Omit<Todo, "_id"> = {
          text,
          userEmail: session.user.email,
          createdAt: now,
          folder: now.toISOString().split("T")[0],
          status: "active",
          isCompleted: false,
          completedAt: null,
        };
        const result = await collection.insertOne(todo);
        return res.status(201).json({
          success: true,
          data: { ...todo, _id: result.insertedId },
        });

      case "PUT":
        const { id, status, isCompleted } = req.body;
        const updateData: Partial<Todo> = {
          status,
          ...(status === "archived" ? { archivedAt: new Date() } : {}),
          ...(typeof isCompleted !== "undefined"
            ? {
                isCompleted,
                completedAt: isCompleted ? new Date() : null,
              }
            : {}),
        };

        const updateResult = await collection.updateOne(
          { _id: new ObjectId(id), userEmail: session.user.email },
          { $set: updateData }
        );

        if (updateResult.modifiedCount === 1) {
          return res.status(200).json({
            success: true,
            message: "Todo updated successfully",
          });
        }
        return res
          .status(404)
          .json({ success: false, error: "Todo not found" });

      default:
        res.setHeader("Allow", ["GET", "POST", "PUT"]);
        return res.status(405).json({
          success: false,
          error: `Method ${req.method} Not Allowed`,
        });
    }
  } catch (error) {
    console.error(`Error in ${req.method} /api/todos:`, error);
    return res.status(500).json({
      success: false,
      error: "Internal server error",
    });
  }
});
