import { redirect } from "next/navigation";

// Middleware normally handles this, but this is a fallback.
export default function RootPage() {
  redirect("/en");
}
