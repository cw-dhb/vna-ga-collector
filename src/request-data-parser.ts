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
  for (const [key, value] of marketUrlMap.entries()) {
    if (url.includes(value)) return key;
  }
  return '';
};

export const getUserInfoFromFingerprint = (
  fingerprintResultComponents: FingerprintResultComponent[],
) => {
  if (fingerprintResultComponents.length) return {};

  const result = fingerprintResultComponents[0];
  return {
    country: result.geoip?.country,
    language: result.acceptHeaders?.language,
    device:
      result.useragent?.browser?.family +
      result.useragent.device?.family +
      result.useragent.os?.family,
  };
};
