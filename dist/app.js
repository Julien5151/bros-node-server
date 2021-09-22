"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const errors_1 = require("./utils/middlewares/errors");
const auth_routes_1 = require("./auth/auth.routes");
const escape_html_1 = require("./utils/middlewares/escape-html");
const users_routes_1 = require("./users/users.routes");
const auth_1 = require("./utils/middlewares/auth");
const groups_routes_1 = require("./groups/groups.routes");
const admin_routes_1 = require("./admin/admin.routes");
const admin_1 = require("./utils/middlewares/admin");
const db_connection_1 = require("./utils/database/db-connection");
const path_1 = __importDefault(require("path"));
const spa_1 = require("./utils/middlewares/spa");
const profile_routes_1 = require("./profile/profile.routes");
const subscriptions_routes_1 = require("./subscriptions/subscriptions.routes");
// Create express application
const app = express_1.default();
// Body parsing middleware application/json
app.use(body_parser_1.default.json());
// Only allow CORS in development
if (process.env.ENVIRONMENT === "development") {
    app.use(cors_1.default());
}
// Html special chars escaping route
app.use(escape_html_1.escapeHtmlController);
// Serve statics
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Authentication routes
app.use("/auth", auth_routes_1.authRouter);
// Users routes
app.use("/users", auth_1.authController, users_routes_1.usersRouter);
// Subscriptions routes
app.use("/subscriptions", auth_1.authController, subscriptions_routes_1.subscriptionsRouter);
// Groups routes
app.use("/groups", auth_1.authController, groups_routes_1.groupsRouter);
// Profile routes
app.use("/profile", auth_1.authController, profile_routes_1.profileRouter);
// Admin routes
app.use("/admin", auth_1.authController, admin_1.checkAdminRoleController, admin_routes_1.adminRouter);
// SPA route
app.use("*", spa_1.spaController);
// Error handling middleware
app.use(errors_1.errorsController);
// Connect to DB and start server
db_connection_1.connectDb()
    .then(() => {
    // If success, start express app
    app.listen(process.env.PORT);
})
    .catch(() => {
    // Log the error and don't start server test
    console.error("Database connection failed, server stopped");
});
