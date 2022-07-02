import { ConfigurableApp } from "../../../karryngo_core/config/ConfigurableApp.interface";
import { ActionResult } from "../../../karryngo_core/utils/ActionResult";
import { Email } from "./entities/email";
import nodemailer from "nodemailer";
import { Service, ConfigService } from "../../../karryngo_core/decorator";
import { Controller, DBPersistence } from "../../../karryngo_core/decorator";
import { PersistenceManager } from "../../../karryngo_core/persistence/PersistenceManager.interface";
import Configuration from "../../../config-files/constants";
import { Request, Response } from "express";
import {ServiceBill} from "../payment/entities/servicebill";
import {TransportServiceType} from "../../bussiness/service/entities/transportservicetype";
import {UserManagerService} from "../usermanager/usermanager.service";
import { EntityID } from "../../../karryngo_core/utils/EntityID";
import { User } from "../usermanager/entities/User";

@Service()
export class EmailService
{
    @DBPersistence()
    private db:PersistenceManager;

    @ConfigService()
    private configService:ConfigurableApp;
    
    constructor(private userManagerService:UserManagerService){}

    send(email:Email):Promise<ActionResult>
    {
        return new Promise<ActionResult>((resolve,reject)=>
        {
            let sender=nodemailer.createTransport({
                host:this.configService.getValueOf('mail').host,
                port:this.configService.getValueOf('mail').port,
                secure:this.configService.getValueOf('mail').secure,
                auth:this.configService.getValueOf('mail').auth
            });
            sender.sendMail(email.toString(),(error,infos)=>{
                let result:ActionResult=new ActionResult();
                if(error) {
                    result.resultCode=ActionResult.UNKNOW_ERROR;
                    result.result=error;
                    reject(result);
                }
                else resolve(result);
            })
        });
    }


    sendBill(serviceId:String, response:any):Promise<ActionResult>
    {
        // console.log("serviceId", serviceId)
        var bill = new ServiceBill();
        var email: Email;
        var templateFile;
        // email.from("billing@karryngo.com");
        this.db.findInCollection(Configuration.collections.requestservice,{"_id": serviceId})
        .then((res:ActionResult)=>
        {
            var service: TransportServiceType = res.result[0]
            bill.setTitle(service.title);
            bill.setDate(service.bill.date);
            bill.setAmount(service.bill.amount);
            bill.setTypeService(res.result[0].type);
            bill.setTransactionRef(service.transactions[0].refID);
            bill.setServiceAddress(service)
            return service;
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Description service foundds",
                result:res.result,
            });
        })
        .then((serv) => {
            // console.log("bill :", serv);
            let payerID: EntityID=new EntityID();
            payerID.setId(serv.idRequester);
            return this.userManagerService.findUserById(payerID)
            .then((payer) => {
                var user: User = payer.result[0];
                bill.setPayer(user)
                let idSelectedProvider: EntityID=new EntityID();
                idSelectedProvider.setId(serv.idSelectedProvider);
                return this.userManagerService.findUserById(idSelectedProvider);
                // let payerID: EntityID=new EntityID();
                // payerID.setId(serv.idRequester);
                // return this.userManagerService.findUserById(payerID);
            })
        })
        .then((payer) => {
            var user: User = payer.result[0];
            bill.setPayee(user)
            // console.log("bill :", bill);

            this.billEmaill(bill);
            return bill;
            

            
        })
        .then((result) => {
            
            response.status(200).json({
                resultCode:ActionResult.SUCCESS,
                message:"Bill sent successfully",
                result:result,
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
        .catch((error:ActionResult)=>
        {
            response.status(200).json({
                message:"Description not found",
                resultCode:ActionResult.RESSOURCE_NOT_FOUND_ERROR
            });
        });


        return new Promise<ActionResult>((resolve,reject)=>
        {
            let sender=nodemailer.createTransport({
                host:this.configService.getValueOf('mail').host,
                port:this.configService.getValueOf('mail').port,
                secure:this.configService.getValueOf('mail').secure,
                auth:this.configService.getValueOf('mail').auth
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



    billEmaill(bill){
        // const ejs = require("ejs")
        const fs = require('fs');
            fs.readFile(__dirname + '/templates/bill.html', 'utf8', function(err, html){
            // ejs.renderFile(__dirname + '/templates/bill.ejs', {bill: bill}, (err, html) => {
                if(err){
                    console.log(err);
                }else{
                    html = html.toString().replace("{title}", bill.title)
                    html = html.toString().replace("{method}", "Toupesu")
                    html = html.toString().replace("{ref}", bill.transactionRef)
                    html = html.toString().replace("{amount}", bill.amount)
                    html = html.toString().replace("{total}", bill.amount)
                    html = html.toString().replace("{service}", bill.type_service)
                    html = html.toString().replace("{date}", bill.date.getFullYear()+" - "+bill.date.getMonth()+" - "+ bill.date.getDay())
                    html = html.toString().replace("{username}", bill.payer.name)
                    html = html.toString().replace("{name}", bill.payer.name)
                    html = html.toString().replace("{address}", bill.payer.address)
                    html = html.toString().replace("{email}", bill.payer.email)
                    // console.log("output", output)
                    const hogan = require('hogan.js');
                    const templateCompiled = hogan.compile(html);
                    const templateRendered = templateCompiled.render({text: "HelloWorld"});

                    var transporter = nodemailer.createTransport({
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
                        subject: 'Invoice transaction #'+bill.transactionRef,
                        text: 'That was easy!',
                        html: templateRendered,
                    };
                    transporter.sendMail(mailOptions, function(error, info){
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Email sent: ' + info.response);
                        }
                    });
                }
            })

        
    }


    
}