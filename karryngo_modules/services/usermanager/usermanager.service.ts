/**
@author: Cedric nguendap
@description: Cette classe permet represente le service de gestion des utilisateurs
@created 13/10/2020
*/

import { Service ,DBPersistence } from "../../../karryngo_core/decorator/dependecy_injector.decorator";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { User } from "./entities/User";


@Service()
@DBPersistence()
export class UserManagerService
{
    protected db:any ={};

    /**
     * @description Cette classe permet de creer un nouvel utilisateur
     * @param {User} user utilisateur que l'on veut creer
     * @return {Promise<ActionResult>} la promise est rejecté si une erreur est rencontré
     *  et elle est resolu si tout se passe bien
     */
    newUser(user:User):Promise<ActionResult>
    {
        return this.db.getQueryBuilder(user).create(user);
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
            this.db.getQueryBuilder(new User()).find({"adresse.email":email},(err:any,people:any)=>
            {
                let action=new ActionResult();
                if(err)
                {
                    action.message="Error";
                    action.description=err;
                    action.resultCode=ActionResult.UNKNOW_ERROR;
                    reject(action);
                }
                else
                {
                    //si aucun utilisateur n'est trouvé on rejete la promise
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
                            p.hydrate(person.toObject({ virtuals: true }));
                            return p;
                        });
                        resolve(action);
                    }
                }
            });

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
            this.db.getQueryBuilder(new User()).findById(id.toString(),(err:any,people:any)=>
            {
                let action=new ActionResult();
                if(err)
                {
                    action.message="Error";
                    action.description=err;
                    action.resultCode=ActionResult.UNKNOW_ERROR;
                    reject(action);
                }
                else
                {
                    if(people.length==0)
                    {
                        action.resultCode=ActionResult.RESSOURCE_NOT_FOUND_ERROR;
                        action.message="Error";
                        action.description="User not found";
                        reject(action);
                    }
                    else
                    {
                        action.result=people.map((person:any)=>
                        {
                            let p:User=new User();
                            p.hydrate(person.toObject({ virtuals: true }));
                            return p;
                        });
                        resolve(action);
                    }
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
    saveUser(user:User):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            let action=new ActionResult();
            this.db.getQueryBuilder(user).save(user)
            .then((data:any)=> 
            {
                action.result=data;
                console.log("saved" , data);
                resolve(action);
            })
            .catch((err:any) => 
            {
                action.resultCode=ActionResult.NETWORK_ERROR;
                action.message="Erreur";
                action.description="Unable to save user";
                reject(action);
            });
        });
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
            this.db.getQueryBuilder(new User()).find((err:any,people:any)=>
            {
                let action=new ActionResult();
                if(err)
                {
                    action.message="Erreur";
                    action.description=err;
                    action.resultCode=ActionResult.UNKNOW_ERROR;
                    reject(action);
                }
                else
                {
                    action.result=people.map((person:any)=>
                    {
                        let p:User=new User();
                        p.hydrate(person.toObject({ virtuals: true }));
                        return p;
                    });
                    resolve(action);
                }
            });
        })
    }
}