import { Controller, Get, Req, StreamableFile } from '@nestjs/common';
import { Request } from 'express';

import { createReadStream } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import {
  extractMarketInfoFromUri,
  getUserInfoFromFingerprint,
  FingerprintResultComponent,
} from './request-data-parser';

// GA API 사용을 위한 데이터
const measurement_id = `G-E7R74Z84F1`;
const api_secret = `RblWGVY3QzyBVbyvOjj3Kg`;

@Controller('exclamation.png')
export class FileController {
  @Get()
  getFile(@Req() request: Request): StreamableFile {
    const [marketName, productId] = extractMarketInfoFromUri(
      request.headers.referer,
    );
    const userInfo = getUserInfoFromFingerprint(
      request.fingerprint.components as unknown as FingerprintResultComponent,
    );

    console.info(request.fingerprint);

    console.info(marketName, userInfo);

    fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`,
      {
        method: 'POST',
        body: JSON.stringify({
          client_id: request.fingerprint.hash,
          events: [
            {
              name: '상품조회',
              params: {
                marketName,
                productId,
                ...userInfo,
              },
            },
          ],
        }),
      },
    );

    const file = createReadStream(join(process.cwd(), 'exclamation.png'));
    return new StreamableFile(file);
  }
}
