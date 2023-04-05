import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import auth from "../../../../config/auth";
import AppError from "../../../errors/AppError";
;

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
  email: string;
  company_name: string;
  company_id: string;
}

export default function ensureAuthenticated(
  request: Request,
  response:Response,
  next: NextFunction): void {

    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new AppError("JWT token is missing", 401)
    }

    //Bearer token

    const [bearer, token] = authHeader.split(' ');

    try {
      const decode = verify(token, auth.secret_refresh_token)

      const { sub } = decode as TokenPayload;

      request.user = {
        id: sub
      }

      return next()
    } catch {
      throw new AppError('Invalid JWT token', 401)
    }
}
