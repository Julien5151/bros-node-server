// Library imports
import express from "express";

// App imports
import errorsRoutes from "./routes/errors";

// Create express application
const app = express();

app.use(errorsRoutes);

// Start express app on port 3000
app.listen(3000);
