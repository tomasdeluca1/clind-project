import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import clientPromise from "@/lib/mongodb";
import { User } from "@/types";

export function withSubscription(handler: Function) {
  return async (request: NextRequest) => {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: "Not authenticated" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DATABASE);

    const user = await db.collection<User>("users").findOne({
      auth0Id: session.user.sub,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    // Add a grace period for subscription sync
    const gracePeriod = 5 * 60 * 1000; // 5 minutes
    const isInGracePeriod =
      user.subscription?.updatedAt &&
      new Date().getTime() - new Date(user.subscription.updatedAt).getTime() <
        gracePeriod;

    const isSubscribed =
      (user.subscription?.status === "active" &&
        user.subscription.currentPeriodEnd &&
        new Date(user.subscription.currentPeriodEnd) > new Date()) ||
      isInGracePeriod;

    // For free routes, add them here
    const freePaths = ["/api/tasks", "/api/users", "/dashboard"];
    const isFreePath = freePaths.some((path) =>
      request.nextUrl.pathname.startsWith(path)
    );

    if (!isSubscribed && !isFreePath) {
      return NextResponse.json(
        {
          success: false,
          error: "Subscription required",
          subscription: user.subscription,
        },
        { status: 403 }
      );
    }

    return handler(request);
  };
}
