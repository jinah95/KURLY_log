import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import KurlyLogo from "../public/images/KurlyLogo.png";
import cart from "../public/images/cart.png";
import login from "../public/images/login.png";

const Navbar = () => {
    const router = useRouter();
    const pathQuery = router.pathname.slice(1);
    // console.log(pathQuery); // 페이지 새로고침 시 이미지 변경 부분에 대하여
    const [targetPage, setTargetPage] = useState(
        pathQuery !== "login" ? "market" : "login"
    );
    const [targetTab, setTargetTab] = useState("best");
    const [loginOpen, setLoginOpen] = useState("");

    return (
        <>
            {" "}
            <NavWrapper targetPage={targetPage}>
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
                                setTargetTab("best");
                                router.push("/");
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
                                router.push("/beauty");
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
                                setTargetTab("kurlioncer");
                                router.push("/kurlylog");
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
                        <Image
                            src={login}
                            alt="logo"
                            width={25}
                            height={25}
                            onClick={() => {
                                router.push("/login");
                                setTargetPage("login");
                            }}
                        />
                        <Image src={cart} alt="logo" width={25} height={26} />
                    </ButtonWrapper>
                </TitleDiv>
                {targetPage !== "login" ? (
                    <MenuNav targetPage={targetPage}>
                        <Link
                            href={targetPage === "market" ? "/" : "/kurlylog"}
                            passHref
                        >
                            <PageATag
                                onClick={(e) => setTargetTab(e.target.id)}
                            >
                                <PageNameSpan
                                    id={
                                        targetPage === "market"
                                            ? "best"
                                            : "kurlioncer"
                                    }
                                    targetTab={targetTab}
                                >
                                    {targetPage === "market"
                                        ? "베스트"
                                        : "컬리 언서"}
                                </PageNameSpan>
                            </PageATag>
                        </Link>
                        <Link
                            href={
                                targetPage === "market"
                                    ? "/event"
                                    : "/risingreview"
                            }
                            passHref
                        >
                            <PageATag
                                onClick={(e) => setTargetTab(e.target.id)}
                            >
                                <PageNameSpan
                                    id={
                                        targetPage === "market"
                                            ? "event"
                                            : "rising"
                                    }
                                    targetTab={targetTab}
                                >
                                    {targetPage === "market"
                                        ? "이벤트"
                                        : "샛별 리뷰"}
                                </PageNameSpan>
                            </PageATag>
                        </Link>
                        {targetPage === "market" ? (
                            <></>
                        ) : (
                            <Link href="/myKurly/:id" passHref>
                                <PageATag
                                    onClick={(e) => setTargetTab(e.target.id)}
                                >
                                    <PageNameSpan
                                        id="kurlyLog"
                                        targetTab={targetTab}
                                    >
                                        내 컬리log
                                    </PageNameSpan>
                                </PageATag>
                            </Link>
                        )}
                    </MenuNav>
                ) : (
                    <></>
                )}
            </NavWrapper>
            <ParDiv targetPage={targetPage}></ParDiv>
        </>
    );
};

export default Navbar;

const NavWrapper = styled.div`
    width: 100%;
    height: ${(props) => (props.targetPage !== "login" ? "88px" : "44px")};
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
    height: ${(props) => (props.targetPage !== "login" ? "88px" : "44px")};
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
    justify-content: ${(props) =>
        props.targetPage === "market" ? "space-evenly" : "space-between"};
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
    background-color: ${(props) =>
        props.targetPage !== "login" ? "rgb(95, 0, 128)" : ""};
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
