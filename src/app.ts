import express from "express";
import bodyParser from "body-parser";
import { errorsController } from "./middlewares/errors";
import { errorsRouter } from "./routes/errors";

// Create express application
const app = express();

// Body parsing middleware
app.use(bodyParser.json()); // application/json
// CORS headers middleware
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE"
    );
    next();
});

// Error routes
app.use("/errors", errorsRouter);

// Error handling middleware
app.use(errorsController);

// Start express app on port 3000
app.listen(3000);
