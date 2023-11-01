import { createClient } from "@vercel/kv";

export const client = createClient({
  url: process.env["KV_REST_API_URL"] as string,
  token: process.env["KV_REST_API_TOKEN"] as string,
});