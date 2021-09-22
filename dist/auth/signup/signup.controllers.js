"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupRouteController = void 0;
const cbor_1 = __importDefault(require("cbor"));
const signupRouteController = async (req, res, next) => {
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
};
exports.signupRouteController = signupRouteController;
