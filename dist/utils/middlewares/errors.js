"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsController = void 0;
exports.errorsController = (err, req, res, next) => {
    // Read or set default error status code
    const statusCode = err.statusCode || 500;
    // Error response body
    const errorResponseBody = {
        message: err.message || "Something went wrong"
    };
    // If there are some validations errors, add invalid fields to the response
    if (err.fields) {
        errorResponseBody["fields"] = err.fields;
    }
    // Return error response
    return res.status(statusCode).json(errorResponseBody);
};
