/*
@author: Cedric nguendap
@description: interface fournissant les services de persistance dans la bd ou autres systémes
    stockage
@created: 23/09/2020
*/

import { SerializableEntity } from "../SerializableEntity";
import { ActionResult } from "../utils/ActionResult";

export interface PersistenceManager
{
    /**
     * @description permet de creer une nouvelle entité dans le support de stockage (bd,fichier...)
     * @param entity entité a rendre pesistant
     * @async
     * @returns une promise qui est resolu si l'opération est effectué avec succées et 
     *  rejecter dans le cas contraire
     */
    create(entity:SerializableEntity):Promise<ActionResult>;
    
    /**
     * @description permet de mettre a jour une entité dans le support de stockage (bd,fichier...)
     * @param entity entité a rendre pesistant
     * @async
     * @returns une promise qui est resolu si l'opération est effectué avec succées et 
     *  rejecter dans le cas contraire
     */
    update(entity:SerializableEntity):Promise<ActionResult>;

    /**
     * @description permet de supprimer une entité dans le support de stockage (bd,fichier...)
     * @param entity entité a rendre pesistant
     * @async
     * @returns une promise qui est resolu si l'opération est effectué avec succées et 
     *  rejecter dans le cas contraire
     */
    delete(entity:SerializableEntity):Promise<ActionResult>;
}