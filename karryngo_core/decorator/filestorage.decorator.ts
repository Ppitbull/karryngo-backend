import { KarryngoFileStorageFactory } from "../fs/KarryngoFileStorageFactory";
import { InjectorContainer } from "../lifecycle/injector_container";

export function KFileStorage()
{
    return (target: any, property: string) => {
        console.log("Injector ")
        console.log( 
            InjectorContainer.getInstance()
            .getInstanceOf<KarryngoFileStorageFactory>(KarryngoFileStorageFactory)    
        )

        target[property] = InjectorContainer.getInstance()
        .getInstanceOf<KarryngoFileStorageFactory>(KarryngoFileStorageFactory)
        .getInstance();;
    }; 
}