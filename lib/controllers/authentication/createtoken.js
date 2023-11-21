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
exports.CreateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
function CreateToken(uid) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const secretKey = process.env.KALLUM; // Replace with your actual secret key
            if (!secretKey) {
                throw new Error("Secret key is missing or undefined");
            }
            const jwtPayload = {
                uid: uid,
                // Add other necessary payload data here if needed
            };
            const options = {
                expiresIn: "1h", // Set your desired expiration time
            };
            const token = jsonwebtoken_1.default.sign(jwtPayload, secretKey);
            return token;
        }
        catch (err) {
            console.log(err);
            throw new Error("Error creating token");
        }
    });
}
exports.CreateToken = CreateToken;
