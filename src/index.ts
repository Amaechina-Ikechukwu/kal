import express, { Request, Response, NextFunction } from "express";
import swaggerExpressValidator from "swagger-express-validator";
import YAML from "yamljs"; // For parsing YAML file
import util from "util";
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
import router from "./routes/authroute";
import profilerouter from "./routes/profileroute";
import AddUserToDatabase from "./controllers/authentication/addusertodatabase";
import messagingRouter from "./routes/messagingroute";
//loads the documentation file
const swaggerDocument = YAML.load("openapi.yaml"); // Load your OpenAPI YAML file

const app = express();
app.use(express.json());
var admin = require("firebase-admin");

var serviceAccount = require("../x.json");
//initializes firebase
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
// });
initializeApp({
  credential: cert(serviceAccount),
});
getFirestore().settings({
  ignoreUndefinedProperties: true,
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
app.use("/profile", profilerouter);
app.use("/groups", messagingRouter);

app.listen(3004, () => console.log("this is Kallum"));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(400).json({ error: err.message });
});

export default app;
