import { useState, useEffect } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import Layout from "@/components/Layout";

export default function Settings() {
  const { user, error, isLoading } = useUser();
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (user) {
      fetchUserSettings();
    }
  }, [user]);

  async function fetchUserSettings() {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user-settings`
    );
    const settings = await response.json();
    setTheme(settings.theme);
  }

  async function handleThemeChange(newTheme) {
    setTheme(newTheme);
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/user-settings`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ theme: newTheme }),
    });
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <Layout>
      {user ? (
        <>
          <h1 className="text-3xl font-bold mb-4">Settings</h1>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Theme</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs"
              value={theme}
              onChange={(e) => handleThemeChange(e.target.value)}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="cupcake">Cupcake</option>
              <option value="bumblebee">Bumblebee</option>
              <option value="emerald">Emerald</option>
              <option value="corporate">Corporate</option>
              <option value="synthwave">Synthwave</option>
              <option value="retro">Retro</option>
              <option value="cyberpunk">Cyberpunk</option>
            </select>
          </div>
        </>
      ) : (
        <p>Please log in to access settings.</p>
      )}
    </Layout>
  );
}
