import { Redis } from 'ioredis';
import type { PresenceUser } from '@platform/shared';
const ADD_SCRIPT=`redis.call('SADD', KEYS[1], ARGV[1]); redis.call('SET', KEYS[2], ARGV[2], 'EX', ARGV[3]); return redis.call('SCARD', KEYS[1])`;
export class PresenceManager {constructor(private readonly redis:Redis,private readonly ttl:number){}
 async connect(userId:string,socketId:string):Promise<number>{return Number(await this.redis.eval(ADD_SCRIPT,2,`presence:${userId}:sockets`,`presence:${userId}:socket:${socketId}`,socketId,socketId,String(this.ttl)));}
 async disconnect(userId:string,socketId:string):Promise<number>{await this.redis.del(`presence:${userId}:socket:${socketId}`);await this.redis.srem(`presence:${userId}:sockets`,socketId);return this.redis.scard(`presence:${userId}:sockets`);}
 async list():Promise<PresenceUser[]>{const keys=await this.redis.keys('presence:*:sockets');const users:PresenceUser[]=[];for(const key of keys){const id=key.slice(9,-8);const sockets=await this.redis.smembers(key);let live=0;for(const socket of sockets){if(await this.redis.exists(`presence:${id}:socket:${socket}`))live++;else await this.redis.srem(key,socket);}if(live)users.push({userId:id,connections:live,lastSeen:new Date().toISOString(),status:'online'});}return users.sort((a,b)=>a.userId.localeCompare(b.userId));}
}
