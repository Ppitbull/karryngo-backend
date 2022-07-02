"use strict";
/**
@author Cedric Nguendap
@description Cette classe represente le gestionnaire de service vue du fournisseur
@created 30/11/2020
*/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderServiceManager = void 0;
const EntityID_1 = require("../../../../karryngo_core/utils/EntityID");
const providerservice_1 = require("../entities/providerservice");
const location_1 = require("../../../services/geolocalisation/entities/location");
const ActionResult_1 = require("../../../../karryngo_core/utils/ActionResult");
const vehicle_1 = require("../entities/vehicle");
const constants_1 = __importDefault(require("../../../../config-files/constants"));
const Address_1 = require("../../../services/usermanager/entities/Address");
const file_service_1 = require("../../../services/files/file.service");
const servicemanager_1 = require("../transport_transaction/servicemanager");
const usermanager_service_1 = require("../../../services/usermanager/usermanager.service");
const decorator_1 = require("../../../../karryngo_core/decorator");
let ProviderServiceManager = class ProviderServiceManager {
    constructor(fileUploadService, serviceManager, userManager) {
        this.fileUploadService = fileUploadService;
        this.serviceManager = serviceManager;
        this.userManager = userManager;
    }
    findProvider(request, response, idService, service, message = "Description saved successfully") {
        let listProvider = [];
        //recherche des fournisseur a proximité
        this.serviceManager.rechercherFounisseurProximite(service.from)
            .then((data) => {
            listProvider = [...data.result];
            return this.serviceManager.rechercherFounisseurProximite(service.to);
        })
            .then((data) => {
            listProvider.push(...data.result);
            // console.log("listProvider: ",listProvider.map((pro:ProviderService)=> pro.deservedZone))
            listProvider = listProvider.filter((provider, index) => listProvider.map((pro) => pro.idProvider.toString()).indexOf(provider.idProvider.toString()) !== index);
            return this.db.updateInCollection(constants_1.default.collections.requestservice, {
                "_id": idService
            }, {
                $push: {
                    "providers": data.result.map((pro) => pro._id)
                }
            }, {});
        })
            .then((data) => Promise.all(listProvider.map((pro) => this.userManager.findUserById(pro.idProvider))))
            .then((data) => {
            response.status(201).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message,
                result: {
                    "idService": service.id.toString(),
                    "providers": listProvider.map((pro, index) => {
                        return {
                            service: pro.toString(),
                            provider: data[index].result[0].toString()
                        };
                    })
                }
            });
        })
            .catch((error) => {
            response.status(500).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
    /**
     * @description permet a un provider d'ajouter un service qu'il est capable de rendre
     * @param request requete de l'utilisation
     * @param response reponse a envoyer a l'utilisateur
     */
    addService(request, response) {
        let idService = new EntityID_1.EntityID();
        let pservice = new providerservice_1.ProviderService(idService);
        let idProviderService = request.decoded.id;
        pservice.title = request.body.title;
        pservice.description = request.body.description;
        pservice.idProvider = idProviderService;
        request.body.zones = request.body.zones || [];
        pservice.deservedZone = request.body.zones.map((local) => {
            let location = new location_1.Location();
            location.hydrate(local);
            return location;
        });
        request.body.Vehicles = request.body.vehicles || [];
        pservice.listVehicle = request.body.vehicles.map((v) => {
            let vehi = new vehicle_1.Vehicle();
            vehi.hydrate(v);
            return vehi;
        });
        pservice.addressForVerification = request.body.addressForVerification.map((add) => {
            let ad = new Address_1.Address(new EntityID_1.EntityID());
            ad.hydrate(add);
            return ad;
        });
        //upload file
        this.fileUploadService.uploadAll(request.body.documents)
            .then((result) => {
            // console.log(result);
            return this.db.addToCollection(constants_1.default.collections.provider, pservice);
        })
            .then((data) => {
            //add provider information to db
            response.status(201).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Provider service successfully created",
                result: {
                    idService: idService.toString()
                }
            });
        })
            .catch((error) => {
            response.status(500).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
    /**
     * @description permet de mettre a jour les informations lié a un service d'un fournisseur
     * @param request requete de l'utilisateur
     * @param response reponse a envoyer a l'utilisateur
     */
    updateService(request, response) {
    }
    /**
     * @description permet de supprimer un service
     * @param request requete de l'utilisateur
     * @param response reponse a envoyer a l'utilisateur'
     */
    deleteService(request, response) {
    }
    getServiceList(request, response) {
        this.db.findInCollection(constants_1.default.collections.provider, {})
            .then((data) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Provider service found",
                result: data.result,
            });
        })
            .catch((error) => {
            response.status(200).json({
                message: "Provider service not found",
                resultCode: ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR
            });
        });
    }
    getService(request, response) {
        let idProviderService = request.params.idProviderService;
        console.log(request.params.idProviderService);
        this.db.findInCollection(constants_1.default.collections.provider, { "providerId": idProviderService })
            .then((data) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Provider service found",
                result: data.result[0],
            });
        })
            .catch((error) => {
            response.status(404).json({
                message: "Provider service not found",
                resultCode: ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR,
                result: []
            });
        });
    }
    addVehicle(request, response) {
        let vehicule = new vehicle_1.Vehicle();
        vehicule.hydrate(request.body);
        this.db.updateInCollection(constants_1.default.collections.provider, { "providerId": request.decoded.id }, {
            $push: { "vehicles": vehicule.toString() }
        })
            .then((data) => response.status(201).json({
            resultCode: ActionResult_1.ActionResult.SUCCESS,
            message: "Vehicle added successfully",
            result: {
                idVehicle: vehicule._id.toString()
            }
        }))
            .catch((error) => response.status(500).json({
            resultCode: error.resultCode,
            message: error.message
        }));
    }
    getVehicleList(request, response) {
        this.db.findInCollection(constants_1.default.collections.provider, { "providerId": request.decoded.id }, {
            "vehicles": true
        })
            .then((data) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "successful vehicle recovery",
                result: data.result.length > 0 ? data.result[0].vehicles : []
            });
        })
            .catch((error) => response.status(500).json({
            resultCode: error.resultCode,
            message: error.message
        }));
    }
    getZoneList(request, response) {
        this.db.findInCollection(constants_1.default.collections.provider, { "providerId": request.decoded.id }, {
            projection: { "zones": true, _id: false }
        })
            .then((data) => response.status(200).json({
            resultCode: ActionResult_1.ActionResult.SUCCESS,
            message: "successful zones recovery",
            result: data.result[0].zones
        }))
            .catch((error) => response.status(500).json({
            resultCode: error.resultCode,
            message: error.message
        }));
    }
    addZone(request, response) {
        let zone = new location_1.Location();
        zone.hydrate(request.body);
        //on recupere le service en fonction de son id
        this.db.updateInCollection(constants_1.default.collections.provider, { "providerId": request.decoded.id }, {
            $push: { "zones": zone.toString() }
        })
            .then((data) => response.status(201).json({
            resultCode: ActionResult_1.ActionResult.SUCCESS,
            message: "Location added successfully",
            result: {
                idLocation: zone._id.toString()
            }
        }))
            .catch((error) => response.status(500).json({
            resultCode: error.resultCode,
            message: error.message
        }));
    }
    findServiceProviderByZone(request, response) {
        console.log("request", request.body.start);
        console.log("request", request.body.end);
        let startZone = new location_1.Location();
        startZone.hydrate(request.body.start);
        let endZone = new location_1.Location();
        endZone.hydrate(request.body.end);
        let listProvider = [];
        this.serviceManager.rechercherFounisseurProximite(startZone)
            .then((data) => {
            listProvider = [...data.result];
            return this.serviceManager.rechercherFounisseurProximite(endZone);
        })
            .then((data) => {
            listProvider.push(...data.result);
            listProvider = listProvider.filter((provider, index) => listProvider.map((pro) => pro.idProvider.toString()).indexOf(provider.idProvider.toString()) !== index);
            return Promise.resolve(new ActionResult_1.ActionResult());
        })
            .then((data) => Promise.all(listProvider.map((pro) => this.userManager.findUserById(pro.idProvider))))
            .then((data) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Provider found",
                result: {
                    "providers": listProvider.map((pro, index) => {
                        return {
                            service: pro.toString(),
                            provider: data[index].result[0].toString()
                        };
                    })
                }
            });
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], ProviderServiceManager.prototype, "db", void 0);
ProviderServiceManager = __decorate([
    (0, decorator_1.Controller)(),
    __metadata("design:paramtypes", [file_service_1.FileService,
        servicemanager_1.ServiceManager,
        usermanager_service_1.UserManagerService])
], ProviderServiceManager);
exports.ProviderServiceManager = ProviderServiceManager;
