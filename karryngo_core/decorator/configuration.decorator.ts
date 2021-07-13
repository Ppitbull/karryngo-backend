import { KarryngoConfigurationServiceFactory } from "../config/KarryngoConfigurationServiceFactory";
import { InjectorContainer } from "../lifecycle/injector_container";

export function ConfigService()
{
    return (target: any, property: string) => {
        target[property] = InjectorContainer.getInstance()
        .getInstanceOf<KarryngoConfigurationServiceFactory>(KarryngoConfigurationServiceFactory)
        .getInstance();;
    };
}