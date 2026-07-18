import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";

function createAuth() {
  const client = new MongoClient(process.env.MONGODB_URI);
  const db = client.db();

  return betterAuth({
    database: mongodbAdapter(db, { client }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [nextCookies()],
  });
}

export const auth = createAuth();
