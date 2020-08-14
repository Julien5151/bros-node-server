import { ErrorRequestHandler } from "express";
import { CustomError } from "../utils/interfaces";

export const errorsController: ErrorRequestHandler = (
    err: CustomError,
    req,
    res,
    next
) => {
    // Read or set default error status code
    const statusCode = err.statusCode || 500;
    // Return error response
    res.status(statusCode).json({
        message: err.message,
    });
};
