import 'express-session';
import { Request, Response, NextFunction } from 'express';

declare module 'express-session' {
  interface SessionData {
    userId?: string;
    role?: string;
  }
}

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.userId) {
    return next();
  }

  return res.status(401).json({ message: "Unauthorized access" });
};
