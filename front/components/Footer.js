import React from "react";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import kurlylogLogo from "../public/kurlylog_logo.png";
import teamLogo from "../public/SSAP_team.png";

const Footer = () => {
    return (
        <Wrapper>
            <Switcher>
                <p>
                    <a>마켓컬리</a>
                </p>
                <p>
                    <a>뷰티컬리</a>
                </p>
                <p>
                    <a>컬리로그</a>
                </p>
            </Switcher>
            <KurlyLogoWrapper>
                <Image
                    src={kurlylogLogo}
                    alt="kurlylogLogo"
                    width={100}
                    height={80}
                />
                <EtcText> X </EtcText>
                <Image src={teamLogo} alt="teamLogo" width={150} height={50} />
            </KurlyLogoWrapper>
            <IntroduceService>
                <b>'컬리로그'</b> 서비스는 <b>'SSAP'</b>팀에 의해
                제작되었습니다.
                <br />
                기존 리뷰 기능 개선과 리뷰를 활용한 마케팅 '컬리언서', 그리고
                컬리고객들의 커뮤니티가 목적입니다.
                <br />
                <br />
                간접경험이라는 '리뷰'의 강점을 이용하여, 고객들에게 새로운
                물건을 추천하며, <br />
                '블로그' 라는 내 공간을 사용하여 유익한 정보까지 공유하게
                됩니다.
            </IntroduceService>
            <hr />
            <Contact>
                <a
                    target="_blank"
                    rel="noreferrer"
                    href="https://github.com/jinah95/KURLY_log"
                >
                    {" "}
                    <b>Contact Us! 😸 [Github]</b>
                </a>
            </Contact>
            <IntroduceTeam>
                팀원들의 성을 모아 만든 'SSAP'은 '쌉(완전)가능, 쌉(인정)'과 같이
                프로젝트에 대한 열의를 갖고 있습니다. <br />
                <br />
                <b>contributors</b>
                <br />• 백엔드 : 신 도 희 / 손 현 주<br />• 프론트엔드 : 박 진
                아 / 안 민 영
            </IntroduceTeam>
            <Copyright>
                <div>@ Copyright SSAP TEAM Corp. All rights reserved.</div>
            </Copyright>
        </Wrapper>
    );
};

export default Footer;

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    background-color: rgb(244, 244, 244);
    padding: 10px 16px 16px;
    font-size: 12px;
    color: rgb(153, 153, 153);
    line-height: 18px;
`;
const Switcher = styled.div`
    display: flex;
    justify-content: space-evenly;
`;
const EtcText = styled.div`
    font-weight: 300;
    font-size: 25px;
`;
const KurlyLogoWrapper = styled.div`
    width: auto;
    height: auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin: 4px 0;
`;

const IntroduceService = styled.div`
    width: 100%;
    height: auto;
    padding: 3px 0;
    margin-bottom: 18px;
`;

const IntroduceTeam = styled.div`
    width: 100%;
    height: auto;
    padding: 3px 0;
`;

const Copyright = styled.div`
    width: 100%;
    height: auto;
    padding: 10px 0;
    display: flex;
    justify-content: flex-end;
`;

const Contact = styled.div`
    width: 100%;
    height: auto;
    padding: 10px 0;
    cursor: pointer;
`;
