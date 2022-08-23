# KRULY'log

## 서비스 개요

<img src="file:///Users/shj/Desktop/Snipaste_2022-08-23_21-01-25.png" alt="컬리로그 로고" width="600" >

#### Kurly'log는 이커머스와 SNS를 통합한 서비스입니다.<br />

마켓컬리의 후기시스템에서의 사용자경험을 개선하고자 하였습니다.<br />

마켓컬리 내부에 커뮤니티 플랫폼을 형성하여 고객이 소통하는 경험을 할 수 있고, <br />
이를 통해 자체적인 마이크로 인플루언서를 양성하여 자연스럽게 상품의 추천 및 홍보가 가능합니다.

Makes influencer in Market-Kurly using KRULY'log system.<br /><br />

<hr /><br />

## 🖋 Infra Architecture

![image](https://user-images.githubusercontent.com/61112694/186138201-f4538edc-be93-4757-9d23-246f0ad72e01.png)

<hr /><br />

## 📦 ERD

![image](https://cdn.discordapp.com/attachments/979000955657945131/1011594777973751829/unknown.png)

<br />

<hr /><br />

## 🖥 Using Skills

![image](https://cdn.discordapp.com/attachments/979000955657945131/1011593259635716217/skillstack.png)

<hr /><br />

## 💡 실행방법

#### 프론트엔드

shell

```shell
yarn
yarn dev
```

#### 백엔드

.env

```
// 서버 포트
SERVER_PORT=5000

// RDS 사용 관련 정보
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=

// JWT 전자서명 키
JWT_SECRET_KEY = 'ssap-kurly'

// 개발 관련 변수
NODE_ENV='development'

// S3 사용 관련 인증키
REGION =
AWS_ACCESS_KEY =
AWS_SECRET_KEY =
BUCKET_NAME =
```

shell

```shell
yarn
yarn start
```

## ✍🏼 Structure

- [Wire frame](https://www.figma.com/file/pSbjxnNH4YSfBlJqjo4fqS/SSAP?node-id=0%3A1)<br />
- [Flow chart](https://www.figma.com/file/1GyGG6TfHAF3B0meHGpoyZ/%EC%BB%AC%EB%A6%AC-log---%ED%94%8C%EB%A1%9C%EC%9A%B0?node-id=0%3A1)
- [ERD](https://www.erdcloud.com/d/CbLoq2KQTdoZ6RPnQ)
- [API](https://chipped-cookie-c3b.notion.site/API-c91a0d7c2a1d4df5a900039ed8c28ad7)<br /><br /><BR />
<hr />

## 👨‍👨‍👧‍👧 우리 팀 이름은 <b>SSAP</b> ('쌉')입니다. <br /> <br />

<img src="https://user-images.githubusercontent.com/97212459/185301108-05805298-8f35-47b5-a617-dd620e00ab34.png" width="300" height="100" alt="ssap로고"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="file:///Users/shj/Documents/%E1%84%8F%E1%85%A5%E1%86%AF%E1%84%85%E1%85%B5%20%E1%84%92%E1%85%A2%E1%84%8F%E1%85%A5%E1%84%90%E1%85%A9%E1%86%AB/kurly_ssap_logo_circle.png" alt="원형 로고" width="100">
<br /><br />
‘SSAP’은 팀원들의 성 이니셜( S도희 / S현주 / A민영 / P진아 )을 조합한 팀 명입니다.<br />
또한, 'SSAP(쌉)'가능은 완전 가능한 상태를 의미하는 신조어입니다. 여기서 '쌉'은 완전의 의미를 가진 접두어로 사용되고 있습니다. <br />

- <B>S</B>hin Do hee <br />
- <B>S</B>on Hyeon ju <br />
- <B>A</B>n Min young
- <B>P</B>ark Jin ah
  <br /><br />
  | 이름 | 역할 |
  | :-----: | :--------: |
  | 신도희(S) | 백엔드 |
  | 손현주(S) | 백엔드 |
  | 안민영(A) | 프론트엔드 |
  | 박진아(P) | 프론트엔드 |

<hr /><br /><br />
