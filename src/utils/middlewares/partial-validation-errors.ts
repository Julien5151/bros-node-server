import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../types/interfaces";

// Handle validation errors and return 400 will relevant error message
// Validates only fields present in the request. Only invalid fields will result in an error
export const partialValidationErrorsController: RequestHandler = (
    req,
    res,
    next
) => {
    // Extract validation errors from request
    const validationErrors = validationResult(req);
    // Make a list of failed parameters
    const failedParams = validationErrors
        .array()
        .filter((validationError) => validationError.value !== undefined)
        .map((validationError) => validationError.param);
    // If there are validation errors, throw a 400 with a list of failed parameters
    if (!validationErrors.isEmpty() && failedParams.length > 0) {
        // Create custom error
        const validationError: CustomError = {
            statusCode: 400,
            message: "Invalid request body",
            invalidFields: failedParams,
        };
        return next(validationError);
    } else {
        // Otherwise, continue with next middlewares
        return next();
    }
};
