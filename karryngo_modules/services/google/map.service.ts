import { Service } from "../../../karryngo_core/decorator";
import { GOAuth2Service } from "./oauth2.service";

@Service()
export class GMapService
{
    constructor(private goauth2:GOAuth2Service){}

    
}