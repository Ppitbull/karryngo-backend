"use strict";
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
exports.RapportService = void 0;
const constants_1 = __importDefault(require("../../../../config-files/constants"));
const decorator_1 = require("../../../../karryngo_core/decorator");
const ActionResult_1 = require("../../../../karryngo_core/utils/ActionResult");
const transportservicetype_1 = require("../../service/entities/transportservicetype");
let RapportService = class RapportService {
    getServiceListByTime(request, response) {
        let state = request.params.state || "all";
        let year = request.params.year || "all";
        let month = request.params.month || "all";
        let day = request.params.day || "all";
        let findQuery = [];
        if (state != "all") {
            findQuery.push({
                $unwind: "$transactions"
            }, {
                $match: {
                    $or: [
                        { state },
                        {
                            $expr: {
                                $eq: ["$idSelectedTransaction", "$transactions._id"]
                            },
                            "transactions.state": state
                        }
                    ]
                }
            });
        }
        if (year != "all") {
            findQuery.push({
                $addFields: { convertedDate: { $toDate: "$publicationDate" } }
            }, {
                $addFields: {
                    dateValues: [
                        { "year": { $year: "$convertedDate" } },
                        { "month": { $month: "$convertedDate" } },
                        { "day": { $dayOfMonth: "$convertedDate" } }
                    ]
                }
            }, {
                $match: { "dateValues.year": parseInt(year) }
            });
            if (month != "all") {
                findQuery.push({
                    $match: { "dateValues.month": parseInt(month) }
                });
                if (day != "all") {
                    findQuery.push({
                        $match: { "dateValues.day": parseInt(day) }
                    });
                }
            }
            findQuery.push({
                $unset: ["dateValues", "convertedDate"]
            });
        }
        this.db.findDepthInCollection(constants_1.default.collections.requestservice, findQuery)
            .then((result) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "List of services",
                result: result.result.map((service) => {
                    let ser = service;
                    ser.transactions = [service.transactions];
                    return ser;
                })
            });
        })
            .catch((error) => {
            response.status(500).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
    getServicePriceByTime(request, response) {
        let state = request.params.state || "";
        let year = request.params.year || "all";
        let month = request.params.month || "all";
        let day = request.params.day || "all";
        let findQuery = [];
        if (state == "" || state == transportservicetype_1.TransportServiceTypeState.SERVICE_INIT_STATE || state == transportservicetype_1.TransportServiceTypeState.SERVICE_IN_DISCUSS_STATE) {
            return response.status(400).json({
                resultCode: ActionResult_1.ActionResult.INVALID_ARGUMENT,
                message: "Invalid service state parameter"
            });
        }
        findQuery.push({
            $unwind: "$transactions"
        }, {
            $match: {
                $or: [
                    { state },
                    {
                        $expr: {
                            $eq: ["$idSelectedTransaction", "$transactions._id"]
                        },
                        "transactions.state": state
                    }
                ]
            }
        });
        if (year != "all") {
            findQuery.push({
                $addFields: { convertedDate: { $toDate: "$publicationDate" } }
            }, {
                $addFields: {
                    dateValues: [
                        { "year": { $year: "$convertedDate" } },
                        { "month": { $month: "$convertedDate" } },
                        { "day": { $dayOfMonth: "$convertedDate" } }
                    ]
                }
            }, {
                $match: { "dateValues.year": parseInt(year) }
            });
            if (month != "all") {
                findQuery.push({
                    $match: { "dateValues.month": parseInt(month) }
                });
                if (day != "all") {
                    findQuery.push({
                        $match: { "dateValues.day": parseInt(day) }
                    });
                }
            }
            findQuery.push({
                $unset: ["dateValues", "convertedDate"]
            });
        }
        findQuery.push({
            $project: {
                total: {
                    $toInt: "$suggestedPrice"
                }
            }
        }, {
            $group: {
                _id: null,
                count: {
                    $sum: 1
                },
                total: {
                    $sum: "$total"
                }
            }
        });
        this.db.findDepthInCollection(constants_1.default.collections.requestservice, findQuery)
            .then((result) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Price of services according to parameters",
                result: {
                    numberOfService: result.result[0].count,
                    price: result.result[0].total
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
    getServices(request, response) {
        let userid = request.params.iduser || "";
        let type = request.params.type || "";
        let state = request.params.state || "all";
        let year = request.params.year || "all";
        let month = request.params.month || "all";
        let day = request.params.day || "all";
        let findQuery = [];
        if (userid == "") {
            return response.status(400).json({
                resultCode: ActionResult_1.ActionResult.INVALID_ARGUMENT,
                message: "User parameter is not optional"
            });
        }
        if (type == "provider") {
            findQuery.push({
                $match: {
                    "idSelectedProvider": userid
                }
            });
        }
        else if (type == "requester") {
            findQuery.push({
                $match: {
                    "idRequester": userid
                }
            });
        }
        else {
            return response.status(400).json({
                resultCode: ActionResult_1.ActionResult.INVALID_ARGUMENT,
                message: "Invalid type parameter"
            });
        }
        if (state != "all") {
            findQuery.push({
                $match: {
                    "state": state
                }
            });
        }
        if (year != "all") {
            findQuery.push({
                $addFields: { convertedDate: { $toDate: "$publicationDate" } }
            }, {
                $addFields: {
                    dateValues: [
                        { "year": { $year: "$convertedDate" } },
                        { "month": { $month: "$convertedDate" } },
                        { "day": { $dayOfMonth: "$convertedDate" } }
                    ]
                }
            }, {
                $match: { "dateValues.year": parseInt(year) }
            });
            if (month != "all") {
                findQuery.push({
                    $match: { "dateValues.month": parseInt(month) }
                });
                if (day != "all") {
                    findQuery.push({
                        $match: { "dateValues.day": parseInt(day) }
                    });
                }
            }
            findQuery.push({
                $unset: ["dateValues", "convertedDate"]
            });
        }
        this.db.findDepthInCollection(constants_1.default.collections.requestservice, findQuery)
            .then((result) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: type == "provider" ? "List of provided services" : "List of Requested services",
                result: result
            });
        })
            .catch((error) => {
            response.status(500).json({
                resultCode: error.resultCode,
                message: error.message
            });
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], RapportService.prototype, "db", void 0);
RapportService = __decorate([
    (0, decorator_1.Controller)()
], RapportService);
exports.RapportService = RapportService;
