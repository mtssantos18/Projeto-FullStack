import { NextFunction, Request, Response } from "express";
import AppError from "../errors/AppError";
import jwt from "jsonwebtoken";

const authTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Invalid Token.", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        throw new AppError("Invalid token.", 401);
      }

      req.user = {
        phonesUser: decoded.phones,
        emailsUser: decoded.emails,
        idUser: decoded.sub,
      };
    }
  );

  next();
};

export default authTokenMiddleware;
