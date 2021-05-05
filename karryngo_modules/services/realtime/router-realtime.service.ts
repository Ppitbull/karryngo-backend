import { Service } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import {Server, Socket } from "socket.io"
import { RealTimeMessage } from "./realtime-protocole";

export interface RealTimeDiscussion {
    idUser1:EntityID,
    idUser2:EntityID,
    idProjet:EntityID
}

@Service()
export class RealTimeRouterService
{
    listDiscution:RealTimeDiscussion[]=[];
    listUserConnected:Map<string,Socket>=new Map<string,Socket>();
    constructor(){}

    hasUser(userID:string):boolean
    {
        return this.listUserConnected.has(userID)
    }
    removeUser(userID:string)
    {
        if(this.hasUser(userID)) this.listUserConnected.delete(userID);
    }

    addUser(userID:string,socket:Socket)
    {
        if(this.hasUser(userID)) return;
        this.listUserConnected.set(userID,socket);
    }
    send(data:RealTimeMessage)
    {
        if(!this.hasUser(data.receiverID)) return;
        this.listUserConnected.get(data.receiverID)?.emit(data.type.toString(),data);
    }
    addDiscussion(discution:RealTimeDiscussion):void
    {
        for(let disc of this.listDiscution)
        {
            if( discution.idUser1.toObject()==disc.idUser1.toObject() ||
                discution.idUser1.toObject()== disc.idUser2.toString() ||
                discution.idUser2.toObject() == disc.idUser1.toString() ||
                discution.idUser2.toString() == disc.idUser2.toString()) return;
        }
    }

    getDiscutionByUserId(userId:EntityID):RealTimeDiscussion | null
    {
        for(let disc of this.listDiscution)
        {
            if(disc.idUser1.toString() == userId.toString() || disc.idUser2.toString() == userId.toString()) return disc
        }
        return null;
    }

    getDiscutionById(discId:EntityID):RealTimeDiscussion | null
    {
        for(let disc of this.listDiscution)
        {
            if(disc.idProjet.toString() == discId.toString() ) return disc
        }
        return null;
    }

}