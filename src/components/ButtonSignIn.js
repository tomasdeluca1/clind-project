import { useUser } from "@auth0/nextjs-auth0/client";

export default function ButtonSignIn() {
  const { user } = useUser();

  return (
    <a
      href={user ? "/api/auth/logout" : "/api/auth/login"}
      className="btn btn-primary"
    >
      {user ? "Sign Out" : "Sign In"}
    </a>
  );
}
