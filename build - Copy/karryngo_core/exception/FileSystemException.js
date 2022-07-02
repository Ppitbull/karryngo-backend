"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSystemException = void 0;
/**
@author: Cedric nguendap
@description: Exception lié au systéme de fichier de nodejs
@see KarryngoException
@created: 22/09/2020
*/
const KarryngoException_1 = require("./KarryngoException");
class FileSystemException extends KarryngoException_1.KarryngoException {
    constructor(code, description) {
        super(code, "Erreur du systéme de fichier: " + description, description);
    }
}
exports.FileSystemException = FileSystemException;
FileSystemException.FILE_NOT_FOUND = -50;
FileSystemException.UNKNOW_ERROR = -49;
FileSystemException.UNABLE_TO_IMPORT_ERROR = -48;
