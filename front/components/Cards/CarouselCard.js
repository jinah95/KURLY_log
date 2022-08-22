import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { get } from "../../api";

// bad: "단점 없음"
// content: "있을때 쟁여놨어요"
// created_at: "2022-08-21T10:41:57.251Z"
// good: "컬리 생크림빵~"
// image: []
// product_id: 1006
// review_id: 16
// score: 5
// title: "이거 사려고 대기탔어요"
// user_id: "e373a5b2-4918-43b2-bf85-7af10a41b4a3"

const CarouselCard = ({ post }) => {
    const [userInfo, setUserInfo] = useState({})

    const getUserInfo = async () => {
        try {
            const res = await get("/users/", post.user_id);
            setUserInfo(res.data.data);
        } catch (err) {
            console.error("error message: ", err);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, [])

    return (
        <Link href={`/kurlyLog/${post.product_id}`} passHref>
        <CardWrapper>
            <div>
                <CardInfo>
                    <UserName>{userInfo.nickname}'s 컬리log</UserName>
                    <Title>{post.title}</Title>
                    <SubTitle>{post.content}</SubTitle>
                </CardInfo>
            </div>
            <CardMedia
                component="img"
                height="100"
                image="/background.jpg"
                alt="green iguana"
            />
        </CardWrapper>
        </Link>
    )
}

export default CarouselCard;

const CardWrapper = materialStyled(CardActionArea)(
    () => ({
        width: "100%",
        height: "100%",
        margin: "10px 0",
        padding: "2px",
        display: "grid",
        gridTemplateColumns: "7fr 3fr",
    })
);

const CardInfo = styled.div`
    width: 100%;
    height: 100px;
    padding-right: 5px;
    display: flex;
    flex-direction: column;
`;

const UserName = styled.div`
    margin-bottom: 15px;
    font-weight: bold;
    color: var(--purple);
`;

const Title = styled.div`
    margin-bottom: 5px;
    color: #aaaaaa;
    font-weight: bold;
    font-size: 0.8rem;
`;

const SubTitle = styled.div`
    max-width: 60vw;
    max-height: 40px;
    color: #aaaaaa;
    font-size: 0.8rem;
    overflow: hidden;
`;