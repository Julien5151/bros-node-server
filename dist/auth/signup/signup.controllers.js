"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouteController = void 0;
const cbor_1 = __importDefault(require("cbor"));
const signupRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body
    const reqBody = req.body;
    // Parse signup request
    const clientDataJson = Buffer.from(reqBody.publicKeyCredential.response.clientDataJSON, "base64").toString();
    const attestation = Buffer.from(reqBody.publicKeyCredential.response.attestationObject, "base64");
    console.log(clientDataJson);
    console.log(cbor_1.default.decodeFirstSync(attestation));
    // Create response object
    const response = {
        message: "Signup successfull",
    };
    return res.status(200).json(response);
});
exports.signupRouteController = signupRouteController;
