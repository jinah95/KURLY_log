import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import KurlyLogo from "../public/images/KurlyLogo.png";
import cart from "../public/images/cart.png";
import spot from "../public/images/spot.png";

const Navbar = () => {
    const [targetPage, setTargetPage] = useState("market");
    const [targetTab, setTargetTab] = useState("kurlioncer");

    return (
        <>
            {" "}
            <NavWrapper>
                <TitleDiv>
                    <LogoWrapper>
                        <Image
                            src={KurlyLogo}
                            alt="logo"
                            width={60}
                            height={32}
                        />
                    </LogoWrapper>
                    <PageTab>
                        <WrapLabel
                            htmlFor="market"
                            id="market"
                            targetPage={targetPage}
                            onClick={(e) => {
                                setTargetPage(e.target.id);
                            }}
                        >
                            <PageTitle
                                type="radio"
                                value="MARKET"
                                id="market"
                            />
                            마켓컬리
                        </WrapLabel>
                        <WrapLabel
                            color="#fff"
                            htmlFor="beauty"
                            id="beauty"
                            targetPage={targetPage}
                            onClick={(e) => {
                                setTargetPage(e.target.id);
                            }}
                        >
                            <PageTitle
                                type="radio"
                                value="BEAUTY"
                                id="beauty"
                            />
                            뷰티컬리
                        </WrapLabel>
                        <WrapLabel
                            color="#fff"
                            htmlFor="review"
                            id="review"
                            targetPage={targetPage}
                            onClick={(e) => {
                                setTargetPage(e.target.id);
                            }}
                        >
                            <PageTitle
                                type="radio"
                                value="REVIEW"
                                id="review"
                            />
                            컬리로그
                        </WrapLabel>
                        <TapSpan targetPage={targetPage} />
                    </PageTab>
                    <ButtonWrapper>
                        <Image src={spot} alt="logo" width={25} height={26} />
                        <Image src={cart} alt="logo" width={25} height={26} />
                    </ButtonWrapper>
                </TitleDiv>
                <MenuNav>
                    <Link href="/" passHref>
                        <PageATag onClick={(e) => setTargetTab(e.target.id)}>
                            <PageNameSpan id="kurlioncer" targetTab={targetTab}>
                                컬리 언서
                            </PageNameSpan>
                        </PageATag>
                    </Link>
                    <Link href="/" passHref>
                        <PageATag onClick={(e) => setTargetTab(e.target.id)}>
                            <PageNameSpan id="rising" targetTab={targetTab}>
                                샛별 리뷰
                            </PageNameSpan>
                        </PageATag>
                    </Link>
                    <Link href="/myKurly/:id" passHref>
                        <PageATag onClick={(e) => setTargetTab(e.target.id)}>
                            <PageNameSpan id="kurlyLog" targetTab={targetTab}>
                                내 컬리log
                            </PageNameSpan>
                        </PageATag>
                    </Link>
                </MenuNav>
            </NavWrapper>
            <ParDiv></ParDiv>
        </>
    );
};

export default Navbar;

const NavWrapper = styled.div`
    width: 100%;
    height: 88px;
    position: fixed;
    z-index: 1000;
    box-shadow: rgb(221 221 221) 0px -0.5px 0px 0px inset;
    background-color: #fff;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
`;
const ParDiv = styled.div`
    width: 100%;
    height: 88px;
`;

const TitleDiv = styled.div`
    min-height: 44px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 16px;
`;

const LogoWrapper = styled.div`
    width: 26%;
    display: flex;
    align-item: center;
`;

const MenuNav = styled.nav`
    height: 44px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0px 1.5rem;
`;

const PageTab = styled.div`
    background-color: rgb(242, 242, 242);
    border-radius: 14px;
    height: 28px;
    position: relative;
    display: flex;
    justify-content: center;
    align-item: center;
    margin: 0 10px;
`;

const PageTitle = styled.input`
    opacity: 0;
    width: 0px;
    height: 0px;
`;

const TapSpan = styled.span`
    background-color: rgb(95, 0, 128);
    position: absolute;
    width: 80px;
    height: 28px;
    border-radius: 14px;
    top: 0px;
    left: ${(props) =>
        props.targetPage === "market"
            ? "0px"
            : props.targetPage === "beauty"
            ? "33%"
            : "unset"};
    right: ${(props) => (props.targetPage === "market" ? "unset" : "0px")};
    bottom: 0px;
`;

const WrapLabel = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 1;
    padding: 0px 12px 0px 7px;
    font-size: 13px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.69;
    letter-spacing: normal;
    word-break: keep-all;
    color: ${(props) => (props.id === props.targetPage ? "white" : "black")};
`;

const ButtonWrapper = styled.div`
    width: 26%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

const PageATag = styled.a`
    background-color: transparent;
    text-decoration: none;
`;

const PageNameSpan = styled.span`
    position: relative;
    height: 44px;
    display: flex;
    align-items: center;

    ${(props) => !(props.id === props.targetTab)} && {
        font-weight: 600;
        color: rgb(95, 0, 128);
        ::after {
            content: " ";
            position: absolute;
            left: -2px;
            right: 0;
            bottom: 0;
            background-color: rgb(95, 0, 128);
            height: 2px;
            width: calc(100% + 4px);
        }
    }
`;
