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
exports.EmailService = void 0;
const ActionResult_1 = require("../../../karryngo_core/utils/ActionResult");
const nodemailer_1 = __importDefault(require("nodemailer"));
const decorator_1 = require("../../../karryngo_core/decorator");
const decorator_2 = require("../../../karryngo_core/decorator");
const constants_1 = __importDefault(require("../../../config-files/constants"));
const servicebill_1 = require("../payment/entities/servicebill");
const usermanager_service_1 = require("../usermanager/usermanager.service");
const EntityID_1 = require("../../../karryngo_core/utils/EntityID");
let EmailService = class EmailService {
    constructor(userManagerService) {
        this.userManagerService = userManagerService;
    }
    send(email) {
        return new Promise((resolve, reject) => {
            let sender = nodemailer_1.default.createTransport({
                host: this.configService.getValueOf('mail').host,
                port: this.configService.getValueOf('mail').port,
                secure: this.configService.getValueOf('mail').secure,
                auth: this.configService.getValueOf('mail').auth
            });
            sender.sendMail(email.toString(), (error, infos) => {
                let result = new ActionResult_1.ActionResult();
                if (error) {
                    result.resultCode = ActionResult_1.ActionResult.UNKNOW_ERROR;
                    result.result = error;
                    reject(result);
                }
                else
                    resolve(result);
            });
        });
    }
    sendBill(serviceId, response) {
        // console.log("serviceId", serviceId)
        var bill = new servicebill_1.ServiceBill();
        var email;
        var templateFile;
        // email.from("billing@karryngo.com");
        this.db.findInCollection(constants_1.default.collections.requestservice, { "_id": serviceId })
            .then((res) => {
            var service = res.result[0];
            bill.setTitle(service.title);
            bill.setDate(service.bill.date);
            bill.setAmount(service.bill.amount);
            bill.setTypeService(res.result[0].type);
            bill.setTransactionRef(service.transactions[0].refID);
            bill.setServiceAddress(service);
            return service;
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Description service foundds",
                result: res.result,
            });
        })
            .then((serv) => {
            // console.log("bill :", serv);
            let payerID = new EntityID_1.EntityID();
            payerID.setId(serv.idRequester);
            return this.userManagerService.findUserById(payerID)
                .then((payer) => {
                var user = payer.result[0];
                bill.setPayer(user);
                let idSelectedProvider = new EntityID_1.EntityID();
                idSelectedProvider.setId(serv.idSelectedProvider);
                return this.userManagerService.findUserById(idSelectedProvider);
                // let payerID: EntityID=new EntityID();
                // payerID.setId(serv.idRequester);
                // return this.userManagerService.findUserById(payerID);
            });
        })
            .then((payer) => {
            var user = payer.result[0];
            bill.setPayee(user);
            // console.log("bill :", bill);
            this.billEmaill(bill);
            return bill;
        })
            .then((result) => {
            response.status(200).json({
                resultCode: ActionResult_1.ActionResult.SUCCESS,
                message: "Bill sent successfully",
                result: result,
            });
            // console.log("templateFile;;", templateFile)
            // var nodemailer = require('nodemailer');
            // var transporter = nodemailer.createTransport({
            //   host: 'mail.helpone23.co.za',
            //   port: 587,
            //   tls: {
            //         rejectUnauthorized: false
            //     },
            //   auth: {
            //     user: 'verification@helpone23.co.za',
            //     pass: 'verification2020'
            //   }
            // });
            // var mailOptions = {
            //   from: 'verification@helpone23.co.za',
            //   to: 'jlandry476@yahoo.fr',
            //   subject: 'Sending Email using Node.js',
            //   // text: 'That was easy!'
            //   html: 'templateRendered',
            // };
            // transporter.sendMail(mailOptions, function(error, info){
            //     if (error) {
            //         console.log(error);
            //     } else {
            //         console.log('Email sent: ' + info.response);
            //     }
            // });
        })
            .catch((error) => {
            response.status(200).json({
                message: "Description not found",
                resultCode: ActionResult_1.ActionResult.RESSOURCE_NOT_FOUND_ERROR
            });
        });
        return new Promise((resolve, reject) => {
            let sender = nodemailer_1.default.createTransport({
                host: this.configService.getValueOf('mail').host,
                port: this.configService.getValueOf('mail').port,
                secure: this.configService.getValueOf('mail').secure,
                auth: this.configService.getValueOf('mail').auth
            });
            // sender.sendMail(serviceId,(error,infos)=>{
            //     let result:ActionResult=new ActionResult();
            //     if(error) {
            //         result.resultCode=ActionResult.UNKNOW_ERROR;
            //         result.result=error;
            //         reject(result);
            //     }
            //     else resolve(result);
            // })
        });
    }
    billEmaill(bill) {
        // const ejs = require("ejs")
        const fs = require('fs');
        fs.readFile(__dirname + '/templates/bill.html', 'utf8', function (err, html) {
            // ejs.renderFile(__dirname + '/templates/bill.ejs', {bill: bill}, (err, html) => {
            if (err) {
                console.log(err);
            }
            else {
                html = html.toString().replace("{title}", bill.title);
                html = html.toString().replace("{method}", "Toupesu");
                html = html.toString().replace("{ref}", bill.transactionRef);
                html = html.toString().replace("{amount}", bill.amount);
                html = html.toString().replace("{total}", bill.amount);
                html = html.toString().replace("{service}", bill.type_service);
                html = html.toString().replace("{date}", bill.date.getFullYear() + " - " + bill.date.getMonth() + " - " + bill.date.getDay());
                html = html.toString().replace("{username}", bill.payer.name);
                html = html.toString().replace("{name}", bill.payer.name);
                html = html.toString().replace("{address}", bill.payer.address);
                html = html.toString().replace("{email}", bill.payer.email);
                // console.log("output", output)
                const hogan = require('hogan.js');
                const templateCompiled = hogan.compile(html);
                const templateRendered = templateCompiled.render({ text: "HelloWorld" });
                var transporter = nodemailer_1.default.createTransport({
                    host: 'mail.helpone23.co.za',
                    port: 587,
                    tls: {
                        rejectUnauthorized: false
                    },
                    auth: {
                        user: 'verification@helpone23.co.za',
                        pass: 'verification2020'
                    }
                });
                var mailOptions = {
                    from: 'verification@helpone23.co.za',
                    to: bill.payer.email,
                    subject: 'Invoice transaction #' + bill.transactionRef,
                    text: 'That was easy!',
                    html: templateRendered,
                };
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    }
                    else {
                        console.log('Email sent: ' + info.response);
                    }
                });
            }
        });
    }
};
__decorate([
    (0, decorator_2.DBPersistence)(),
    __metadata("design:type", Object)
], EmailService.prototype, "db", void 0);
__decorate([
    (0, decorator_1.ConfigService)(),
    __metadata("design:type", Object)
], EmailService.prototype, "configService", void 0);
EmailService = __decorate([
    (0, decorator_1.Service)(),
    __metadata("design:paramtypes", [usermanager_service_1.UserManagerService])
], EmailService);
exports.EmailService = EmailService;
