import type { Socket } from 'socket.io';
export class RoomManager {async join(socket:Socket,roomId:string):Promise<void>{if(!/^[a-zA-Z0-9:_-]{1,80}$/.test(roomId))throw new Error('Invalid room identifier');await socket.join(roomId);}async leave(socket:Socket,roomId:string):Promise<void>{await socket.leave(roomId);}}
