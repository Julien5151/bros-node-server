import { RequestHandler } from "express";

// Escape special chars to avoid XSS script injection
export const escapeHtmlController: RequestHandler = (req, res, next) => {
    // Escaping map
    const map: any = {
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
            reqBody[key] = (reqBody[key] as string).replace(
                /[&<>"']/g,
                (m) => map[m]
            );
        }
    }
    // Forward request to next middlewares
    next();
};
