import {Server} from "socket.io";
import Redis from "ioredis";
const pub = new Redis({
    host: "quick-chat-quick-chat-2.i.aivencloud.com",
    port: 21399,
    username: "default",
    password: "AVNS_tZj29YHPCdHUV8mnAYG",
});
  const sub = new Redis({
    host: "quick-chat-quick-chat-2.i.aivencloud.com",
    port: 21399,
    username: "default",
    password: "AVNS_tZj29YHPCdHUV8mnAYG",
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
        sub.on('message',(channel,message)=>{
            if(channel==='MESSAGES'){
                io.emit('message',message);
            }
        })
    }
    get io(){
        return this._io;
    }
}
export default SocketService;