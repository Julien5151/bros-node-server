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
import { checkAdminRoleController } from "./utils/middlewares/admin";
import { connectDb } from "./utils/database/db-connection";
import path from "path";
import { spaController } from "./utils/middlewares/spa";
import { profileRouter } from "./profile/profile.routes";
import { subscriptionsRouter } from "./subscriptions/subscriptions.routes";

// Create express application
const app = express();

// Body parsing middleware application/json
app.use(bodyParser.json());

// Only allow CORS in development
if (process.env.ENVIRONMENT === "development") {
    app.use(cors());
}

// Html special chars escaping route
app.use(escapeHtmlController);

// Serve statics
app.use(express.static(path.join(__dirname, "public")));

// Authentication routes
app.use("/auth", authRouter);

// Users routes
app.use("/users", authController, usersRouter);

// Subscriptions routes
app.use("/subscriptions", authController, subscriptionsRouter);

// Groups routes
app.use("/groups", authController, groupsRouter);

// Profile routes
app.use("/profile", authController, profileRouter);

// Admin routes
app.use("/admin", authController, checkAdminRoleController, adminRouter);

// SPA route
app.use("*", spaController);

// Error handling middleware
app.use(errorsController);

// Connect to DB and start server
connectDb()
    .then(() => {
        // If success, start express app
        app.listen(process.env.PORT);
    })
    .catch(() => {
        // Log the error and don't start server test
        console.error("Database connection failed, server stopped");
    });
