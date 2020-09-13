import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorsController } from "./middlewares/errors";
import { errorsRouter } from "./routes/errors";
import { authController } from "./middlewares/auth";
import { connection } from "./utils/database";

// Create express application
const app = express();

// Body parsing middleware
app.use(bodyParser.json()); // application/json
// Allow all CORS requests
app.use(cors());

// Auth route
app.use(authController);

// Error routes
app.use("/errors", errorsRouter);

// Error handling middleware
app.use(errorsController);

// Start express app on port 3000
app.listen(process.env.PORT);
