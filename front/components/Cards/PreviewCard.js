import React from "react";
import Link from "next/link";
import styled from "styled-components";
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import moment from "moment";

const PreviewCard = ({ post }) => {
    const created_at = moment((post.created_at).substr(0, 10), "YYYY-MM-DD").format("YYYY-MM-DD")

    return (
        <Link href={`/kurlylog/post/reviewInfo?reviewId=${post.review_id}`} passHref>
        <CardWrapper>
            <CardDate>{created_at}</CardDate>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="100"
                    image={post.image?.[0]}
                    alt="img"
                />
                <CardInfo>
                    <Title>{post.title}</Title>
                    <SubTitle>{post.content}</SubTitle> {/* 게시물 내용 가져오기 */}
                </CardInfo>
            </CardActionArea>
            <Line />
        </CardWrapper>
        </Link>
    )

}

export default PreviewCard;

const CardWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: 10px auto;
`;

const CardDate = styled.div`
    color: #aaaaaa;
    font-size: 0.8rem;
    margin-bottom: 5px;
`;

const CardInfo = styled.div`
    width: 100%;
    height: 75px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const Title = styled.div`
    font-weight: bold;
`;

const SubTitle = styled.div`
    max-height: 35px;
    color: #aaaaaa;
    font-size: 0.8rem;
    overflow: hidden;
`;

const Line = styled.div`
    width: 100%;
    background-color: #e2e2e2;
    height: 2px;
    margin: 10px auto;
`;