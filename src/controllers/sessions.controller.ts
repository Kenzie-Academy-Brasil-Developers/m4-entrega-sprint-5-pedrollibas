import { Request, Response } from "express";
import userLoginService from "../services/sessions/userLogin.service";

export const userLoginController = async (req: Request, res: Response) => {
  const data = req.body;
  const token = await userLoginService(data);

  return res.status(200).json({ token });
};
