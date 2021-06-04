import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { HttpMethods } from "../types/enums";
import { CustomError } from "../types/interfaces";

// Handle validation errors and return 400 will relevant error message
// Validates ALL request fields : invalid and missing fields result in an error
export const validationErrorsController: RequestHandler = (req, res, next) => {
    // Extract validation errors from request
    const validationErrors = validationResult(req);
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
        const validationError: CustomError = {
            statusCode: 400,
            message: "Invalid request body",
        };
        // Add failed params to response
        if (failedParams.length > 0) {
            validationError.invalidFields = failedParams;
        } else if (req.method === HttpMethods.PATCH) {
            // PATCH requests : only failed params lead to an error
            return next();
        }
        // POST requests : both missing and failed params lead to an error
        if (missingParams.length > 0 && req.method === HttpMethods.POST) {
            validationError.missingFields = missingParams;
        }
        // Forward error to error handling middleware
        return next(validationError);
    } else {
        // Otherwise, continue with next middlewares
        return next();
    }
};
