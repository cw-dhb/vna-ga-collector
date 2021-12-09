## 개요

일반적으로 GA를 활용해서 데이터를 수집하는 방법은 GA의 SDK를 상품 판매 사이트에 설치하고 SDK가 제공하는 기능을 사용하는것입니다.

**그러나** **오픈마켓 플랫폼들이 외부 JavaScript 파일 설치를 제한**하기 때문에 일반적인 방법으로는 지표를 수집할 수 없습니다.

이런 상황에서는 두 가지 방법으로 지표를 수집할 수 있습니다.

1. 오픈마켓에서 공식적으로 제공하는 API를 연동하여 지표를 수집.
2. 상품의 상세설명에 이미지를 업로드하여 제한적으로 지표를 수집.(임시방안)

이 프로그램은 두 번째 방법인 인시방안을 적용합니다.

작업 시간은 정식적인 방법에 비해서 비교적 짧지만, 아래와같은 제한사항들이 있으므로 장기적인 관점에서 사용할만한 방법은 아닙니다.

### 임시방안의 제한사항

- 등록하려는 상품마다 이미지 태그를 설치해야합니다.
- 접속 사용자를 알 수 없고 상품 조회 이벤트만 수집 가능합니다.
  - 접속한 오픈마켓, 접속 국가, 언어, 기기 등을 수집.
- GA 서버에 이벤트를 발송하는 구글의 API가 beta 버전이므로 추후 변경 가능성이 있습니다.
