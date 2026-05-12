import { redirect } from "next/navigation";

/** /admin → /admin/dashboard (middleware handles auth redirects). */
export default function AdminIndex() {
    redirect("/admin/dashboard");
}
