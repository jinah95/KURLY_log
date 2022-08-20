import React from "react";
import styled from "styled-components";
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const CarouselCard = () => {

    return (
        <CardWrapper>
            <CardActionArea>
                <CardInfo>
                    <Title>
                        망원동 카페 - 티노마드
                    </Title>
                    <SubTitle>안녕하세요. 오랜만에 카페 업로드 글로 찾아왔습니다. 이번에 가본 카페는 망원동에 있는 티노마드라는 카페인데요.</SubTitle>
                </CardInfo>
            </CardActionArea>
            <CardMedia
                component="img"
                height="100"
                image="/background.jpg"
                alt="green iguana"
            />
        </CardWrapper>
    )
}

export default CarouselCard;

const CardWrapper = styled.div`
    width: 100%;
    height: 100%;
    margin: 10px auto;
    display: grid;
    grid-template-columns: 7fr 3fr;
`;

const CardInfo = styled.div`
    width: 100%;
    height: 100px;
    padding-right: 5px;
    display: flex;
    flex-direction: column;
`;

const Title = styled.div`
    margin-bottom: 5px;
    font-weight: bold;
    color: var(--purple);
`;

const SubTitle = styled.div`
    max-height: 35px;
    color: #aaaaaa;
    font-size: 0.8rem;
    overflow: hidden;
`;