import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";

export default function Pricing() {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (priceId: string) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error("Error creating checkout:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Add your pricing cards here */}
      </div>
    </div>
  );
}
