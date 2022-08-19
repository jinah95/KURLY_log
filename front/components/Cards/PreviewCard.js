import React from "react";
import styled from "styled-components";
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const PreviewCard = () => {

    return (
        <CardWrapper>
            <CardDate>2022. 8. 17.</CardDate>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="100"
                    image="/background.jpg"
                    alt="green iguana"
                />
                <CardInfo>
                    <Title>
                        망원동 카페 - 티노마드
                    </Title>
                    <SubTitle>안녕하세요. 오랜만에 카페 업로드 글로 찾아왔습니다. 이번에 가본 카페는 망원동에 있는 티노마드라는 카페인데요.</SubTitle>
                </CardInfo>
            </CardActionArea>
            <Line />
        </CardWrapper>
    )

}

export default PreviewCard;

const CardWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: 10px 5px;
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