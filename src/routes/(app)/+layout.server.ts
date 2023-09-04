import { redirect } from "@sveltejs/kit";

export function load({ cookies }) {
  const auth = cookies.get("auth");
  if (auth === undefined) throw redirect(307, "/login");
}
