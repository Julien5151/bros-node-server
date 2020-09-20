import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorsController } from "./utils/errors";
import { usersRouter } from "./routes/users";
import { authController } from "./utils/auth";

// Create express application
const app = express();

// Body parsing middleware
app.use(bodyParser.json()); // application/json
// Allow all CORS requests
app.use(cors());

// Auth route
app.use(authController);

// Users routes
app.use("/users", usersRouter);

// Error handling middleware
app.use(errorsController);

// Start express app on port 3000
app.listen(process.env.PORT);
