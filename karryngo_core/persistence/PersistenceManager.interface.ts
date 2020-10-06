/*
@author: Cedric nguendap
@description: interface fournissant les services de persistance dans la bd ou autres systémes
    stockage
@created: 23/09/2020
*/

import { ActionResult } from "../utils/ActionResult";
import { KarryngoPersistentEntity } from "./KarryngoPersistentEntity";

export interface PersistenceManager
{
    /**
     * @description permet de creer une nouvelle entité dans le support de stockage (bd,fichier...)
     * @param entity entité a rendre pesistant
     * @async
     * @returns une promise qui est resolu si l'opération est effectué avec succées et 
     *  rejecter dans le cas contraire
     */
    create(entity:KarryngoPersistentEntity):Promise<ActionResult>;
    
    /**
     * @description permet de mettre a jour une entité dans le support de stockage (bd,fichier...)
     * @param entity entité a rendre pesistant
     * @async
     * @returns une promise qui est resolu si l'opération est effectué avec succées et 
     *  rejecter dans le cas contraire
     */
    update(entity:KarryngoPersistentEntity):Promise<ActionResult>;

    /**
     * @description permet de supprimer une entité dans le support de stockage (bd,fichier...)
     * @param entity entité a rendre pesistant
     * @async
     * @returns une promise qui est resolu si l'opération est effectué avec succées et 
     *  rejecter dans le cas contraire
     */
    delete(entity:KarryngoPersistentEntity):Promise<ActionResult>;

    
}