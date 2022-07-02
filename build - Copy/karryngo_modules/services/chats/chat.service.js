"use strict";
/**
@author Cedric Nguendap
@description Cette classe permet d'envoyer des notifications
@created 19/01/2021
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
exports.ChatService = void 0;
const constants_1 = __importDefault(require("../../../config-files/constants"));
const decorator_1 = require("../../../karryngo_core/decorator");
const EntityID_1 = require("../../../karryngo_core/utils/EntityID");
const discussion_1 = require("./discussion");
const message_1 = require("./message");
let ChatService = class ChatService {
    findDiscussByTransactionAndSendMessage(transaction, message) {
        this.findDisccussByTransaction(transaction)
            .then((result) => {
            return this.send(message, result.result.id);
        });
    }
    findDisccussByTransactionID(idTransaction) {
        return new Promise((resolve, reject) => {
            this.db.findInCollection(constants_1.default.collections.chat, { "idTransaction": idTransaction.toString() }, { "chats": false }).then((result) => {
                let disc = new discussion_1.Discussion();
                disc.hydrate(result.result[0]);
                result.result = disc;
                resolve(result);
            });
        });
    }
    findDisccussByTransaction(transaction) {
        return new Promise((resolve, reject) => {
            this.db.findInCollection(constants_1.default.collections.chat, { "idTransaction": transaction.id.toString() }, { "chats": false }).then((result) => {
                let id = new EntityID_1.EntityID();
                id.setId(result.result[0]._id);
                let disc = new discussion_1.Discussion(id);
                // console.log("Discuss ",result.result[0])
                disc.hydrate(result.result[0]);
                result.result = disc;
                resolve(result);
            });
        });
    }
    send(message, idDiscuss = new EntityID_1.EntityID().toString()) {
        return this.db.updateInCollection(constants_1.default.collections.chat, { "_id": idDiscuss.toString() }, {
            $push: { "chats": message.toString() }
        }, {});
    }
    readAll(idUser) {
        return this.db.findInCollection(constants_1.default.collections.chat, { "_id": idUser }, {}, 100);
    }
    startDiscussion(discution) {
        return this.db.addToCollection(constants_1.default.collections.chat, discution);
    }
    getUnreadDiscution() {
        return this.db.findInCollection(constants_1.default.collections.chat, { "chats": {
                $elemMatch: {
                    "read": 0
                }
            } });
    }
    findMessageByDiscussionId(messageId, discussID) {
        return this.db.findInCollection(constants_1.default.collections.chat, {
            "_id": discussID.toString(),
            "chats._id": messageId.toString()
        });
    }
    markAsRead(idDiscuss, idMessage) {
        return this.db.updateInCollection(constants_1.default.collections.chat, {
            "_id": idDiscuss,
            "chats._id": idMessage
        }, {
            $set: {
                "chats.$.read": 1,
                "read": 0
            }
        });
    }
    getDiscussionList(idUser, numpage = 0, limit = 10) {
        return new Promise((resolve, reject) => {
            let page = limit * numpage;
            this.db.findDepthInCollection(constants_1.default.collections.chat, [
                {
                    "$match": {
                        "$or": [
                            { "inter1": idUser.toString() },
                            { "inter2": idUser.toString() }
                        ]
                    }
                },
                {
                    "$unset": "chats"
                },
                {
                    "$skip": page
                },
                {
                    "$limit": limit
                }
            ])
                .then((result) => {
                result.result = result.result.map((data) => {
                    let id = new EntityID_1.EntityID();
                    id.setId(data._id);
                    let dispo = new discussion_1.Discussion(id);
                    dispo.hydrate(data);
                    return dispo;
                });
                resolve(result);
            });
        });
    }
    getDiscussionChatList(idDiscuss, numpage = 1, limit = 10) {
        return new Promise((resolve, reject) => {
            let page = limit * numpage;
            this.db.findDepthInCollection(constants_1.default.collections.chat, [
                {
                    "$match": {
                        "_id": idDiscuss.toString()
                    }
                },
                {
                    "$unwind": {
                        path: "$chats"
                    }
                },
                {
                    "$replaceRoot": {
                        "newRoot": {
                            "chats": "$chats"
                        }
                    }
                },
                {
                    "$addFields": {
                        "chats.dateISO": {
                            "$toDate": "$chats.date"
                        }
                    }
                },
                {
                    "$sort": {
                        "chats.dateISO": -1
                    }
                },
                {
                    "$skip": page
                },
                {
                    "$limit": limit
                }
            ]).then((result) => {
                result.result = result.result.map((c) => {
                    let message = new message_1.Message();
                    message.hydrate(c.chats);
                    return message;
                });
                resolve(result);
            });
        });
    }
};
__decorate([
    (0, decorator_1.DBPersistence)(),
    __metadata("design:type", Object)
], ChatService.prototype, "db", void 0);
ChatService = __decorate([
    (0, decorator_1.Service)()
], ChatService);
exports.ChatService = ChatService;
