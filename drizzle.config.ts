import * as dotenv from "dotenv"
import { defineConfig } from 'drizzle-kit';

// Load environment variables from .env.local
dotenv.config({path: ".env.local"})

// Check if DATABASE_URL is set
if(!process.env.DATABASE_URL){
    console.error("DATABASE_URL not found in .env.local file");
    throw new Error("DB url not found")
}


export default defineConfig({
  out: './drizzle',
  schema: './lib/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  migrations:{
    table: "__drizzle_migrations",
    schema: "public"
  },
  verbose: true,
  strict: true,
});
