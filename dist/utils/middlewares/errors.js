"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsController = void 0;
exports.errorsController = (err, req, res, next) => {
    // Read or set default error status code
    const statusCode = err.statusCode || 500;
    // Read or set default error message
    const errorMEssage = err.message || "Something went wrong";
    // Return error response
    return res.status(statusCode).json({
        message: errorMEssage,
    });
};
