import React from "react";
import styled from "styled-components";
import Image from "next/image";
import KurlyLogo from "../public/images/KurlyLogo.png";
import cart from "../public/images/cart.png";
import spot from "../public/images/spot.png";

const Navbar = () => {
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
                            color="#4c4c4c"
                            for="market"
                            onClick={() => console.log("hello")}
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
                            for="beauty"
                            onClick={() => console.log("BEAUTY")}
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
                            for="review"
                            onClick={() => console.log("BEAUTY")}
                        >
                            <PageTitle
                                type="radio"
                                value="REVIEW"
                                id="review"
                            />
                            컬리로그
                        </WrapLabel>
                        <TapSpan />
                    </PageTab>
                    <ButtonWrapper>
                        <Image src={spot} alt="logo" width={33} height={33} />

                        <Image src={cart} alt="logo" width={33} height={33} />
                    </ButtonWrapper>
                </TitleDiv>
                <MenuNav></MenuNav>
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
    width: 21%;
    display: flex;
    align-item: center;
`;

const MenuNav = styled.div`
    min-height: 44px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const PageTab = styled.div`
    background-color: rgb(242, 242, 242);
    border-radius: 14px;
    height: 28px;
    position: relative;
    display: flex;
    justify-content: center;
    align-item: center;
    width: 300px;
    margin-left: 16px;
`;

const PageTitle = styled.input`
    opacity: 0;
    width: 0px;
    height: 0px;
`;

const TapSpan = styled.span`
    background-color: rgb(95, 0, 128);
    position: absolute;
    width: 76px;
    height: 28px;
    border-radius: 14px;
    top: 0px;
    left: unset;
    right: 0px;
    bottom: 0px;
`;

const WrapLabel = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    z-index: 1;
    // padding: 0px 18px 0px 10px;
    font-size: 13px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.69;
    letter-spacing: normal;
    word-break: keep-all;
`;

const ButtonWrapper = styled.div`
    width: 26%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    padding-left: 16px;
`;
