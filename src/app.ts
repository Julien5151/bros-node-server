import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorsController } from "./utils/middlewares/errors";
import { usersRouter } from "./users/users.routes";
import { authRouter } from "./auth/auth.routes";

// Create express application
const app = express();

// Body parsing middleware
app.use(bodyParser.json()); // application/json
// Allow all CORS requests
app.use(cors());

// Authentication routes
app.use("/auth", authRouter);

// Users routes
app.use("/users", usersRouter);

// Error handling middleware
app.use(errorsController);

// Start express app on port 3000
app.listen(process.env.PORT);
