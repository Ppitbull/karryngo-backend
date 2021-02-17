/**
@author: Cedric nguendap
@description: Cette classe permet represente le service de gestion des utilisateurs
@created 13/10/2020
*/

import Configuration from "../../../config-files/constants";
import { Service ,DBPersistence } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { Customer } from "../../bussiness/authentification/entities/customer";
import { CrudService } from "../crud/crud.service";
import { User } from "./entities/User";


@Service()
@DBPersistence()
export class UserManagerService
{
    protected db:any ={};//PersistenceManager

    constructor(private crud:CrudService){}
    /**
     * @description Cette classe permet de creer un nouvel utilisateur
     * @param {User} user utilisateur que l'on veut creer
     * @return {Promise<ActionResult>} la promise est rejecté si une erreur est rencontré
     *  et elle est resolu si tout se passe bien
     */
    newUser(user:User):Promise<ActionResult>
    {
        return this.db.addToCollection("Users",user)
    }

    /**
     * @description Cette méthode permet de recherche un utilisateur a partir de son adresse email
     * @param {String} email Email de l'utilisateur dont on veu connaitre l'existance
     * @return {Promise<ActionResult>} la promise est rejecté si une erreur est rencontré (l'ors de l
     *  la connexion a la bd...) ou si aucun utilisateur ayant cette adresse email n'est trouvé et
     *  elle est résolu dans le cas contraire
     */
    findUserByEmail(email:String):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            this.db.findInCollection("Users",{"address.email":email},1)
            .then((result:ActionResult)=>
            {
                console.log('Result Exist ',result)
                let people:Record<string, any>[]= result.result;
                let action=new ActionResult(); //si aucun utilisateur n'est trouvé on rejete la promise
                if(people.length==0)
                {
                    action.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    action.message="Error";
                    action.description="User not found";
                    reject(action);
                }
                //sinon on resout la promise avec les différents comptes utilisateur trouvé
                else
                {
                    action.result=people.map((person:any)=>
                    {
                        let p:User=new User();
                        p.hydrate(person);
                        return p;
                    });
                    resolve(action);                    
                }
            }).catch((error:ActionResult)=>reject(error));

        });
    }

    /**
     * @description Cette methode permet de rechercher un utilisateur a partir de son identifiant
     * @param {EntityID} id identifiant de l'utilisateur trouvé 
     * @return {Promise<ActionResult>} la promise est rejecté si une erreur est rencontré (l'ors de l
     *  la connexion a la bd...) ou si aucun utilisateur ayant cette identifiant n'est trouvé et
     *  elle est résolu dans le cas contraire
     */
    findUserById(id:EntityID):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            this.db.findInCollection(Configuration.collections.user,{"_id":id.toString()},1)
            .then((result:ActionResult)=>
            {
                let action=new ActionResult();
                let people:Record<string, any>[]=result.result;
                if(people.length==0)
                {
                    action.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                    action.message="User not found";
                    reject(action);
                }
                else
                {
                    action.result=people.map((person:any)=>
                    {
                        let p:Customer=new Customer();
                        p.hydrate(person);
                        return p;
                    });
                    resolve(action);
                }
                
            });
        });
    }

    /**
     * @description Cette methode permet de sauvegarder les informations d'un utilisateur. Elle 
     *   est utiliser lorsque les informations de l'utilisateur déjà présent en base de données on 
     *  subis une modification
     * @param {User} user utilisateur a sauvegarder 
     * @return {Promise<ActionResult>} la promise est rejecté si une erreur est rencontré (l'ors de l
     *  la connexion a la bd...)  et
     *  elle est résolu dans le cas contraire
     */
    saveUser(idUser:EntityID,toupdate:Record<string, any>):Promise<ActionResult>
    {
        return this.db.updateInCollection(Configuration.collections.user,{"_id":idUser.toString()},toupdate,{})
    }

    /**
     * @description Cette methode permet d'obtenir tous les utilisateurs présent en base de données
     * @return {Promise<ActionResult>} la promise est rejecté si une erreur est rencontré (l'ors de l
     *  la connexion a la bd...)  elle est résolu avec la liste des utilisateurs dans le cas contraire 
     */
    findAll():Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {

            this.db.findInCollection(Configuration.collections.user,{},50).
            then((result:ActionResult)=>
            {
                let action=new ActionResult();
                action.result=result.result.map((person:any)=>
                {
                    let p:Customer=new Customer();
                    p.hydrate(person);
                    return p;
                });
                resolve(action);
            })
            .catch((error:ActionResult)=>reject(error));
        })
    }
}