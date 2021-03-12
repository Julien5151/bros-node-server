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
// Create express application
const app = express_1.default();
// Body parsing middleware
app.use(body_parser_1.default.json()); // application/json
// Allow all CORS requests
app.use(cors_1.default());
// Html special chars escaping route
app.use(escape_html_1.escapeHtmlController);
// Authentication routes
app.use("/auth", auth_routes_1.authRouter);
// Users routes
app.use("/users", auth_1.authController, users_routes_1.usersRouter);
// Groups routes
app.use("/groups", auth_1.authController, groups_routes_1.groupsRouter);
// Admin routes
app.use("/admin", auth_1.authController, admin_1.checkAdminRoleController, admin_routes_1.adminRouter);
// Error handling middleware
app.use(errors_1.errorsController);
// Connect to DB and start server
db_connection_1.connectDb()
    .then(() => {
    // If success, start express app
    app.listen(process.env.PORT);
    // Use the collection "people"
    const col = db_connection_1.db.collection("people");
    // Construct a document
    const personDocument = {
        name: { first: "Alan", last: "Turing" },
        birth: new Date(1912, 5, 23),
        death: new Date(1954, 5, 7),
        contribs: ["Turing machine", "Turing test", "Turingery"],
        views: 1250000,
    };
    // Insert a single document, wait for promise so we can read it back
    col.insertOne(personDocument);
})
    .catch(() => {
    // Log the error and don't start server test
    console.error("Database connection failed, server stopped");
});
