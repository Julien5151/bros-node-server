import { ErrorRequestHandler } from "express";

export const errorsController: ErrorRequestHandler = (err, req, res, next) => {
    // Read or set default error status code
    const statusCode = err.statusCode || 500;
    // Return error response
    res.status(statusCode).json({
        message: err.message,
    });
};
