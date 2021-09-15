const fs = require("fs-extra");
const path = require("path");

try {
    fs.copySync("./src/public", "./dist/public");
} catch (error) {
    console.log(error);
}
