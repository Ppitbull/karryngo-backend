import { InjectorContainer } from "../lifecycle/injector_container";
import { KarryngoPersistenceManagerFactory } from "../persistence/KarryngoPersistenceManagerFactory";

export function DBPersistence() {
    return (target: any, property: string) => {
        target[property] = InjectorContainer.getInstance()
        .getInstanceOf<KarryngoPersistenceManagerFactory>(KarryngoPersistenceManagerFactory)
        .getInstance();;
    };
}
