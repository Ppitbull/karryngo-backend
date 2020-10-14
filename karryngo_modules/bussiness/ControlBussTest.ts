import { Controller } from "../../karryngo_core/decorator/dependecy_injector.decorator";
import { UserManagerService } from "../services/usermanager/usermanager.service";

@Controller()
export class ControlBussTest
{
    constructor(private userMaganer:UserManagerService){}

    getAllUser(req:any,response:any)
    {
        this.userMaganer.findAll()
        .then((data)=>response.status(200).json(data))
        .catch((error)=> response.status(200).json(error));
    }
}