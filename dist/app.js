"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const errors_1 = require("./middlewares/errors");
const errors_2 = require("./routes/errors");
const auth_1 = require("./middlewares/auth");
// Create express application
const app = express_1.default();
// Body parsing middleware
app.use(body_parser_1.default.json()); // application/json
// Allow all CORS requests
app.use(cors_1.default());
// Auth route
app.use(auth_1.authController);
// Error routes
app.use("/errors", errors_2.errorsRouter);
// Error handling middleware
app.use(errors_1.errorsController);
// Start express app on port 3000
app.listen(process.env.PORT);
