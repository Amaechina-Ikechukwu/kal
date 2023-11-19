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
const uuid_1 = require("uuid");
const createuser_1 = require("./createuser");
const router = (0, express_1.Router)();
router.post("/signup", uuid_1.validate, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        yield (0, createuser_1.CreateUser)(userData);
        res.status(200).json({ message: "user created" });
    }
    catch (err) {
        throw new Error("Error with signing up user");
    }
}));
exports.default = router;
