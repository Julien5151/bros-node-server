import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorsController } from "./utils/middlewares/errors";
import { authRouter } from "./auth/auth.routes";
import { authController } from "./utils/middlewares/auth";

// Create express application
const app = express();

// Body parsing middleware
app.use(bodyParser.json()); // application/json
// Allow all CORS requests
app.use(cors());

// Authentication routes
app.use("/auth", authRouter);

app.use("/auth/test", authController);

// Error handling middleware
app.use(errorsController);

// Start express app on port 3000
app.listen(process.env.PORT);
