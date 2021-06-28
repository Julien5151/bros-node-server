"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorsController = void 0;
const express_validator_1 = require("express-validator");
const enums_1 = require("../types/enums");
// Handle validation errors and return 400 will relevant error message
// Validates ALL request fields : invalid and missing fields result in an error
const validationErrorsController = (req, res, next) => {
    // Create custom error
    const validationCustomError = {
        statusCode: 400,
        message: "Invalid request body",
    };
    // Check that there are no forbidden (aka not validated) extra body param
    const validatedParams = Object.keys(express_validator_1.matchedData(req, { onlyValidData: false }));
    const forbiddenParams = [];
    Object.keys(req.body).forEach((key) => {
        if (!validatedParams.includes(key)) {
            forbiddenParams.push(key);
        }
    });
    if (forbiddenParams.length > 0) {
        validationCustomError.forbiddenFields = forbiddenParams;
        return next(validationCustomError);
    }
    // Extract validation errors from request
    const validationErrors = express_validator_1.validationResult(req);
    // If there are validation errors, throw a 400 with a list of failed parameters
    if (!validationErrors.isEmpty()) {
        // Make a list of missing parameters
        let missingParams = validationErrors
            .array()
            .filter((validationError) => validationError.value === undefined)
            .map((validationError) => validationError.param);
        // Remove duplicates (duplicate occurs when there are multiple validators on the same property)
        missingParams = [...new Set(missingParams)];
        // Make a list of failed parameters
        let failedParams = validationErrors
            .array()
            .filter((validationError) => validationError.value !== undefined)
            .map((validationError) => validationError.param);
        // Remove duplicates
        failedParams = [...new Set(failedParams)];
        // Add failed params to response
        if (failedParams.length > 0) {
            validationCustomError.invalidFields = failedParams;
        }
        else if (req.method === enums_1.HttpMethods.PATCH) {
            // PATCH requests : only failed params lead to an error
            return next();
        }
        // POST requests : both missing and failed params lead to an error
        if (missingParams.length > 0 && req.method === enums_1.HttpMethods.POST) {
            validationCustomError.missingFields = missingParams;
        }
        // Forward error to error handling middleware
        return next(validationCustomError);
    }
    else {
        // Otherwise, continue with next middlewares
        return next();
    }
};
exports.validationErrorsController = validationErrorsController;
