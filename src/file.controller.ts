import { Controller, Get, Req, StreamableFile } from '@nestjs/common';
import { Request } from 'express';

import { createReadStream } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';
import {
  extractMarketNameFromUri,
  getUserInfoFromFingerprint,
  FingerprintResultComponent,
} from './request-data-parser';

// ### GA API 사용을 위한 데이터 ###
// GA 콘솔 -> 데이터 스트림 경로에서 G-ID, secret을 생성해서 아래 두 값을 교체해주세요.
const measurement_id = `G-E7R74Z84F1`;
const api_secret = `RblWGVY3QzyBVbyvOjj3Kg`;

@Controller('exclamation.png')
export class FileController {
  @Get()
  getFile(@Req() request: Request): StreamableFile {
    const marketName = extractMarketNameFromUri(request.headers.referer);
    const userInfo = getUserInfoFromFingerprint(
      request.fingerprint.components as unknown as FingerprintResultComponent,
    );

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
