import express from "express";
import hpp from "hpp";
import helmet from "helmet";
// import cors from "cors";
// import getConfig from "./utils/config";
import { RegisterRoutes } from "./routes/v1/routes";

const app = express();

app.set("trust proxy", 1);

app.use(hpp());
app.use(helmet());
// const allowedOrigins = [ getConfig().apiGateway, getConfig().authservice];
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.indexOf(origin) === -1) {
//         const msg = `The CORS policy for this site does not allow access from the specified origin: ${origin}`;
//         return callback(new Error(msg), false);
//       }
//       return callback(null, true);
//     },
//   })
// );
app.use(express.static("public"));
app.use(express.json());

RegisterRoutes(app);

export default app;
