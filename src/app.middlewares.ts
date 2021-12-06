import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Fingerprint from 'express-fingerprint';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const fingerprintMiddleware = Fingerprint();
    fingerprintMiddleware(req, res, next);
  }
}
