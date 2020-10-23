import { RequestHandler } from "express";
import { validationResult } from "express-validator";
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
        // Only add missing or failed params if it's relevant
        if (missingParams.length > 0) {
            validationError.missingFields = missingParams;
        }
        if (failedParams.length > 0) {
            validationError.invalidFields = failedParams;
        }
        return next(validationError);
    } else {
        // Otherwise, continue with next middlewares
        return next();
    }
};
