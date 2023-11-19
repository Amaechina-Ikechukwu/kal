"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
// Middleware function to check req.body against User interface
function validateUser(req, res, next) {
    const userData = req.body;
    // Validate properties existence and types
    if (typeof userData.email !== "string" ||
        typeof userData.emailVerified !== "boolean" ||
        typeof userData.phoneNumber !== "string" ||
        typeof userData.password !== "string" ||
        typeof userData.fullName !== "string" ||
        typeof userData.photoURL !== "string" ||
        typeof userData.disabled !== "boolean") {
        return res.status(400).json({ error: "Invalid user data" });
    }
    // Additional validation logic can be added here based on your requirements
    // If validation passes, move to the next middleware or route handler
    next();
}
exports.validateUser = validateUser;
