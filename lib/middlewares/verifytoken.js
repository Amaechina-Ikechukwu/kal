"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const VerifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "Unauthorized" });
    }
    const token = authorizationHeader.split("Bearer ")[1];
    try {
        const secretKey = process.env.KALLUM; // Replace with your actual secret key
        if (!secretKey) {
            throw new Error("Secret key is missing or undefined");
        }
        const decodedToken = jsonwebtoken_1.default.verify(token, secretKey);
        if (!decodedToken || !decodedToken.uid) {
            return res.status(401).json({ error: "Invalid token" });
        }
        // Adding the UID to the request object for future use in the route handlers
        req.uid = decodedToken.uid;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(401).json({ error: "Invalid token" });
    }
});
exports.VerifyToken = VerifyToken;
