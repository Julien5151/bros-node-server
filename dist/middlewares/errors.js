"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsController = void 0;
exports.errorsController = (err, req, res, next) => {
    // Read or set default error status code
    const statusCode = err.statusCode || 500;
    // Return error response
    res.status(statusCode).json({
        message: err.message,
    });
};
