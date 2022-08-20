import React from "react";
import styled from "styled-components";

const KurlioncerReview = () => {
    return (
        <ReviewContainer>
            <ReviewTitle>
                <MyKurlyName>빵떡's 컬리log</MyKurlyName>
                <ProductName>
                    [크래프트하인즈] 슈레드 파마산치즈 리뷰
                </ProductName>
            </ReviewTitle>
            <ReviewInfo>
                <KurlyRanking>컬리언서 13위</KurlyRanking>
                <LikeCount>89 💜</LikeCount>
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
