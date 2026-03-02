import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.js",
  out: "./db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: "postgres://postgres@localhost:5432/postgres",
  },
});
