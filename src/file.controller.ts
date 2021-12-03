import { Controller, Get, Req, StreamableFile } from '@nestjs/common';
import { Request } from 'express';

import { createReadStream } from 'fs';
import { join } from 'path';
import fetch from 'node-fetch';

@Controller('exclamation.png')
export class FileController {
  @Get()
  getFile(@Req() request: Request): StreamableFile {
    const requestUri = request.headers.referer;
    const splitedOrigin = requestUri.split('?')[0].split('/');

    const marketName = splitedOrigin[2];
    const productName = splitedOrigin[splitedOrigin.length - 1];

    const os = request.headers['sec-ch-ua-platform'];
    let language = request.headers['accept-language'];
    if (language) language = language.split(';')[0];

    const measurement_id = `G-E7R74Z84F1`;
    const api_secret = `RblWGVY3QzyBVbyvOjj3Kg`;

    fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${measurement_id}&api_secret=${api_secret}`,
      {
        method: 'POST',
        body: JSON.stringify({
          // 유니크한 ID로 교체 필요.
          client_id: 'XXXXXXXXXX.YYYYYYYYYY',
          events: [
            {
              name: '상품조회',
              params: {
                marketName,
                productName,
                os,
                language,
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
