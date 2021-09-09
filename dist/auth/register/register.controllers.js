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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRouteController = void 0;
const uuid_1 = require("uuid");
const registerRouteController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // Extract data from body
    const reqBody = req.body;
    // Extract data and email
    const email = reqBody.email;
    // Create publicKeyCredentialCreationOptions object
    const publicKeyCredentialCreationOptions = {
        // The challenge is produced by the server; see the Security Considerations
        challenge: [21, 31, 105],
        // Relying Party:
        rp: {
            name: "Bros application",
        },
        // User:
        user: {
            id: uuid_1.v4(),
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
    const response = {
        credentialCreationOptions: publicKeyCredentialCreationOptions,
    };
    return res.status(200).json(response);
});
exports.registerRouteController = registerRouteController;
