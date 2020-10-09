"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorsController = void 0;
const express_validator_1 = require("express-validator");
// Handle validation errors and return 400 will relevant error message
exports.validationErrorsController = (req, res, next) => {
    // Extract validation errors from request
    const validationErrors = express_validator_1.validationResult(req);
    // If there are validation errors, throw a 400 with a list of failed parameters
    if (!validationErrors.isEmpty()) {
        // Make a list of failed parameters
        const failedParams = validationErrors
            .array()
            .map((validationError) => validationError.param);
        const errorMessage = `Invalid request body`;
        // Return custom error
        const validationError = {
            statusCode: 400,
            message: errorMessage,
            fields: failedParams
        };
        return next(validationError);
    }
    else {
        // Otherwise, continue with next middlewares
        return next();
    }
};
