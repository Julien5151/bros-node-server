import { RequestHandler } from "express";
import { SignupRequest, SignupResponse } from "./signup.types";
import cbor from "cbor";

export const signupRouteController: RequestHandler = async (req, res, next) => {
    // Extract data from body
    const reqBody = req.body as SignupRequest;
    // Parse signup request
    const clientDataJson = Buffer.from(
        reqBody.publicKeyCredential.response.clientDataJSON as any,
        "base64"
    ).toString();

    const attestation = Buffer.from(
        (reqBody.publicKeyCredential.response as any).attestationObject,
        "base64"
    );

    console.log(clientDataJson);
    console.log(cbor.decodeFirstSync(attestation));

    // Create response object
    const response: SignupResponse = {
        message: "Signup successfull",
    };
    return res.status(200).json(response);
};
