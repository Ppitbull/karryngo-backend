import { Controller } from "../../karryngo_core/decorator/dependecy_injector.decorator";
import { UserManagerService } from "../services/usermanager/usermanager.service";
import { Request, Response } from "express";
import { KarryngoFileStorage } from "../../karryngo_core/fs/KarryngoFileStorage";

@Controller()
export class ControlBussTest
{
    //,private kfile:KarryngoFileStorage
    constructor(private userMaganer:UserManagerService){}

    getAllUser(req:any,response:any)
    {
        this.userMaganer.findAll()
        .then((data)=>response.status(200).json(data))
        .catch((error)=> response.status(500).json(error));
    }
    testUpload(req:Request,response:any)
    {
        // console.log(req)
        // console.log(req);
        
    }
}