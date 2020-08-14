import { Router } from "express";
import { errorsController } from "../middlewares/errors";

export const errorsRouter = Router();

// GET /errors
errorsRouter.get("/errors", errorsController);
