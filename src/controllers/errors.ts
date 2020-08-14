import { RequestHandler } from "express";

const errors = [1, 2, 3, 4];

export const errorsRouteController: RequestHandler = (req, res, next) => {
    res.status(200).json({ errors: errors });
};
