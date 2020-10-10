/**
@author: Cedric nguendap
@description: classe permettant de gerer les fichiers de configuration 
    de type JSON
@see KarryngoConfigurationService
@created: 21/09/2020
*/
import { ConfigurationException } from "../exception/ConfigurationException";
import { KarryngoConfigurationService } from "./KarryngoConfigurationService";

export class JsonFileConfigurationService extends KarryngoConfigurationService
{

    /**
     * @inheritdoc
     */
    protected encode(content: String):any {
        let result;
        try {
            result=JSON.parse(content.toString());
        } catch (error) {
            throw new ConfigurationException(ConfigurationException.PARSE_FILE,"error when encoding to JSON. content: "+content);
        }
        return result;
    }

    /**
     * @inheritdoc
     */
    protected decode(content: any): String {
        let result;
        try {
            result=JSON.stringify(content);
        } catch (error) {
            throw new ConfigurationException(ConfigurationException.PARSE_FILE,"error when decoding from JSON. content: "+content);
        }
        return result;
    }
    
}
