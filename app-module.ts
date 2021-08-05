import { AuthModule } from "./karryngo_modules/bussiness/authentification/auth.module";
import { ProfilRoutingModule } from "./karryngo_modules/bussiness/authentification/profil.module";
import { ChatRoutingModule } from "./karryngo_modules/bussiness/chat/chat.module";
import { ProviderTransportServiceRoutingModule } from "./karryngo_modules/bussiness/service/provider_transport_service/provider_routing.module";
import { TransportServiceRoutingModule } from "./karryngo_modules/bussiness/service/transport_service/transport_service.module";
import { TransactionRoutingModule } from "./karryngo_modules/bussiness/service/transport_transaction/transaction_service.module";

export const ModulesRouting=[
    AuthModule,
    ProfilRoutingModule,
    ChatRoutingModule,
    TransportServiceRoutingModule,
    ProviderTransportServiceRoutingModule,
    TransactionRoutingModule
]