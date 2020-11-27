import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { errorsController } from "./utils/middlewares/errors";
import { authRouter } from "./auth/auth.routes";
import { escapeHtmlController } from "./utils/middlewares/escape-html";
import { usersRouter } from "./users/users.routes";
import { authController } from "./utils/middlewares/auth";
import { groupsRouter } from "./groups/groups.routes";
import { adminRouter } from "./admin/admin.routes";

// Create express application
const app = express();

// Body parsing middleware
app.use(bodyParser.json()); // application/json
// Allow all CORS requests
app.use(cors());

// Html special chars escaping route
app.use(escapeHtmlController);

// Authentication routes
app.use("/auth", authRouter);

// Users routes
app.use("/users", authController, usersRouter);

// Groups routes
app.use("/groups", authController, groupsRouter);

// Admin routes
app.use("/admin", authController, adminRouter);

// Error handling middleware
app.use(errorsController);

// Start express app on port 3000
app.listen(process.env.PORT);
