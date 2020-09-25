import { RequestHandler } from "express";
import { validationResult } from "express-validator";
import { CustomError } from "../types/interfaces";

// Handle validation errors and return 400 will relevant error message
export const validationErrorsController: RequestHandler = (req, res, next) => {
    // Extract validation errors from request
    const validationErrors = validationResult(req);
    // If there are validation errors, throw a 400 with a list of failed parameters
    if (!validationErrors.isEmpty()) {
        // Make a list of failed parameters
        const failedParams = validationErrors
            .array()
            .map((validationError) => validationError.param)
            .join();
        const errorMessage = `Parameters [${failedParams}] are invalid`;
        // Return custom error
        const validationError: CustomError = {
            statusCode: 400,
            message: errorMessage,
        };
        return next(validationError);
    } else {
        // Otherwise, continue with next middlewares
        return next();
    }
};
