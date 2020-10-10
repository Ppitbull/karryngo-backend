/**
@author: Cedric nguendap
@description: interface fournissant les services de persistance dans la bd ou autres systémes
    stockage
@created: 23/09/2020
*/

import { SerializableEntity } from "../SerializableEntity";
import { ActionResult } from "../utils/ActionResult";
import { KarryngoPersistentEntity } from "./KarryngoPersistentEntity";

export interface PersistenceManager
{
    /**
     * @description Cette methode permet de se connecter a la base de données. celle si construit
     *  automatiquement la chaine de connexion a partir des informations de connexion contenu dans
     *  le fichier de configuration persistance.json
     * @returns une promise promise qui est résolut si la connexion s'éffectue avec succées et rejecter
     * dans le cas contraire
     */
    connect():Promise<ActionResult>;


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

    /**
     * @description Cette methode permet d'obtenir le queryBuilder (le constructeur de requete) 
     *  afin d'effectuer des requetes dans la base de données.
     * @param entity entité a sérialiser dans la bd
     * @returns un builder. pour la version 1.0 de Karryngo le builder creer est celui de mongodb
     *  et un builder approprié seras créer dans une prochaine Version
     * @requires Mongoose.QueryBuilder
     */
    getQueryBuilder(entity:SerializableEntity):any;
}