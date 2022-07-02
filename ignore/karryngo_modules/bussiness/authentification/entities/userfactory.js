"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFactory = void 0;
const companyserviceprovider_1 = require("./companyserviceprovider");
const serviceprovider_1 = require("./serviceprovider");
const companyservicerequester_1 = require("./companyservicerequester");
const servicerequester_1 = require("./servicerequester");
class UserFactory {
    static getInstance(user) {
        let cus;
        if (user.isProvider) {
            if (user.isCompany)
                cus = new companyserviceprovider_1.CompagnyServiceProvider();
            else
                cus = new serviceprovider_1.ServiceProvider();
        }
        else {
            if (user.isCompany)
                cus = new companyservicerequester_1.CompagnyServiceRequester();
            else
                cus = new servicerequester_1.ServiceRequester();
        }
        cus.hydrate(user);
        return cus;
    }
}
exports.UserFactory = UserFactory;
