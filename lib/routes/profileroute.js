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
const express_1 = require("express");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const verifytoken_1 = require("../middlewares/verifytoken");
const deleteuser_1 = require("../controllers/authentication/deleteuser");
const getuserprofileinformation_1 = __importDefault(require("../controllers/profile/getuserprofileinformation"));
const updateuserinformation_1 = __importDefault(require("../controllers/profile/updateuserinformation"));
class CustomUserProfileError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomUserProfileError";
    }
}
const profilerouter = (0, express_1.Router)();
//
profilerouter.get("/", verifytoken_1.VerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.uid;
        const result = yield (0, getuserprofileinformation_1.default)(uid);
        res.status(200).json({ userprofile: result });
    }
    catch (err) {
        if (err instanceof CustomUserProfileError) {
            return res.status(400).json({ error: err.message });
        }
        else if (err instanceof Error) {
            // Handle other specific errors as needed
            return res.status(500).json({ error: err });
        }
        return res.json({ error: err });
    }
}));
profilerouter.post("/update", (0, authmiddleware_1.checkRequestBodyParams)(["school", "faculty", "department", "level"]), verifytoken_1.VerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.uid;
        const result = yield (0, updateuserinformation_1.default)(uid, req.body);
        res.status(200).json({ message: result });
    }
    catch (err) {
        if (err instanceof CustomUserProfileError) {
            return res.status(400).json({ error: err.message });
        }
        else if (err instanceof Error) {
            // Handle other specific errors as needed
            return res.status(500).json({ error: err });
        }
        return res.json({ error: err });
    }
}));
profilerouter.delete("/deleteuser", verifytoken_1.VerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.uid;
        const result = yield (0, deleteuser_1.DeleteUser)(uid);
        res.status(200).json({ message: result });
    }
    catch (err) {
        throw new Error("Error with deleting user");
    }
}));
exports.default = profilerouter;
