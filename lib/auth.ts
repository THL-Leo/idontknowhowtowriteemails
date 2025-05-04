import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Helper to get the current session
export async function getSession() {
  try {
    return await getServerSession(authOptions);
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

// Helper to get the current user
export async function getCurrentUser() {
  const session = await getSession();
  return session?.user;
}

// Middleware to require authentication
export async function requireAuth() {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/");
  }
  
  return user;
}