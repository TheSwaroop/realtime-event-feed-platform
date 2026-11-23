import 'dotenv/config';
import { z } from 'zod';
const schema=z.object({NODE_ENV:z.enum(['development','test','production']).default('development'),PORT:z.coerce.number().default(4000),FRONTEND_ORIGIN:z.string().default('http://localhost:5173'),DATABASE_URL:z.string().default('postgres://eventfeed:eventfeed@localhost:5432/eventfeed'),REDIS_URL:z.string().default('redis://localhost:6379'),MAX_HISTORY_SIZE:z.coerce.number().int().positive().default(500),PRESENCE_TTL_SECONDS:z.coerce.number().positive().default(90)});
export const env=schema.parse(process.env);
