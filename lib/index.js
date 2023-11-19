"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_express_validator_1 = __importDefault(require("swagger-express-validator"));
const yamljs_1 = __importDefault(require("yamljs")); // For parsing YAML file
const util_1 = __importDefault(require("util"));
const authroute_1 = __importDefault(require("./routes/authroute"));
const swaggerDocument = yamljs_1.default.load("openapi.yaml"); // Load your OpenAPI YAML file
const app = (0, express_1.default)();
app.use(express_1.default.json());
var admin = require("firebase-admin");
var serviceAccount = require("../x.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
// automatic documentation displayed on postman
const opts = {
    schema: swaggerDocument,
    preserveResponseContentType: false,
    returnRequestErrors: true,
    returnResponseErrors: true,
    validateRequest: true,
    validateResponse: true,
    requestValidationFn: (req, data, errors) => {
        console.log(`failed request validation: ${req.method} ${req.originalUrl}\n ${util_1.default.inspect(errors)}`);
    },
    responseValidationFn: (req, data, errors) => {
        console.log(`failed response validation: ${req.method} ${req.originalUrl}\n ${util_1.default.inspect(errors)}`);
    },
};
app.use((0, swagger_express_validator_1.default)(opts));
app.use("/auth", authroute_1.default);
app.use((err, req, res, next) => {
    res.status(400).json({ error: err.message });
});
app.listen(3004, () => console.log("this is Kallum"));
exports.default = app;
