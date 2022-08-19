import React from "react";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

const PreviewCard = () => {

    return (
        <BasicCard>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="150"
                    image="/background.jpg"
                    alt="green iguana"
                />
                <CardInfo>
                    <Title>
                        망원동 카페 - 티노마드
                    </Title>
                    <SubTitle>기타</SubTitle>
                </CardInfo>
            </CardActionArea>
        </BasicCard>
    )

}

export default PreviewCard;

const BasicCard = materialStyled(Card)(() => ({
    width: "150px",
    height: "200px",
    marginRight: "10px", 
}));

const CardInfo = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    margin: auto 5px;
`;

const Title = styled.div`
    higight: auto;
    font-size: 0.8rem;
    font-weight: bold;
`;

const SubTitle = styled.div`
    color: #c2c2c2;
    font-size: 0.6rem;
`;

