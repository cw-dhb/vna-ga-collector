import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import Fingerprint from 'express-fingerprint';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Fingerprinter = require('express-fingerprint') as typeof Fingerprint;

@Injectable()
export class AppMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const fingerprintMiddleware = Fingerprinter();
    fingerprintMiddleware(req, res, next);
  }
}
