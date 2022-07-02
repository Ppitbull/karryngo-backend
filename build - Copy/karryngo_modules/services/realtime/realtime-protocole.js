"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RealTimeChatMessageUpdateDataType = exports.RealTimeTransactionError = exports.RealTimeTransactionMessageType = exports.RealTimeChatError = exports.RealTimeChatMessageType = exports.RealTimeInitErrorType = exports.RealTimeInitMessageType = exports.UNKNOW_RECEIVER = exports.UNKNOW_SENDER = exports.RealTimeEvent = void 0;
var RealTimeEvent;
(function (RealTimeEvent) {
    RealTimeEvent["REALTIME_CONNEXION_STARTED"] = "realtime_start";
    RealTimeEvent["REALTIME_CONNEXION_ENDED"] = "realtime_end";
})(RealTimeEvent = exports.RealTimeEvent || (exports.RealTimeEvent = {}));
exports.UNKNOW_SENDER = "unknow";
exports.UNKNOW_RECEIVER = "unknow";
var RealTimeInitMessageType;
(function (RealTimeInitMessageType) {
    RealTimeInitMessageType["NEW_CONNECTION"] = "connect";
    RealTimeInitMessageType["LOGGIN"] = "loggin";
    RealTimeInitMessageType["LOGOUT"] = "logout";
    RealTimeInitMessageType["DISCONNECT"] = "disconnect";
})(RealTimeInitMessageType = exports.RealTimeInitMessageType || (exports.RealTimeInitMessageType = {}));
var RealTimeInitErrorType;
(function (RealTimeInitErrorType) {
    RealTimeInitErrorType[RealTimeInitErrorType["SUCCESS"] = 0] = "SUCCESS";
    RealTimeInitErrorType[RealTimeInitErrorType["USER_ALREADY_EXIST"] = 1] = "USER_ALREADY_EXIST";
    RealTimeInitErrorType[RealTimeInitErrorType["INVALID_USER_ID"] = 2] = "INVALID_USER_ID";
    RealTimeInitErrorType[RealTimeInitErrorType["INVALID_USER_TOKEN"] = 3] = "INVALID_USER_TOKEN";
    RealTimeInitErrorType[RealTimeInitErrorType["UNKNOW_ERROR"] = 4] = "UNKNOW_ERROR";
    RealTimeInitErrorType[RealTimeInitErrorType["USER_ALREADY_CONNECTED"] = 5] = "USER_ALREADY_CONNECTED";
    RealTimeInitErrorType["CONNEXION_ERROR"] = "connect_error";
})(RealTimeInitErrorType = exports.RealTimeInitErrorType || (exports.RealTimeInitErrorType = {}));
var RealTimeChatMessageType;
(function (RealTimeChatMessageType) {
    RealTimeChatMessageType["SEND_MESSAGE"] = "send_message";
    RealTimeChatMessageType["GET_DISCUSSIONS"] = "get_discussions";
    RealTimeChatMessageType["GET_MESSAGE_OF_DISCUSION"] = "get_message_discussion";
    RealTimeChatMessageType["MARK_MESSAGE_AS_READ"] = "mark_message_as_read";
})(RealTimeChatMessageType = exports.RealTimeChatMessageType || (exports.RealTimeChatMessageType = {}));
var RealTimeChatError;
(function (RealTimeChatError) {
    RealTimeChatError[RealTimeChatError["MESSAGE_NOT_EXIST"] = 0] = "MESSAGE_NOT_EXIST";
})(RealTimeChatError = exports.RealTimeChatError || (exports.RealTimeChatError = {}));
var RealTimeTransactionMessageType;
(function (RealTimeTransactionMessageType) {
    RealTimeTransactionMessageType["GET_TRANSACTION"] = "get_transaction";
})(RealTimeTransactionMessageType = exports.RealTimeTransactionMessageType || (exports.RealTimeTransactionMessageType = {}));
var RealTimeTransactionError;
(function (RealTimeTransactionError) {
    RealTimeTransactionError[RealTimeTransactionError["TRANSACTION_NOT_EXIST"] = 0] = "TRANSACTION_NOT_EXIST";
})(RealTimeTransactionError = exports.RealTimeTransactionError || (exports.RealTimeTransactionError = {}));
var RealTimeChatMessageUpdateDataType;
(function (RealTimeChatMessageUpdateDataType) {
    RealTimeChatMessageUpdateDataType["PACKAGE_UPDATED"] = "package_update";
})(RealTimeChatMessageUpdateDataType = exports.RealTimeChatMessageUpdateDataType || (exports.RealTimeChatMessageUpdateDataType = {}));
/**
 * Protocole d'échange enter pair dans le temps réel
 * 1: (Client) lance une requete de type RealTimeMessageType.LOGGIN et avec pour data
 *  :: token: le token du client dans le champ data
 *  :: id: l'identifiant du client dans le champ senderID
 * 1.1:(Serveur) si le token est invalid alors retourner un message de type RealTimeMessageType.DISCONNECT et la connexion est coupé
 *
 */
// r=
// {
//     senderID:UNKNOW_SENDER,
//     receiverID:"", //identifiant du client connecté
//     error:RealTimeInitErrorType.USER_ALREADY_EXIST,
//     type:RealTimeInitMessageType.LOGGIN
// }
