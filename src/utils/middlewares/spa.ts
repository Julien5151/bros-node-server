import { RequestHandler } from "express";
import path from "path";

export const spaController: RequestHandler = (req, res, next) => {
    return res
        .status(200)
        .sendFile(path.join(__dirname, "../../public/index.html"));
};
