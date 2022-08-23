import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

const BestProduct = ({ item }) => {
    const router = useRouter();

    return (
        <CardWrapper
            onClick={() => {
                router.push(`/product/${item.product_id}`);
            }}
        >
            <CardActionArea>
                <ImgWrapper>
                    <CardMedia
                        component="img"
                        height="216"
                        image={item.image[0]}
                        alt="green iguana"
                    />
                    <ProductSticker>
                        <StickerTitle>최다 리뷰</StickerTitle>
                    </ProductSticker>
                </ImgWrapper>
                <CardInfo>
                    <Title>{item.detail}</Title>
                    <Price>12,000원</Price>
                </CardInfo>
            </CardActionArea>
        </CardWrapper>
    );
};

export default BestProduct;

const CardWrapper = materialStyled(Card)(() => ({
    width: "calc(40vw + 16px)",
    height: "auto",
    paddingLeft: "16px",
    display: "inline-block",
    borderRadius: "0",
    boxShadow: "none",
    marginLeft: "-8px",
}));
const ImgWrapper = styled.div`
    width: auto;
    height: auto;
    position: relative;
    opacity: 0.89;
`;

const ProductSticker = styled.div`
    position: absolute;
    left: 0px;
    top: 0px;
    opacity: 0.9;
    background-color: rgb(189, 118, 255);
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    padding: 0px 8px;
    height: 24px;
`;

const StickerTitle = styled.span`
    font-size: 14px;
    line-height: 1.43px;
    font-weight: bold;
    color: rgb(255, 255, 255);
`;

const CardInfo = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding: 8px 0px;
`;

const Title = styled.div`
    overflow: hidden;
    font-size: 14px;
    line-height: 1.36;
    font-weight: 400;
    margin-bottom: 4px;
    text-overflow: ellipsis;
    word-break: break-word;
    overflow-wrap: break-word;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Price = styled.div`
    font-size: 14px;
    font-weight: bold;
    line-height: 1.36;
    white-space: nowrap;
    color: rgb(51, 51, 51);
`;
