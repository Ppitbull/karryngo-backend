import { InjectorContainer } from "../lifecycle/injector_container";
import { Type } from "../lifecycle/type.interface";

export function KarryngoCore<T extends Type<any> >()
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
