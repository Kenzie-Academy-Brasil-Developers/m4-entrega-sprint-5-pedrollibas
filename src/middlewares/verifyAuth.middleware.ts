import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";

const verifyAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY as string, (err, decoded: any) => {
    if (err) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    req.user = {
      isAdm: decoded.isAdm,
      id: decoded.sub,
    };

    next();
  });
};

export default verifyAuthMiddleware;
