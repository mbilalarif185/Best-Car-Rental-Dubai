import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

/**
 * /logout - redirects to API which clears session cookie and redirects to /
 * Prevents static prerender error on build.
 */
export default function LogoutPage() {
  redirect("/api/auth/logout");
}
