import { Router } from "express";
import { errorsRouteController } from "../controllers/errors";

export const errorsRouter = Router();

// POST /errors/throw
errorsRouter.post("/throw", errorsRouteController);
