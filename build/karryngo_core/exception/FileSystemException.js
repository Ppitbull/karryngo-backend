"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemException = void 0;
/**
@author: Cedric nguendap
@description: Exception lié au systéme de fichier de nodejs
@see KarryngoException
@created: 22/09/2020
*/
var KarryngoException_1 = require("./KarryngoException");
var FileSystemException = /** @class */ (function (_super) {
    __extends(FileSystemException, _super);
    function FileSystemException(code, description) {
        return _super.call(this, code, "Erreur du systéme de fichier: " + description, description) || this;
    }
    FileSystemException.FILE_NOT_FOUND = -50;
    FileSystemException.UNKNOW_ERROR = -49;
    return FileSystemException;
}(KarryngoException_1.KarryngoException));
exports.FileSystemException = FileSystemException;
