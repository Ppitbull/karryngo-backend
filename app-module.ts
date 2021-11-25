import { AuthModule } from "./karryngo_modules/bussiness/authentification/auth.module";
import { ProfilRoutingModule } from "./karryngo_modules/bussiness/authentification/profil.module";
import { ChatRoutingModule } from "./karryngo_modules/bussiness/chat/chat.module";
import { PaiementMethodRoutingModule } from "./karryngo_modules/bussiness/paiementmethod/paiementmethod.module";
import { RapportCountyRoutingModule } from "./karryngo_modules/bussiness/rapport/country/rapport_country_routing.module";
import { RapportProviderRoutingModule } from "./karryngo_modules/bussiness/rapport/provider/rapport_provider.module";
import { RapportServiceRoutingModule } from "./karryngo_modules/bussiness/rapport/service/rapport_service_routing.module";
import { ProviderTransportServiceRoutingModule } from "./karryngo_modules/bussiness/service/provider_transport_service/provider_routing.module";
import { TransportServiceRoutingModule } from "./karryngo_modules/bussiness/service/transport_service/transport_service.module";
import { TransactionRoutingModule } from "./karryngo_modules/bussiness/service/transport_transaction/transaction_service.module";
import { TestRoutingModule } from "./karryngo_modules/bussiness/test/test_routing.module";

export const ModulesRouting=[
    AuthModule,
    ProfilRoutingModule,
    ChatRoutingModule,
    PaiementMethodRoutingModule,
    TransportServiceRoutingModule,
    ProviderTransportServiceRoutingModule,
    TransactionRoutingModule,
    RapportProviderRoutingModule,
    RapportCountyRoutingModule,
    RapportServiceRoutingModule,
    TestRoutingModule
]