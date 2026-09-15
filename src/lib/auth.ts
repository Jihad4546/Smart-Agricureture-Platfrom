import { betterAuth } from "better-auth";
import { Pool } from "pg";

export const auth = betterAuth({
  database: new Pool({
    connectionString: process.env.DATABASE_URL,
  }),
  emailAndPassword: { 
    enabled: true, 
  }, 
 user: {
  additionalFields: {
    role: {
      type: "string",
      defaultValue: "farmer",
      input: true,
    },
    status: {
      type: "string",
      defaultValue: "active",
      input: true,
    },
  }
 } 
});