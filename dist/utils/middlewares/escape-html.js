"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.escapeHtmlController = void 0;
// Escape special chars to avoid XSS script injection
const escapeHtmlController = (req, res, next) => {
    // Escaping map
    const map = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    };
    // Extract request body
    const reqBody = req.body;
    // Sanitize all string properties
    for (const key in reqBody) {
        if (typeof reqBody[key] === "string") {
            reqBody[key] = reqBody[key].replace(/[&<>"']/g, (m) => map[m]);
        }
    }
    // Forward request to next middlewares
    next();
};
exports.escapeHtmlController = escapeHtmlController;
