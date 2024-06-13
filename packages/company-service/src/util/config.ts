import dotenv from "dotenv";
import path from "path";
import APIError from "../database/error/api-error";

function Createconfig(configPath: string) {
  dotenv.config({ path: configPath });

  const Requirementcofig = ["MONGODB_URL", "LOG_LEVEL", "PORT", "API_GATEWAY"];
  const missingConfig = Requirementcofig.filter((key) => !process.env[key]);

  if (missingConfig.length > 0) {
    throw new APIError(
      `Missing required environment variables: ${missingConfig.join(", ")}`
    );
  }
  return {
    monogourl: process.env.MONGODB_URL,
    logLevel: process.env.LOG_LEVEL,
    port: process.env.PORT,
    apiGateway: process.env.API_GATEWAY,
  };
}
const getConfig = (currentEnv: string = "development") => {
  const configPath =
    currentEnv === "development"
      ? path.join(__dirname, `../../configs/.env`)
      : path.join(__dirname, `../../configs/.env.${currentEnv}`);
  return Createconfig(configPath);
};

export default getConfig;
