import { Controller, KFileStorage } from "../../karryngo_core/decorator/dependecy_injector.decorator";
import { UserManagerService } from "../services/usermanager/usermanager.service";
import { Request, Response } from "express";
import { KarryngoFileStorage } from "../../karryngo_core/fs/KarryngoFileStorage";
import { ActionResult } from "../../karryngo_core/utils/ActionResult";

@Controller()
@KFileStorage()
export class ControlBussTest
{
    fs:any={};
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
        // console.log(req.body)
        // console.log(req);
        let buf:Buffer = Buffer.from(req.body.file,'base64');
        this.fs.put(buf,req.body.options)
        .then((data:ActionResult)=>{
            response.status(200).json({
                resultCode:data.resultCode,
                message:data.message,
                result:data.result
            })
        })
        .catch((error:ActionResult)=>{
            response.status(500).json({
                resultCode:error.resultCode,
                message:error.message,
                result:error.result
            })
        })
        
    }
    testdownLoad(req:Request,response:Response)
    {
        console.log("Test dowload");
        this.fs.get(req.body.filename)
        .then((data:ActionResult)=>response.status(200).json(data.toString()))
        .catch((error:ActionResult)=> response.status(500).json(error.toString()))
    }
}