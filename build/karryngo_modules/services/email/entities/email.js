"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
var Email = /** @class */ (function () {
    function Email() {
    }
    Email.prototype.from = function (userFrom) {
        return this;
    };
    Email.prototype.to = function (userTo) {
        return this;
    };
    Email.prototype.cc = function (ccUser) {
        return this;
    };
    Email.prototype.title = function (titleMail) {
        return this;
    };
    Email.prototype.htmlContent = function (content) {
        return this;
    };
    Email.prototype.textContent = function (content) {
        return this;
    };
    Email.prototype.fileContent = function (file) {
        return this;
    };
    return Email;
}());
exports.Email = Email;
