import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import ThemeSection from "../../components/ThemeSection";
import LoadingSpinner from "../../src/components/LoadingSpinner";

function SettingsPage() {
  const router = useRouter();
  const { userId } = router.query;
  const [isLoading, setIsLoading] = useState(true);
  const [userSettings, setUserSettings] = useState(null);

  useEffect(() => {
    if (userId) {
      fetchUserSettings();
    }
  }, [userId]);

  const fetchUserSettings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/user-settings?userId=${userId}`);
      const data = await response.json();
      setUserSettings(data);
    } catch (error) {
      console.error("Error fetching user settings:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Settings</h1>
      <ThemeSection />
      {/* Add other settings sections here */}
    </div>
  );
}

export default SettingsPage;
