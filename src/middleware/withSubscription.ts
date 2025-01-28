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
    const db = client.db();

    const user = await db.collection<User>("users").findOne({
      auth0Id: session.user.sub,
    });

    if (!user) {
      return NextResponse.json(
        { success: false, error: "User not found" },
        { status: 404 }
      );
    }

    const isSubscribed =
      user.subscription?.status === "active" &&
      new Date(user.subscription.currentPeriodEnd) > new Date();

    // For free routes, add them here
    const freePaths = ["/api/tasks", "/api/users"];
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
