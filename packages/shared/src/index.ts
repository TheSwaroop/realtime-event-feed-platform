import { z } from 'zod';

export const EventTypeSchema = z.enum(['USER_JOINED','USER_LEFT','MESSAGE_CREATED','SYSTEM_NOTIFICATION','TASK_UPDATED','CUSTOM_EVENT']);
export type EventType = z.infer<typeof EventTypeSchema>;
export const EventSchema = z.object({
  eventId: z.string().uuid(), eventType: EventTypeSchema, timestamp: z.string().datetime(),
  userId: z.string().min(1).max(100), payload: z.record(z.unknown()), version: z.literal(1),
  roomId: z.string().min(1).max(80).optional(), idempotencyKey: z.string().min(1).max(120).optional()
});
export type PlatformEvent = z.infer<typeof EventSchema>;
export const PublishEventSchema = z.object({eventType:EventTypeSchema,userId:z.string().min(1).max(100),payload:z.record(z.unknown()),roomId:z.string().min(1).max(80).optional(),idempotencyKey:z.string().min(1).max(120).optional()});
export type PublishEventInput = z.infer<typeof PublishEventSchema>;
export interface PresenceUser { userId:string; connections:number; lastSeen:string; status:'online'|'offline' }
export interface Ack<T=unknown> { ok:boolean; data?:T; error?:string }
export interface PaginatedEvents { items:PlatformEvent[]; page:number; limit:number; total:number; pages:number }
export const RoomSchema=z.object({roomId:z.string().min(1).max(80).regex(/^[a-zA-Z0-9:_-]+$/)});
