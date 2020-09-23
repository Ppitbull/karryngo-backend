/*
@author: Cedric nguendap
@description: classe permettant de gerer les fichiers de configuration 
    de type Xml
@see KarryngoConfigurationService
@created: 21/09/2020
*/

import { KarryngoConfigurationService } from "./KarryngoConfigurationService";

export class XmlFileConfigurationService extends KarryngoConfigurationService
{

    /**
     * 
     * @see KarryngoConfigurationService.encode() 
     */
    protected encode(content: String) {
        throw new Error("Method not implemented.");
    }

    /**
     * 
     * @see KarryngoConfigurationService.decode() 
     */
    protected decode(content: any): String {
        throw new Error("Method not implemented.");
    }
    
}
