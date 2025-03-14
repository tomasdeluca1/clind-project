import { handleAuth, handleCallback } from "@auth0/nextjs-auth0";
import { NextApiRequest, NextApiResponse } from "next";

export default handleAuth({
  async callback(req: NextApiRequest, res: NextApiResponse) {
    try {
      await handleCallback(req, res, {
        afterCallback: async (
          req: NextApiRequest,
          res: NextApiResponse,
          session: any
        ) => {
          return session;
        },
      });
    } catch (error: any) {
      console.error("Auth0 callback error:", error);

      // Handle specific error cases
      if (error.error === "access_denied") {
        return res.redirect("/api/auth/login?error=access_denied");
      }

      // Log detailed error for debugging
      console.error("Detailed error:", {
        code: error.code,
        status: error.status,
        message: error.message,
        description: error.errorDescription,
      });

      // Redirect to error page with message
      return res.redirect(
        `/error?message=${encodeURIComponent(error.message)}`
      );
    }
  },
});
