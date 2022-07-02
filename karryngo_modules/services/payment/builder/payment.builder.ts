import Configuration from "../../../../config-files/constants";
import { Service } from "../../../../karryngo_core/decorator";
import { DynamicLoader } from "../../../../karryngo_core/utils/DynamicLoader";

@Service()
export class PaymentBuilderService
{
    static getPaiementType()
    {
        return DynamicLoader.load(`${Configuration.path_for_bussiness_service}/payment/api/${Configuration.api_for_payement}/${Configuration.api_for_payement}paymentmethodfactory`)
    }
} 