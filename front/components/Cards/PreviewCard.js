import React, { useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import moment from "moment";

// bad: "만두가 이렇게 커도 되나요"
// content: "만두는 역시 김치만두! 김치만두가 안느끼하고 맛있죠"
// created_at: "2022-08-21T08:15:48.165Z"
// good: "비비고 김치만두~"
// image: []
// product_id: 1001
// review_id: 2
// score: 5
// title: "만두에서 김치맛이.."
// user_id: "e373a5b2-4918-43b2-bf85-7af10a41b4a3"


const PreviewCard = ({ post }) => {
    const created_at = moment((post.created_at).substr(0, 10), "YYYY-MM-DD").format("YYYY-MM-DD")

    return (
        <Link href={`/kurlyLog/${post.product_id}`} passHref>
        <CardWrapper>
            <CardDate>{created_at}</CardDate>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="100"
                    image="/background.jpg"
                    alt="green iguana"
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