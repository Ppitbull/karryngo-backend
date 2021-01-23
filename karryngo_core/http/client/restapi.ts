/**
 * @description Cette classe est un outils pour acceder a tout api Rest et est basé sur le package
 *  axios (https://www.npmjs.com/package/axios) 
 * @author Cédric Nguendap
 * @created 17/11/2020
 */
import { Http } from "../http";
import axios from 'axios';
import { KarryngoCore } from "../../decorator/core.decorator";

@KarryngoCore()
export class RestApi extends Http
{
    request():any
    {
        return axios;
    }
}