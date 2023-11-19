import express, { Request, Response, NextFunction } from "express";
import swaggerExpressValidator from "swagger-express-validator";
import YAML from "yamljs"; // For parsing YAML file
import util from "util";

import router from "./routes/authroute";

const swaggerDocument = YAML.load("openapi.yaml"); // Load your OpenAPI YAML file

const app = express();
app.use(express.json());
var admin = require("firebase-admin");

var serviceAccount = require("../x.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// automatic documentation displayed on postman
const opts = {
  schema: swaggerDocument, // Swagger schema
  preserveResponseContentType: false,
  returnRequestErrors: true,
  returnResponseErrors: true,
  validateRequest: true,
  validateResponse: true,
  requestValidationFn: (req: Request, data: any, errors: any) => {
    console.log(
      `failed request validation: ${req.method} ${
        req.originalUrl
      }\n ${util.inspect(errors)}`
    );
  },
  responseValidationFn: (req: Request, data: any, errors: any) => {
    console.log(
      `failed response validation: ${req.method} ${
        req.originalUrl
      }\n ${util.inspect(errors)}`
    );
  },
};

app.use(swaggerExpressValidator(opts));
app.use("/auth", router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message });
});

app.listen(3004, () => console.log("this is Kallum"));
export default app;
