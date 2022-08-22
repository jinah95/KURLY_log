import React from "react";
import { useRouter } from "next/router";
import styled from "styled-components";

const KurlioncerReview = ({ item }) => {
    const router = useRouter();

    return (
        <ReviewContainer
            onClick={() =>
                router.push(`/kurlylog/${item.user_id}/${item.product_id}`)
            }
        >
            <ReviewTitle>
                <MyKurlyName>{item.user.nickname}'s 컬리log</MyKurlyName>
                <ProductName>
                    {item.product.detail} 👉{" "}
                    <BestTitle>" {item.title} "</BestTitle>
                </ProductName>
            </ReviewTitle>
            <ReviewInfo>
                <KurlyRanking> 컬리언서 🌟</KurlyRanking>
                <LikeCount>{item.likesCount} 💜</LikeCount>
            </ReviewInfo>
        </ReviewContainer>
    );
};

export default KurlioncerReview;

const ReviewContainer = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 7fr 3fr;
    padding: 15px;
    margin: 5px 0;
    background-color: rgb(244, 244, 244);
    &:hover {
        border: 1.5px solid #5f0080;
    }
    &:click {
        border: 1.5px solid #5f0080;
    }
`;

const ReviewTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const MyKurlyName = styled.div`
    font-weight: bold;
    color: #5f0080;
    font-size: 13px;
`;

const ProductName = styled.div`
    font-weight: 800;
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
`;

const ReviewInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
`;

const KurlyRanking = styled.div`
    font-size: 13px;
    color: gray;
    font-weight: 600;
`;

const LikeCount = styled.div`
    font-size: 13px;
    color: gray;
    font-weight: 600;
`;

const BestTitle = styled.div`
    font-size: 13px;
    color: gray;
`;
