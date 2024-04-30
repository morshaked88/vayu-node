import { z, ZodError } from "zod";
import type { Request, Response, NextFunction } from "express";

// middleware to validate query parameters
export function validateQueryData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.query);
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        res.status(400).json({
          message: "Validation error",
          errors: e.errors,
        });
      }
    }
  };
}

// middleware to validate request body data
export function validateBodyData(schema: z.ZodObject<any, any>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (e) {
      if (e instanceof ZodError) {
        const errorMessage = e.errors.map((issue: any) => ({
          message: `${issue.path.join(".")} is ${issue.message}`,
        }));

        return res.status(400).json({
          error: "Invalid data",
          details: errorMessage,
        });
      } else {
        return res.status(500).json("Internal Server Error");
      }
    }
  };
}

//middleware to handle not found routes
export function notFound(req: Request, res: Response, next: NextFunction) {
  res.status(404);
  const error: Error = new Error(` Not Found - ${req.originalUrl}`);
  next(error);
}

//middleware to handle errors
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const statusCode: number = res.statusCode !== 200 ? res.statusCode : 500;
  res.status(statusCode).json({
    code: statusCode,
    message: error.message,
    stack: error.stack,
  });
}
