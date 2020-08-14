import { Router } from "express";

const router = Router();

const errors = [1, 2, 3, 4];

router.get("/", (req, res, next) => {
    res.status(200).json({ errors: errors });
});

export default router;
