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

const marketUrlMap = new Map([
  ['네이버', 'naver.com'],
  ['지마켓', 'gmarket.co.kr'],
  ['옥션', 'auction.co.kr'],
  ['티몬', 'tmon.co.kr'],
  ['위메프', 'wemakeprice.com'],
  ['11번가', '11st.co.kr'],
]);

export const urlToMarketName = (url: string) => {
  if (!url) return '';

  for (const [key, value] of marketUrlMap.entries()) {
    if (url.includes(value)) return key;
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
