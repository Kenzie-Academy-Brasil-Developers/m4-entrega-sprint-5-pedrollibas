import { NextFunction, Request, Response } from "express";

const verifyIsAdmMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user.isAdm) {
    return res.status(403).json({
      message: "User is not admin",
    });
  }

  next();
};

export default verifyIsAdmMiddleware;
