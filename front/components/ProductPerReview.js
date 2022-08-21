import React from "react";
import Image from "next/image";
import styled from "styled-components";
import BuyingFooter from "./BuyingFooter";
import Reviews from "./Reviews";
import plusStar from "../public/plusStar.png";
import minusStar from "../public/minusStar.png";

const ProductPerReview = () => {
    return (
        <Wrapper>
            <ButtonWrapper>
                {" "}
                <ReviewWriter>후기 작성</ReviewWriter>
                <ReviewWrapper>
                    <StarWrapper>
                        <Image
                            src={plusStar}
                            alt="plusStar"
                            width={35}
                            height={35}
                        />
                        <Image
                            src={plusStar}
                            alt="plusStar"
                            width={35}
                            height={35}
                        />
                        <Image
                            src={plusStar}
                            alt="plusStar"
                            width={35}
                            height={35}
                        />
                        <Image
                            src={minusStar}
                            alt="plusStar"
                            width={35}
                            height={35}
                        />
                        <Image
                            src={minusStar}
                            alt="plusStar"
                            width={35}
                            height={35}
                        />
                    </StarWrapper>
                    <ReviewTotal>1,766</ReviewTotal>
                </ReviewWrapper>
            </ButtonWrapper>
            <Reviews />

            <BuyingFooter />
        </Wrapper>
    );
};

export default ProductPerReview;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
`;

const ButtonWrapper = styled.div`
    padding: 20px 10px;
    width: 100%;
    height: 150px;
    position: fixed;
    z-index: 100000;
    background-color: white;
`;

const ReviewWriter = styled.button`
    width: 100%;
    height: 50px;
    border: 1px solid rgb(95, 0, 128);
    color: rgb(95, 0, 128);
    font-size: 16px;
    font-weight: 600;
    background-color: #fff;
    cursor: pointer;
`;

const ReviewWrapper = styled.div`
    display: grid;
    grid-template-columns: 8fr 2fr;
    padding: 15px 2px;
`;

const StarWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ReviewTotal = styled.div`
    font-size: 28px;
    color: purple;
    font-weight: 600;
    text-align: right;
`;
