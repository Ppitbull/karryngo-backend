"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Email = void 0;
class Email {
    constructor() {
        this.sender = "";
        this.receiver = "";
        this.otherReceiver = [];
        this.text = " ";
        this.file = "";
        this.html = "";
        this.subject = "";
    }
    from(userFrom) {
        this.sender = userFrom;
        return this;
    }
    to(userTo) {
        this.receiver = userTo;
        return this;
    }
    cc(ccUser) {
        this.otherReceiver.push(ccUser);
        return this;
    }
    title(titleMail) {
        this.subject = titleMail;
        return this;
    }
    htmlContent(content) {
        this.html = content;
        return this;
    }
    textContent(content) {
        this.text = content;
        return this;
    }
    fileContent(file) {
        this.file = file;
        return this;
    }
    toString() {
        return {
            from: this.sender.toString(),
            to: this.receiver.toString(),
            subject: this.subject.toString(),
            text: this.text.toString(),
            file: this.file.toString(),
            html: this.html.toString(),
            cc: this.otherReceiver.join(";").toString()
        };
    }
}
exports.Email = Email;
