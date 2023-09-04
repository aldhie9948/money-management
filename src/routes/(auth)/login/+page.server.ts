import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
  const auth = cookies.get("auth");
  if (auth) throw redirect(307, "/");
}
