import React from "react";
import styled from "styled-components";

const BuyingFooter = () => {
    return (
        <Wrapper>
            <BuyingButtonWrapper>
                <BuyingButton>구매하기</BuyingButton>
            </BuyingButtonWrapper>
        </Wrapper>
    );
};

export default BuyingFooter;

const Wrapper = styled.div`
    position: fixed;
    bottom: 0px;
    display: flex;
    gap: 8px;
    width: 100%;
    height: 68px;
    padding: 8px 12px;
    box-shadow: rgb(252 252 252) 0px 1px 0px 0px inset;
    background-color: rgb(255, 255, 255);
    z-index: 20;
`;

const BuyingButtonWrapper = styled.div`
    display: flex;
    flex: 1 1 0%;
`;

const BuyingButton = styled.button`
    display: block;
    padding: 0px 10px;
    text-align: center;
    overflow: hidden;
    width: 100%;
    height: 52px;
    border-radius: 6px;
    color: rgb(255, 255, 255);
    background-color: rgb(95, 0, 128);
    border: 0px none;
`;
