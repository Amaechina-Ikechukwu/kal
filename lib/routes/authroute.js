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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const createuser_1 = require("../controllers/authentication/createuser");
const createtoken_1 = require("../controllers/authentication/createtoken");
const authmiddleware_1 = require("../middlewares/authmiddleware");
const verifyemail_1 = require("../controllers/authentication/verifyemail");
const verifytoken_1 = require("../middlewares/verifytoken");
const deleteuser_1 = require("../controllers/authentication/deleteuser");
const router = (0, express_1.Router)();
class CustomUserProfileError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomUserProfileError";
    }
}
router.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const result = yield (0, createuser_1.CreateUser)(userData);
        const token = yield (0, createtoken_1.CreateToken)(result);
        res.status(200).json({ userToken: token });
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
router.post("/verifyemail", (0, authmiddleware_1.checkRequestBodyParams)(["redirectUri", "email"]), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { redirectUri, email } = req.body;
        const result = yield (0, verifyemail_1.VerifyEmail)(redirectUri, email);
        res.status(200).json({ userToken: result });
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
router.delete("/deleteuser", verifytoken_1.VerifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const uid = req.uid;
        const result = yield (0, deleteuser_1.DeleteUser)(uid);
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
exports.default = router;
