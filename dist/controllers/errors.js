"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsRouteController = void 0;
exports.errorsRouteController = (req, res, next) => {
    const customError = {
        statusCode: req.body.status,
        message: req.body.message,
    };
    throw customError;
};
