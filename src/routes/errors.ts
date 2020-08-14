import { Router } from "express";
import { errorsRouteController } from "../controllers/errors";

export const errorsRouter = Router();

// GET /errors/all
errorsRouter.get("/all", errorsRouteController);
