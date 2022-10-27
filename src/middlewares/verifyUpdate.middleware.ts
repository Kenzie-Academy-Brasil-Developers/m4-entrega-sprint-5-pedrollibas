import { NextFunction, Request, Response } from "express";

const verifyUpdateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.user.id === req.params.id) {
    return next();
  } else if (req.user.isAdm) {
    return next();
  }

  return res.status(401).json({
    message: "User is not admin",
  });
};

export default verifyUpdateMiddleware;
