import { randomUUID } from 'node:crypto';
import { PublishEventSchema, type PublishEventInput, type PlatformEvent } from '@platform/shared';
import type { EventRepository } from '../repositories/event.repository.js';
import type { Server } from 'socket.io';
export class EventService { constructor(private readonly repository:EventRepository,private readonly io:Server,private readonly maxHistory:number){}
 async publish(input:PublishEventInput):Promise<PlatformEvent>{const valid=PublishEventSchema.parse(input);if(valid.idempotencyKey){const existing=await this.repository.findByIdempotencyKey(valid.userId,valid.idempotencyKey);if(existing)return existing;}const event:PlatformEvent={...valid,eventId:randomUUID(),timestamp:new Date().toISOString(),version:1};const saved=await this.repository.save(event);await this.repository.trim(this.maxHistory);if(saved.roomId)this.io.to(saved.roomId).emit('event:new',saved);else this.io.emit('event:new',saved);return saved;}
 async recent(page=1,limit=25,eventType?:string){return this.repository.list(page,Math.min(Math.max(limit,1),100),eventType);}
 async byId(id:string){return this.repository.get(id);}
}
