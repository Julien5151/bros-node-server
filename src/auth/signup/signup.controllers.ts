import { RequestHandler } from "express";
import { SignupRequest, SignupResponse } from "./signup.types";

export const signupRouteController: RequestHandler = async (req, res, next) => {
    // Extract data from body
    const reqBody = req.body as SignupRequest;
    // Parse signup request

    console.log(
        JSON.parse(
            Buffer.from(
                reqBody.publicKeyCredential.response.clientDataJSON as any,
                "base64"
            ).toString()
        )
    );

    // Create response object
    const response: SignupResponse = {
        message: "Signup successfull",
    };
    return res.status(200).json(response);
};
