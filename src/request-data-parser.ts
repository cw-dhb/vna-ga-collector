export type FingerprintResultComponent = {
  useragent: {
    browser: {
      family: string;
      version: string;
    };
    device: {
      family: string;
      version: string;
    };
    os: {
      family: string;
      major: string;
      minor: string;
    };
  };
  acceptHeaders: {
    accept: string;
    encoding: string;
    language: string;
  };
  geoip: {
    country: string;
    resion: string;
    city: string;
  };
};

const naverProductIdExtractor = (naverUrl: string) => {
  if (!naverUrl || !naverUrl.startsWith('https://smartsotre.naver.com'))
    return '';

  return naverUrl.split('//')[1].split('/')[
    naverUrl.split('//')[1].split('/').indexOf('products') + 1
  ];
};

const productIdExtractorMap = new Map([['네이버', naverProductIdExtractor]]);

const marketUrlMap = new Map([
  ['naver.com', '네이버'],
  ['gmarket.co.kr', '지마켓'],
  ['auction.co.kr', '옥션'],
  ['tmon.co.kr', '티몬'],
  ['wemakeprice.com', '위메프'],
  ['11st.co.kr', '11번가'],
]);

export const extractMarketInfoFromUri = (url: string) => {
  if (!url) return '';

  for (const [marketUrl, marketName] of marketUrlMap.entries()) {
    if (url.includes(marketUrl)) {
      const productId = productIdExtractorMap.get(marketName)(url);
      return [marketName, productId];
    }
  }
  return '';
};

const languageHeaderToLangauge = (languageHeader: string) => {
  if (typeof languageHeader !== 'string') return '';
  return languageHeader.split(';')[0];
};

const useragentHeaderToDevice = (
  useragentHeader: FingerprintResultComponent['useragent'],
) => {
  if (!useragentHeader) return '';
  return `브라우저: ${useragentHeader.browser?.family}, 기기: ${useragentHeader.device?.family}, 운영체제: ${useragentHeader.os?.family} `;
};

export const getUserInfoFromFingerprint = (
  fingerprintResultComponents: FingerprintResultComponent,
) => {
  if (!fingerprintResultComponents) return {};

  return {
    country: fingerprintResultComponents.geoip?.country,
    language: languageHeaderToLangauge(
      fingerprintResultComponents.acceptHeaders?.language,
    ),
    device: useragentHeaderToDevice(fingerprintResultComponents.useragent),
  };
};
