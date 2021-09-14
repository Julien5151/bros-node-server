import { RequestHandler } from "express";
import { RegisterRequest, RegisterResponse } from "./register.types";
import { v4 as uuidv4 } from "uuid";

export const registerRouteController: RequestHandler = async (
    req,
    res,
    next
) => {
    // Extract data from body
    const reqBody = req.body as RegisterRequest;
    // Extract data and email
    const email = reqBody.email;
    // Create publicKeyCredentialCreationOptions object
    const publicKeyCredentialCreationOptions: any = {
        // The challenge is produced by the server; see the Security Considerations
        challenge:
            "this is a random but static challenge which should be improved in the future come on man ! do it !",

        // Relying Party:
        rp: {
            name: "Bros application",
        },

        // User:
        user: {
            id: uuidv4(),
            name: email,
            displayName: email,
        },

        // This Relying Party will accept either an ES256 or RS256 credential, but
        // prefers an ES256 credential.
        pubKeyCredParams: [
            {
                type: "public-key",
                alg: -7, // "ES256" as registered in the IANA COSE Algorithms registry
            },
            {
                type: "public-key",
                alg: -257, // Value registered by this specification for "RS256"
            },
        ],

        authenticatorSelection: {
            // Try to use UV if possible. This is also the default.
            userVerification: "preferred",
        },

        timeout: 360000, // 6 minutes
        // excludeCredentials: [
        //     // Don’t re-register any authenticator that has one of these credentials
        //     {
        //         id: Uint8Array.from(
        //             window.atob(
        //                 "ufJWp8YGlibm1Kd9XQBWN1WAw2jy5In2Xhon9HAqcXE="
        //             ),
        //             (c) => c.charCodeAt(0)
        //         ),
        //         type: "public-key",
        //     },
        //     {
        //         id: Uint8Array.from(
        //             window.atob(
        //                 "E/e1dhZc++mIsz4f9hb6NifAzJpF1V4mEtRlIPBiWdY="
        //             ),
        //             (c) => c.charCodeAt(0)
        //         ),
        //         type: "public-key",
        //     },
        // ],

        // // Make excludeCredentials check backwards compatible with credentials registered with U2F
        // extensions: { appidExclude: "https://acme.example.com" },
    };
    // Create response object
    const response: RegisterResponse = {
        credentialCreationOptions: publicKeyCredentialCreationOptions,
    };
    return res.status(200).json(response);
};
