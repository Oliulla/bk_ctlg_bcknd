/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { JwtPayload } from "jsonwebtoken";
declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | null;
    }
  }
}
