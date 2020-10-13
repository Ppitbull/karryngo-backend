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
