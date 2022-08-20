import React from "react";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const PreviewMiniCard = () => {

    return (
        <CardWrapper>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="150"
                    image="/background.jpg"
                    alt="green iguana"
                />
                <CardInfo>
                    <Title>
                        망원동 카페 - 티노마드티노티노
                    </Title>
                    <SubTitle>기타</SubTitle>
                </CardInfo>
            </CardActionArea>
        </CardWrapper>
    )

}

export default PreviewMiniCard;

const CardWrapper = materialStyled(Card)(() => ({
    width: "150px",
    height: "200px",
    marginRight: "10px", 
    display: "inline-block",
}));

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

