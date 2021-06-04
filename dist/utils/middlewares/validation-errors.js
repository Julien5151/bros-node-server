"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorsController = void 0;
const express_validator_1 = require("express-validator");
const enums_1 = require("../types/enums");
// Handle validation errors and return 400 will relevant error message
// Validates ALL request fields : invalid and missing fields result in an error
const validationErrorsController = (req, res, next) => {
    // Extract validation errors from request
    const validationErrors = express_validator_1.validationResult(req);
    // If there are validation errors, throw a 400 with a list of failed parameters
    if (!validationErrors.isEmpty()) {
        // Make a list of missing parameters
        const missingParams = validationErrors
            .array()
            .filter((validationError) => validationError.value === undefined)
            .map((validationError) => validationError.param);
        // Make a list of failed parameters
        const failedParams = validationErrors
            .array()
            .filter((validationError) => validationError.value !== undefined)
            .map((validationError) => validationError.param);
        // Create custom error
        const validationError = {
            statusCode: 400,
            message: "Invalid request body",
        };
        // Add failed params to response
        if (failedParams.length > 0) {
            validationError.invalidFields = failedParams;
        }
        else if (req.method === enums_1.HttpMethods.PATCH) {
            // PATCH requests : only failed params lead to an error
            return next();
        }
        // POST requests : both missing and failed params lead to an error
        if (missingParams.length > 0 && req.method === enums_1.HttpMethods.POST) {
            validationError.missingFields = missingParams;
        }
        // Forward error to error handling middleware
        return next(validationError);
    }
    else {
        // Otherwise, continue with next middlewares
        return next();
    }
};
exports.validationErrorsController = validationErrorsController;
