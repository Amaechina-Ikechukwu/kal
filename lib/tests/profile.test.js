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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index")); // Check the path to your app file
describe("Profile API Tests", () => {
    it("should respond with status 200 for /profile", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJKN3gzSFpmTlNsWnNVZ0k4OGs5YjZUYUFXM0UzIiwiaWF0IjoxNzAwNTcwMTY4fQ.tkEO1wE6b6_asFnQ84YUGM_rUH6EHuaButA4RsK089Q";
        const response = yield (0, supertest_1.default)(index_1.default)
            .post("/profile/update")
            .set("Authorization", `Bearer ${token}`)
            .send({
            department: "Agricultural Economics and Extension",
            faculty: "Agriculture",
            level: "600",
        });
        expect(response.status).toBe(200);
        // Add more assertions based on your expected response
    }), 10000);
    it("should respond with status 200 for /profile", () => __awaiter(void 0, void 0, void 0, function* () {
        // Assuming your delete user functionality requires authentication token in headers
        // Replace 'YOUR_TOKEN_HERE' with an actual token or implement your authentication mechanism
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiJKN3gzSFpmTlNsWnNVZ0k4OGs5YjZUYUFXM0UzIiwiaWF0IjoxNzAwNTcwMTY4fQ.tkEO1wE6b6_asFnQ84YUGM_rUH6EHuaButA4RsK089Q";
        const response = yield (0, supertest_1.default)(index_1.default)
            .get("/profile")
            .set("Authorization", `Bearer ${token}`);
        expect(response.status).toBe(200);
        // Add more assertions based on your expected response
    }), 10000);
    // Add more test cases for other routes if needed
});
