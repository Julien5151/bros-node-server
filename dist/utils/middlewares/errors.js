"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsController = void 0;
const errorsController = (err, req, res, next) => {
    // Read or set default error status code
    const statusCode = err.statusCode || 500;
    // Error response body
    const errorResponseBody = {
        message: err.message || "Something went wrong",
    };
    // If there are some validations errors, add invalid fields to the response
    if (err.invalidFields) {
        errorResponseBody["invalidFields"] = err.invalidFields;
    }
    // If there are missing fields, add missing fields to the response
    if (err.missingFields) {
        errorResponseBody["missingFields"] = err.missingFields;
    }
    // Return error response
    return res.status(statusCode).json(errorResponseBody);
};
exports.errorsController = errorsController;
