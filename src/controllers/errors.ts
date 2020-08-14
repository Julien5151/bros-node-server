import { RequestHandler } from "express";
import { CustomError } from "../utils/interfaces";

export const errorsRouteController: RequestHandler = (req, res, next) => {
    const customError: CustomError = {
        statusCode: req.body.status,
        message: req.body.message,
    };
    throw customError;
};
