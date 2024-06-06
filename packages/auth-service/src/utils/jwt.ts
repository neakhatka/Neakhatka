import bcrypt from "bcrypt";
// import { privatekey } from "../server";
import jwt from "jsonwebtoken";
import getConfig from "./config";
import path from "path";
import fs from "fs";
import { StatusCode } from "./consts";
import { BaseCustomError } from "../errors/base-custom-error";
// import { logger } from "./logger";

const privateKeyPath = path.join(__dirname, "../../private_key.pem");
// Read the private key from the file
const privateKey = fs.readFileSync(privateKeyPath, "utf8");
export const generatePassword = async (password: string) => {
  try {
    const salt = 10;
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }
};

export const ValidatePassword = async ({
  enterpassword,
  savedPassword,
}: {
  enterpassword: string;
  savedPassword: string;
}) => {
  // return (await generatePassword(enterpassword)) === savedPassword;
  const vaidatePassword = await bcrypt.compare(enterpassword, savedPassword);

  return vaidatePassword;
};

export const generateSignature = async ({
  id,
  role,
}: {
  id: string;
  role: string;
}): Promise<string> => {
  try {
    const payload = {
      id: id,
      role: role,
    };
    return await jwt.sign({ payload: payload }, privateKey, {
      expiresIn: getConfig().jwtExpiresIn!,
      algorithm: "RS256",
    });
  } catch (error: unknown) {
    console.log(error);
    throw new BaseCustomError(
      error instanceof Error ? error.message : "Unknown error occurred",
      StatusCode.NotAcceptable
    );
    // error instanceof Error ? error.message : "Unknown error occurred",
    //   StatusCode.NotAcceptable
  }
};
// export const decodedToken = async (token: string) => {
//   try {
//     const data = (await jwt.decode(token)) as JwtPayload;
//     return data.payload;
//   } catch (error: unknown) {
//     logger.error("Unable to decode in decodeToken() method !", error);
//     throw new ApiError("Can't Decode token!");
//   }
// };
