import { ErrorRequestHandler } from "express";
import { CustomError } from "../types/interfaces";

export const errorsController: ErrorRequestHandler = (
    err: CustomError,
    req,
    res,
    next
) => {
    // Read or set default error status code
    const statusCode = err.statusCode || 500;
    // Error response body
    const errorResponseBody: any = {
        message: err.message || "Something went wrong"
    };
    // If there are some validations errors, add invalid fields to the response
    if (err.fields) {
        errorResponseBody["fields"] = err.fields
    }
    // Return error response
    return res.status(statusCode).json(errorResponseBody);
};
