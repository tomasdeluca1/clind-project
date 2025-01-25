import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "@/lib/mongodb";
import { sendNotifyMeNotification } from "@/utils/functions";
import { User, ApiResponse } from "@/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponse<User>>
) {
  const session = await getSession(req, res);
  if (!session || !session.user) {
    return res.status(401).json({ success: false, error: "Not authenticated" });
  }

  const { userId } = req.query;

  if (session.user.sub !== userId) {
    return res.status(403).json({ success: false, error: "Not authorized" });
  }

  const client = await clientPromise;
  const db = client.db();

  try {
    let user: User | null = await db
      .collection<User>("users")
      .findOne({ auth0Id: userId });

    if (!user) {
      // Create new user if they don't exist
      const newUser: User = {
        auth0Id: userId as string,
        name: session.user.name || null,
        email: session.user.email || null,
        lastLoginDate: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        theme: "emerald",
        settings: {
          theme: "emerald",
          notifications: true,
          emailPreferences: {
            daily: false,
            weekly: true,
            marketing: false,
          },
        },
      };

      await db.collection<User>("users").insertOne(newUser);
      await sendNotifyMeNotification();
      user = newUser;
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error fetching/creating user data:", error);
    return res.status(500).json({
      success: false,
      error: "Error fetching/creating user data",
    });
  }
}
