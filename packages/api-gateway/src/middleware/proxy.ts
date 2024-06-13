import express, { Request, Response } from "express";
import { createProxyMiddleware, Options } from "http-proxy-middleware";
import { ROUTE_PATHS } from "../routes-def";
import { logger } from "../utils/logger";
import { ClientRequest, IncomingMessage } from "http";
import getConfig from "@api-gateway/utils/createCofig";
import { StatusCode } from "../utils/consts";
import { OptionCookie } from "@api-gateway/utils/cookieOption";

interface ProxyConfig {
  [context: string]: Options<IncomingMessage, Response>;
}

interface NetworkError extends Error {
  code?: string;
}

const config = getConfig();

// Define the proxy rules and targets
const proxyConfigs: ProxyConfig = {
  /// implemet auth service
  [ROUTE_PATHS.AUTH_SERVICE]: {
    target: config.authServiceUrl as string,
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: (path, _req) => {
      return `${ROUTE_PATHS.AUTH_SERVICE}${path}`;
    },
    on: {
      proxyReq: (
        proxyReq: ClientRequest,
        req: IncomingMessage,
        _res: Response
      ) => {
        const expressReq = req as Request;
        // Log the request payload
        expressReq.on("data", (chunk) => {
          logger.info(`Request Body Chunk: ${chunk}`);
        });

        // Extract JWT token from session
        const token = expressReq.session!.jwt;
        proxyReq.setHeader("Authorization", `Bearer ${token}`);
        if (token) {
          // proxyReq.setHeader("Authorization", `Bearer ${token}`);
          logger.info(`JWT Token set in Authorization header for AUTH_SERVICE`);
        } else {
          logger.warn(`No JWT token found in session for AUTH_SERVICE`);
        }
        logger.info(
          `Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
        );
        logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
      },
      proxyRes: (proxyRes, req, res) => {
        let originalBody: Buffer[] = [];
        proxyRes.on("data", function (chunk: Buffer) {
          originalBody.push(chunk);
        });
        proxyRes.on("end", function () {
          const bodyString = Buffer.concat(originalBody).toString("utf8");

          let responseBody: {
            message?: string;
            token?: string;
            errors?: Array<object>;
            role?: string;
            url?: string;
            status?: string;
            verify_token?: string;
            isLogout?: boolean;
          };

          try {
            logger.info(`Gateway recieved bodystrign ${bodyString}`);

            responseBody = JSON.parse(bodyString);

            logger.info(
              `***Gateway received responsebody: ${JSON.stringify(
                responseBody,
                null,
                2
              )}`
            );
            // If Response Error, Not Modified Response
            if (responseBody.errors) {
              return res.status(proxyRes.statusCode!).json(responseBody);
            }

            // Store JWT in session
            if (responseBody.token) {
              console.log("Hi token!", responseBody.token);
              (req as Request).session!.jwt = responseBody.token;
              res.cookie("persistent", responseBody.token, OptionCookie);
              delete responseBody.token;
              logger.info(`New JWT token stored in session for AUTH_SERVICE`);
            }

            if (responseBody.url) {
              res.redirect(responseBody.url);
            }

            if (responseBody.verify_token) {
              return res.json(responseBody);
            }

            if (responseBody.isLogout) {
              res.clearCookie("session");
              res.clearCookie("session.sig");
              res.clearCookie("persistent");
            }

            // if (responseBody.status) {
            //   return res.json(responseBody.status);
            // }

            // if (responseBody.message) {
            //   return res.json(responseBody.message);
            // }

            // Modify response to send only the message to the client
            return res.json({
              status: responseBody.status,
              message: responseBody.message,
              role: responseBody.role,
            });
          } catch (error) {
            return res.status(500).json({ message: "Error parsing response" });
          }
        });
      },
      error: (err: NetworkError, _req, res) => {
        logger.error(`Proxy Error: ${err}`);
        switch (err.code) {
          case "ECONNREFUSED":
            (res as Response).status(StatusCode.ServiceUnavailable).json({
              message:
                "The service is temporarily unavailable. Please try again later.",
            });
            break;
          case "ETIMEDOUT":
            (res as Response).status(StatusCode.GatewayTimeout).json({
              message: "The request timed out. Please try again later.",
            });
            break;
          default:
            (res as Response)
              .status(StatusCode.InternalServerError)
              .json({ message: "An internal error occurred." });
        }
      },
    },
  },
  [ROUTE_PATHS.COMPANY_SERVICE]: {
    target: config.companyserviceurl as string,
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: (path, _req) => {
      return `${ROUTE_PATHS.COMPANY_SERVICE}${path}`;
    },
    on: {
      proxyReq: (
        proxyReq: ClientRequest,
        req: IncomingMessage,
        _res: Response
      ) => {
        const expressReq = req as Request;
        // Log the request payload
        expressReq.on("data", (chunk) => {
          logger.info(`Request Body Chunk: ${chunk}`);
        });

        // Extract JWT token from session
        const token = expressReq.session!.jwt;
        proxyReq.setHeader("Authorization", `Bearer ${token}`);
        if (token) {
          // proxyReq.setHeader("Authorization", `Bearer ${token}`);
          logger.info(`JWT Token set in Authorization header for AUTH_SERVICE`);
        } else {
          logger.warn(`No JWT token found in session for AUTH_SERVICE`);
        }
        logger.info(
          `Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
        );
        logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
      },
      proxyRes: (proxyRes, req, res) => {
        let originalBody: Buffer[] = [];
        proxyRes.on("data", function (chunk: Buffer) {
          originalBody.push(chunk);
        });
        proxyRes.on("end", function () {
          const bodyString = Buffer.concat(originalBody).toString("utf8");

          let responseBody: {
            message?: string;
            errors?: Array<object>;
            data?: Array<object>;
            token?: string;
          };

          try {
            logger.info(`Gateway recieved bodystrign ${bodyString}`);

            responseBody = JSON.parse(bodyString);

            logger.info(`Gateway received responsebody ${responseBody}`);
            // If Response Error, Not Modified Response
            if (responseBody.errors) {
              return res.status(proxyRes.statusCode!).json(responseBody);
            }
            if (responseBody.token) {
              (req as Request).session!.jwt = responseBody.token;
              res.cookie("persistent", responseBody.token, OptionCookie);
              delete responseBody.token;
            }

            // Modify response to send only the message to the client
            res.json({
              message: responseBody.message,
              data: responseBody.data,
            });
            // console.log("Data", responseBody.data);
          } catch (error) {
            return res.status(500).json({ message: "Error parsing response" });
          }
        });
      },
      error: (err: NetworkError, _req, res) => {
        logger.error(`Proxy Error: ${err}`);
        switch (err.code) {
          case "ECONNREFUSED":
            (res as Response).status(StatusCode.ServiceUnavailable).json({
              message:
                "The service is temporarily unavailable. Please try again later.",
            });
            break;
          case "ETIMEDOUT":
            (res as Response).status(StatusCode.GatewayTimeout).json({
              message: "The request timed out. Please try again later.",
            });
            break;
          default:
            (res as Response)
              .status(StatusCode.InternalServerError)
              .json({ message: "An internal error occurred." });
        }
      },
    },
  },
  //  Abouting user services
  [ROUTE_PATHS.USER_SERVICE]: {
    target: config.userServiceUrl as string,
    changeOrigin: true,
    selfHandleResponse: true,
    pathRewrite: (path, _req) => {
      return `${ROUTE_PATHS.USER_SERVICE}${path}`;
    },
    on: {
      proxyReq: (
        proxyReq: ClientRequest,
        req: IncomingMessage,
        _res: Response
      ) => {
        const expressReq = req as Request;
        // Log the request payload
        expressReq.on("data", (chunk) => {
          logger.info(`Request Body Chunk: ${chunk}`);
        });
        // Extract JWT token from session
        const token = expressReq.session!.jwt;
        proxyReq.setHeader("Authorization", `Bearer ${token}`);
        if (token) {
          // proxyReq.setHeader("Authorization", `Bearer ${token}`);
          logger.info(`JWT Token set in Authorization header for AUTH_SERVICE`);
        } else {
          logger.warn(`No JWT token found in session for AUTH_SERVICE`);
        }
        logger.info(
          `Proxied request URL: ${proxyReq.protocol}//${proxyReq.host}${proxyReq.path}`
        );
        logger.info(`Headers Sent: ${JSON.stringify(proxyReq.getHeaders())}`);
      },
      proxyRes: (proxyRes, req, res) => {
        let originalBody: Buffer[] = [];
        proxyRes.on("data", function (chunk: Buffer) {
          originalBody.push(chunk);
        });
        proxyRes.on("end", function () {
          const bodyString = Buffer.concat(originalBody).toString("utf8");
          let responseBody: {
            message?: string;
            errors?: Array<object>;
            data?: Array<object>;
            token?: string;
          };
          try {
            logger.info(`Gateway recieved bodystrign ${bodyString}`);

            responseBody = JSON.parse(bodyString);

            logger.info(`Gateway received responsebody ${responseBody}`);
            if (responseBody.errors) {
              return res.status(proxyRes.statusCode!).json(responseBody);
            }
            if (responseBody.token) {
              (req as Request).session!.jwt = responseBody.token;
              res.cookie("persistent", responseBody.token, OptionCookie);
              delete responseBody.token;
            }
            res.json({
              message: responseBody.message,
              data: responseBody.data,
            });
          } catch (error) {
            console.log(error);
          }
        });
      },
      error: (err: NetworkError, _req, res) => {
        logger.error(`Proxy Error: ${err}`);
        switch (err.code) {
          case "ECONNREFUSED":
            (res as Response).status(StatusCode.ServiceUnavailable).json({
              message:
                "The service is temporarily unavailable. Please try again later.",
            });
            break;
          case "ETIMEDOUT":
            (res as Response).status(StatusCode.GatewayTimeout).json({
              message: "The request timed out. Please try again later.",
            });
            break;
          default:
            (res as Response)
              .status(StatusCode.InternalServerError)
              .json({ message: "An internal error occurred." });
        }
      },
    },
  },
};

const applyProxy = (app: express.Application) => {
  Object.keys(proxyConfigs).forEach((context: string) => {
    app.use(context, createProxyMiddleware(proxyConfigs[context]));
  });
  no: {
  }
};

export default applyProxy;
