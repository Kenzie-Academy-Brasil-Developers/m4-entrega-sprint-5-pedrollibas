import { Request, Response } from "express";
import createUserService from "../services/user/createUser.service";
import { instanceToPlain } from "class-transformer";
import listAllUsersService from "../services/user/listAllUsers.service";
import updateUserService from "../services/user/updateUser.service";
import { User } from "../entities/user.entity";
import deleteUserService from "../services/user/deleteUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const { name, email, password, isAdm } = req.body;

  const userCreated = await createUserService({
    name,
    email,
    password,
    isAdm,
  });

  return res.status(201).json(instanceToPlain(userCreated));
};

export const listAllUsersController = async (req: Request, res: Response) => {
  const users = await listAllUsersService();

  return res.status(200).json(instanceToPlain(users));
};

export const updateUserController = async (req: Request, res: Response) => {
  const user = req.body;

  if (
    user.hasOwnProperty("id") ||
    user.hasOwnProperty("isAdm") ||
    user.hasOwnProperty("isActive")
  ) {
    return res.status(401).json({
      message: "No authorization",
    });
  }

  const id = req.params.id;

  const updateUser = await updateUserService(user, id);

  if (updateUser instanceof User) {
    return res.json(instanceToPlain(updateUser));
  }
};

export const deleteUserController = async (req: Request, res: Response) => {
  const id = req.params.id;
  const deletedUser = await deleteUserService(id);

  return res.status(204).send();
};
