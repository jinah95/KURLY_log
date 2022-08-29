import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const PreviewMiniCard = ({ post }) => {

    return (
        <Link href={`/kurlylog/post/reviewInfo?reviewId=${post.review_id}`} passHref>
        <CardWrapper>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="150"
                    image={post.image?.[0]}
                    alt="img"
                />
                <CardInfo>
                    <Title>{post.title}</Title>
                    {/* <SubTitle>기타</SubTitle> */}
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
    margin: auto 10px;
    font-weight: bold;
    overflow: hidden;
`;

const SubTitle = styled.div`
    margin: auto 5px;
    color: #c2c2c2;
    font-size: 0.8rem;
`;

