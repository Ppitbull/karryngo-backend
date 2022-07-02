"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModulesRouting = void 0;
const admin_action_module_1 = require("./karryngo_modules/bussiness/service/utils/admin/admin_action.module");
const auth_module_1 = require("./karryngo_modules/bussiness/authentification/auth.module");
const profil_module_1 = require("./karryngo_modules/bussiness/authentification/profil.module");
const chat_module_1 = require("./karryngo_modules/bussiness/chat/chat.module");
const paiementmethod_module_1 = require("./karryngo_modules/bussiness/paiementmethod/paiementmethod.module");
const rapport_country_routing_module_1 = require("./karryngo_modules/bussiness/rapport/country/rapport_country_routing.module");
const rapport_provider_module_1 = require("./karryngo_modules/bussiness/rapport/provider/rapport_provider.module");
const rapport_service_routing_module_1 = require("./karryngo_modules/bussiness/rapport/service/rapport_service_routing.module");
const provider_routing_module_1 = require("./karryngo_modules/bussiness/service/provider_transport_service/provider_routing.module");
const transport_service_module_1 = require("./karryngo_modules/bussiness/service/transport_service/transport_service.module");
const transaction_service_module_1 = require("./karryngo_modules/bussiness/service/transport_transaction/transaction_service.module");
const test_routing_module_1 = require("./karryngo_modules/bussiness/test/test_routing.module");
exports.ModulesRouting = [
    auth_module_1.AuthModule,
    profil_module_1.ProfilRoutingModule,
    chat_module_1.ChatRoutingModule,
    paiementmethod_module_1.PaiementMethodRoutingModule,
    transport_service_module_1.TransportServiceRoutingModule,
    provider_routing_module_1.ProviderTransportServiceRoutingModule,
    transaction_service_module_1.TransactionRoutingModule,
    rapport_provider_module_1.RapportProviderRoutingModule,
    rapport_country_routing_module_1.RapportCountyRoutingModule,
    rapport_service_routing_module_1.RapportServiceRoutingModule,
    test_routing_module_1.TestRoutingModule,
    admin_action_module_1.AdminActionRoutingModule
];
