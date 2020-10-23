"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.partialValidationErrorsController = void 0;
const express_validator_1 = require("express-validator");
// Handle validation errors and return 400 will relevant error message
// Validates only fields present in the request. Only invalid fields will result in an error
exports.partialValidationErrorsController = (req, res, next) => {
    // Extract validation errors from request
    const validationErrors = express_validator_1.validationResult(req);
    // Make a list of failed parameters
    const failedParams = validationErrors
        .array()
        .filter((validationError) => validationError.value !== undefined)
        .map((validationError) => validationError.param);
    // If there are validation errors, throw a 400 with a list of failed parameters
    if (!validationErrors.isEmpty() && failedParams.length > 0) {
        // Create custom error
        const validationError = {
            statusCode: 400,
            message: "Invalid request body",
            invalidFields: failedParams,
        };
        return next(validationError);
    }
    else {
        // Otherwise, continue with next middlewares
        return next();
    }
};
