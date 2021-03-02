/**
@author: Cedric nguendap
@description: Ce fichier contient les décorateurs permetant de faire l'injecteur de dépendance
    de facon dynamique
@created: 10/10/2020
*/
import { ConfigurableApp } from "../config/ConfigurableApp.interface";
import { KarryngoConfigurationServiceFactory } from "../config/KarryngoConfigurationServiceFactory";
import { KarryngoFileStorage } from "../fs/KarryngoFileStorage";
import { KarryngoFileStorageFactory } from "../fs/KarryngoFileStorageFactory";
import { InjectorContainer } from "../lifecycle/injector_container";
import { Type } from "../lifecycle/type.interface";
import { KarryngoPersistenceManagerFactory } from "../persistence/KarryngoPersistenceManagerFactory";


/**
 * @description Cette fonction est un décorateur permetant de gérer les dépendance
 *  en tant que service.
 * @return function qui définis le comportement l'ors de l'appel du décorateur @Service
 */
export function Service<T extends Type<any> > () 
{
    return (target :T)=>
    {
        //obtention de l'instance du containeur d'injection
        const injector=InjectorContainer.getInstance();

        //resolution et  sauvegarde des dépendances
        injector.resolveAndSave<T>(target);
    }
}

/**
 * @description Cette fonction est un décorateur permetant de gérer les dépendance
 *  en tant que controlleur.
 * @return function qui définis le comportement l'ors de l'appel du décorateur @Controller
 */
export function Controller<T extends Type<any> >()
{
    return (target:T)=>
    {
        //obtention de l'instance du containeur d'injection
        const injector=InjectorContainer.getInstance();

        //resolution des dépendances
        injector.resolve<T>(target);
    }
}

export function DBPersistence() {
    return function <T extends Type<any> >(constructor: T) {
        return class extends constructor {
            db=InjectorContainer.getInstance()
                .getInstanceOf<KarryngoPersistenceManagerFactory>(KarryngoPersistenceManagerFactory)
                .getInstance();            
        }
    }
}

export function ConfigService()
{
    return function <T extends Type<any> >(constructor: T) {
        return class extends constructor {
            configService:ConfigurableApp=InjectorContainer.getInstance()
                .getInstanceOf<KarryngoConfigurationServiceFactory>(KarryngoConfigurationServiceFactory)
                .getInstance();            
        }
    } 
}

export function KFileStorage()
{
    return function <T extends Type<any> >(constructor: T) {
        return class extends constructor {
            fs:KarryngoFileStorage=InjectorContainer.getInstance()
                .getInstanceOf<KarryngoFileStorageFactory>(KarryngoFileStorageFactory)
                .getInstance();            
        }
    } 
}