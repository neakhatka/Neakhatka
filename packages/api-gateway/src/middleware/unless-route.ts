import { NextFunction, Request, Response } from "express";

// Middleware to conditionally apply another middleware unless the route matches a specific path
interface Conditions {
  path: string;
  method?: string;
}
export default function unless(conditions: Conditions[], middleware: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    const shouldskip = conditions.some((conditions) => {
      const pathMatches = req.path.startsWith(conditions.path);
      const methodMatches =
        !conditions.method || req.method === conditions.method;
      return pathMatches && methodMatches;
    });
    if (shouldskip) {
      return next();
    } else {
      middleware(req, res, next);
    }
  };
}
