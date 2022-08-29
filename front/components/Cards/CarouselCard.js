import React, { useState, useEffect } from "react";
import Link from "next/link";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";
import { get } from "../../api";

const CarouselCard = ({ post }) => {
    const [userInfo, setUserInfo] = useState({});

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
    }, [post]);

    return (
        <Link href={`/kurlylog/post/reviewInfo?reviewId=${post.review_id}`} passHref>
            <CardWrapper>
                <div>
                    <CardInfo>
                        <UserName>{userInfo.nickname}&apos;s 컬리log</UserName>
                        <Title>{post.title}</Title>
                        <SubTitle>{post.content}</SubTitle>
                    </CardInfo>
                </div>
                <CardMedia
                    component="img"
                    height="100"
                    image={post.image?.[0]}
                    alt="img"
                />
            </CardWrapper>
        </Link>
    );
};

export default CarouselCard;

const CardWrapper = materialStyled(CardActionArea)(() => ({
    width: "100%",
    height: "100%",
    margin: "10px 0",
    padding: "2px",
    display: "grid",
    gridTemplateColumns: "7fr 3fr",
}));

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
