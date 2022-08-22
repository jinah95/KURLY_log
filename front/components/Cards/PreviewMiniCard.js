import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

// bad: "매워요.."
// content: "불닭볶음면"
// created_at: "2022-08-21T10:33:36.800Z"
// good: "맛있어요"
// image: []
// product_id: 1007
// review_id: 8
// score: 4
// title: "한국인의 맛"
// user_id: "e373a5b2-4918-43b2-bf85-7af10a41b4a3"

const PreviewMiniCard = ({ post }) => {

    return (
        <Link href={`/kurlyLog/${post.product_id}`} passHref>
        <CardWrapper>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="150"
                    image="/background.jpg"
                    alt="green iguana"
                />
                <CardInfo>
                    <Title>{post.title}</Title>
                    <SubTitle>기타</SubTitle>
                </CardInfo>
            </CardActionArea>
        </CardWrapper>
        </Link>
    )
}

export default PreviewMiniCard;

const CardWrapper = materialStyled(Card)(
    () => ({
        width: "150px",
        height: "200px",
        marginRight: "10px", 
        display: "inline-block",
    })
);


const CardInfo = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const Title = styled.div`
    margin: auto 5px;
    font-weight: bold;
    overflow: hidden;
`;

const SubTitle = styled.div`
    margin: auto 5px;
    color: #c2c2c2;
    font-size: 0.8rem;
`;

