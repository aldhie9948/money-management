import { errorHandler } from "$lib/server/middleware.js";
import { json } from "@sveltejs/kit";
import { APP_USER, APP_PASS } from "$env/static/private";

export async function POST({ request, cookies }) {
  try {
    const { password, username } = await (<
      Promise<{ username: string; password: string }>
    >request.json());
    if (!username || !password) throw new Error("username or password empty");
    if (username !== APP_USER && password !== APP_PASS)
      throw new Error("invalid username or password");
    cookies.set("auth", "example-token", {
      secure: false,
      maxAge: 3600 * 1000 * 24,
      path: "/",
    });
    return json({ message: true });
  } catch (err) {
    errorHandler(err);
  }
}
