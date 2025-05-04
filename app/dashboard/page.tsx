import { requireAuth } from "@/lib/auth";
import DashboardClientPage from "./client";

export default async function DashboardPage() {
  const user = await requireAuth();
  
  return <DashboardClientPage initialUser={user} />;
}