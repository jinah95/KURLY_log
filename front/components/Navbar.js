import React, { useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import Image from "next/image";
import KurlyLogo from "../public/images/KurlyLogo.png";
import cart from "../public/images/cart.png";
import loginIcon from "../public/images/login.png";
import logoutIcon from "../public/images/logout.png";

import { UserStateContext, DispatchContext } from "../pages/_app";

const Navbar = () => {
    const router = useRouter();
    const productId = router.query?.item;
    const pathName = router.pathname;

    const [targetPage, setTargetPage] = useState(
        pathName === "/" || pathName === "/event"
            ? "market"
            : pathName === "/kurlioncer" || pathName === "/risingreview"
            ? "kurlioncer"
            : pathName === "/beauty"
            ? "beauty"
            : pathName === "/login"
            ? "login"
            : pathName === "/product/[item]" || pathName === "/review/[item]"
            ? "product"
            : pathName === "/kurlylog/post/[review_id]"
            ? "kurlioncer"
            : undefined
    );
    const [targetTab, setTargetTab] = useState(
        pathName === "/" || pathName === "/best"
            ? "best"
            : pathName === "/event"
            ? "event"
            : pathName === "/risingreview"
            ? "rising"
            : pathName === "/kurlioncer"
            ? "kurlioncer"
            : pathName === "/product/[item]"
            ? "detail"
            : pathName === "/review/[item]"
            ? "review"
            : "kurlylog"
    );

    const dispatch = useContext(DispatchContext);
    const userState = useContext(UserStateContext);

    const isLogin = !!userState.user;
    const userId = userState.user?.userId;

    const logout = () => {
        // sessionStorage에 저장했던 JWT 토큰 삭제
        sessionStorage.removeItem("userToken");
        // dispatch 함수를 이용해 로그아웃함.
        dispatch({ type: "LOGOUT" });
    };

    return (
        <>
            {" "}
            <NavWrapper targetPage={targetPage} pathName={pathName}>
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
                            targetPage={
                                targetPage === "product" || pathName === "/"
                                    ? "market"
                                    : targetPage === "kurlioncer"
                                    ? "kurlioncer"
                                    : "market"
                            }
                            onClick={(e) => {
                                setTargetPage(e.target.id);
                                router.push("/");
                                setTargetTab("best");
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
                            id="kurlioncer"
                            targetPage={
                                pathName === "/" ? "market" : targetPage
                            }
                            onClick={(e) => {
                                setTargetPage(e.target.id);
                                router.push("/kurlioncer");
                                setTargetTab("kurlioncer");
                            }}
                        >
                            <PageTitle
                                type="radio"
                                value="REVIEW"
                                id="kurlioncer"
                            />
                            컬리로그
                        </WrapLabel>
                        <TapSpan targetPage={targetPage} pathName={pathName} />
                    </PageTab>
                    <ButtonWrapper>
                        {!isLogin ? (
                            <Image
                                src={loginIcon}
                                alt="login"
                                width={25}
                                height={25}
                                onClick={() => router.push("/login")}
                            />
                        ) : (
                            <Image
                                src={logoutIcon}
                                alt="logout"
                                width={25}
                                height={25}
                                onClick={() => {
                                    logout();
                                }}
                            />
                        )}
                        <Image src={cart} alt="logo" width={25} height={26} />
                    </ButtonWrapper>
                </TitleDiv>
                {pathName !== "/login" || pathName !== "beauty" ? (
                    <MenuNav targetPage={targetPage} pathName={pathName}>
                        <Link
                            href={
                                targetPage === "market"
                                    ? "/"
                                    : targetPage === "product" ||
                                      targetPage === "review"
                                    ? `/product/${productId}`
                                    : "/kurlioncer"
                            }
                            passHref
                        >
                            <PageATag
                                onClick={(e) => setTargetTab(e.target.id)}
                            >
                                <PageNameSpan
                                    id={
                                        targetPage === "market"
                                            ? "best"
                                            : targetPage === "kurlioncer"
                                            ? "kurlioncer"
                                            : targetTab === "detail"
                                            ? "detail"
                                            : pathName === "/"
                                            ? "best"
                                            : targetTab === "review"
                                            ? "kurlioncer"
                                            : targetPage === "product"
                                            ? "best"
                                            : "rising"
                                    }
                                    targetTab={
                                        targetPage === "kurlioncer" &&
                                        targetTab === "kurlioncer"
                                            ? "kurlioncer"
                                            : targetTab === "detail"
                                            ? "detail"
                                            : pathName === "/"
                                            ? "best"
                                            : pathName === "kurlioncer"
                                            ? "kurlioncer"
                                            : targetPage === "product"
                                            ? "best"
                                            : targetTab
                                    }
                                >
                                    {(targetPage === "product" &&
                                        pathName !== "/") ||
                                    pathName === "/product/[item]" ||
                                    targetPage === "review"
                                        ? "상품정보"
                                        : targetPage === "market" ||
                                          pathName === "/"
                                        ? "베스트"
                                        : "컬리 언서"}
                                </PageNameSpan>
                            </PageATag>
                        </Link>
                        <Link
                            href={
                                targetPage === "product" ||
                                pathName === "/product/[item]" ||
                                targetPage === "review"
                                    ? `/review/${productId}`
                                    : targetPage === "market"
                                    ? `/event`
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
                                            : targetPage === "product" ||
                                              pathName === "/review/[item]"
                                            ? "review"
                                            : "rising"
                                    }
                                    targetTab={
                                        pathName === "/" ? "" : targetTab
                                    }
                                >
                                    {(targetPage === "product" &&
                                        pathName !== "/") ||
                                    pathName === "/product/[item]" ||
                                    pathName === "/review/[item]" ||
                                    targetPage === "review"
                                        ? "후기"
                                        : targetPage === "market" ||
                                          pathName === "/"
                                        ? "이벤트"
                                        : "샛별 리뷰"}
                                </PageNameSpan>
                            </PageATag>
                        </Link>
                        {targetPage === "market" ||
                        targetPage === "product" ||
                        pathName === "/" ? (
                            <></>
                        ) : (
                            <Link href={`/kurlylog/${userId}`} passHref>
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
            <ParDiv targetPage={targetPage} pathName={pathName}></ParDiv>
        </>
    );
};

export default Navbar;

const NavWrapper = styled.div`
    width: 100%;
    height: ${(props) =>
        props.targetPage !== "login" || props.pathName !== "beauty"
            ? "88px"
            : "44px"};
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
    height: ${(props) =>
        props.targetPage !== "login" || props.pathName !== "kurlylog"
            ? "88px"
            : "44px"};
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
        props.targetPage === "market" ||
        props.targetPage === "product" ||
        props.pathName === "/"
            ? "space-evenly"
            : "space-between"};
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
        props.targetPage === "market" ||
        props.targetPage === "product" ||
        props.pathName === "/"
            ? "0px"
            : props.targetPage === "beauty"
            ? "33%"
            : "unset"};
    right: ${(props) =>
        props.targetPage === "market" ||
        props.targetPage === "product" ||
        props.pathName === "/"
            ? "unset"
            : "0px"};
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
