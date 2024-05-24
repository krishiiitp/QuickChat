import {Server} from "socket.io";
import Redis from "ioredis";
import {redis_host_id,redis_pwd} from "./secrets";
import prismaClient from "./prisma";
const pub = new Redis({
    host: redis_host_id,
    port: 21399,
    username: "default",
    password: redis_pwd,
});
  const sub = new Redis({
    host: redis_host_id,
    port: 21399,
    username: "default",
    password: redis_pwd,
});
class SocketService {
    private _io: Server;
    constructor() {
        console.log("Init Socket Service...");
        this._io=new Server({
            cors : {
                allowedHeaders : ['*'],
                origin : '*',
            }
        });
        sub.subscribe('MESSAGES');
    }
    public initListeners(){
        const io=this.io;
        console.log("Init Socket Listeners...");
        io.on("connect",(socket)=>{
            console.log('New Socket Connected : ',socket.id);
            socket.on("event:message",async({message}:{message : string})=>{
                console.log("New Message Received : ",message);
                //publish this message to Redis
                await pub.publish('MESSAGES',JSON.stringify({message}));
            });
        });
        sub.on('message',async (channel,message)=>{
            if(channel==='MESSAGES'){
                io.emit('message',message);
                //PostgreSQL DB store
                await prismaClient.message.create({
                    data: {
                        text : message,
                    }
                });
            }
        })
    }
    get io(){
        return this._io;
    }
}
export default SocketService;