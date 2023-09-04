import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
  cookies.delete("auth");
  throw redirect(307, "/login");
}
