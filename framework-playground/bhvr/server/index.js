import { Hono } from "hono";
import { cors } from "hono/cors";
import { VERSION } from "@app/shared";

const app = new Hono();
app.use("/*", cors());

app.get("/health", (c) => {
  return c.json({ status: "ok", version: VERSION });
});

export default { port: 3000, fetch: app.fetch };
