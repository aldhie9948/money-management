import { error } from "@sveltejs/kit";
export function errorHandler(err: unknown) {
  let message = "";
  if (err instanceof Error) {
    console.log(err);
    message = err.message;
  }
  throw error(400, message);
}
