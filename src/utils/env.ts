import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PROTECTED_PATHS: z.string().default("/auth/reset-password,/profile"),
    SUPABASE_SERVICE_ROLE_KEY: z.string().default("dummy_service_role_key"),
    OMDB_API_KEY: z.string().min(1).optional(),
    WYZIE_API_KEY: z.string().min(1).optional(),
  },
  client: {
    NEXT_PUBLIC_TMDB_ACCESS_TOKEN: z.string().min(1),
    NEXT_PUBLIC_SUPABASE_URL: z.string().default("https://dummy.supabase.co"),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().default("dummy_anon_key"),
    NEXT_PUBLIC_CAPTCHA_SITE_KEY: z.string().default("dummy_captcha_key"),
    NEXT_PUBLIC_AVATAR_PROVIDER_URL: z.string().default("https://api.dicebear.com/7.x/bottts/svg"),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_TMDB_ACCESS_TOKEN: process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY,
    NEXT_PUBLIC_AVATAR_PROVIDER_URL: process.env.NEXT_PUBLIC_AVATAR_PROVIDER_URL,
  },
});
