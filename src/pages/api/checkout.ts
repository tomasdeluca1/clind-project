import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "@auth0/nextjs-auth0";

const LEMON_SQUEEZY_API_KEY = process.env.LEMON_SQUEEZY_API_KEY;
const STORE_ID = process.env.LEMON_SQUEEZY_STORE_ID;

const lsqyConfig = {
  API_KEY: process.env.LEMON_SQUEEZY_API_KEY,
  URL: "https://api.lemonsqueezy.com/v1",
};

const headers = {
  Accept: "application/vnd.api+json",
  "Content-Type": "application/vnd.api+json",
  Authorization: `Bearer ${lsqyConfig.API_KEY}`,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const session = await getSession(req, res);
    const { variantId } = req.body;

    // If user is not logged in, redirect to Auth0 login
    if (!session?.user) {
      const returnTo = `/api/auth/login?returnTo=${encodeURIComponent(
        `/pricing?checkout=${variantId}`
      )}`;
      return res.json({ redirect: returnTo });
    }

    // Create checkout using Lemon Squeezy API
    const response = await fetch(
      `https://api.lemonsqueezy.com/v1/checkouts?storeId=${STORE_ID}`,
      {
        method: "POST",
        headers: {
          Accept: "application/vnd.api+json",
          "Content-Type": "application/vnd.api+json",
          Authorization: `Bearer ${LEMON_SQUEEZY_API_KEY}`,
        },
        body: JSON.stringify({
          data: {
            type: "checkouts",
            attributes: {
              checkout_data: {
                custom: {
                  userId: session.user.sub,
                },
              },
              checkout_options: {
                embed: true,
                media: true,
                logo: true,
                desc: true,
                discount: true,
                dark: false,
                subscription_preview: true,
                button_color: "#7047EB",
              },
              product_options: {
                redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
                receipt_link_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
                receipt_button_text: "Access Dashboard",
                receipt_thank_you_note: "Thank you for subscribing to Clind!",
              },
            },
            relationships: {
              store: {
                data: {
                  type: "stores",
                  id: STORE_ID,
                },
              },
              variant: {
                data: {
                  type: "variants",
                  id: variantId,
                },
              },
            },
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to create checkout");
    }

    const checkoutData = await response.json();

    return res.json({
      data: {
        attributes: {
          url: checkoutData.data.attributes.url,
        },
      },
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return res.status(500).json({ error: "Failed to create checkout" });
  }
}
