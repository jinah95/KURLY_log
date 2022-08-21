import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import Image from "next/image";
import Profile from "../public/profile.png";
import CarouselCard from "./Cards/CarouselCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import { get } from "../api";

const KurlyLogPost = ({ user, prouct }) => {
    const [userInfo, setUserInfo] = useState({})

    // 테스트용
    const id = "e373a5b2-4918-43b2-bf85-7af10a41b4a3";

    const getUserInfo = async () => {
        try {
            const res = await get("/users/", id);
            setUserInfo(res.data.data);
            console.log(res.data)
        } catch (err) {
            console.error("error message: ", err);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true // 알아보기
    };

    return (
        <Wrapper>
            <Home>
                {userInfo.nickname}'s 컬리log
            </Home>
            <Contents>
                <Title></Title>
            </Contents>
            <ProductInfo>

            </ProductInfo>
            <UserInfo>
                <div>
                    <Image
                        src={Profile}
                        alt="profile"
                        width={40}
                        height={40}
                    />
                </div>
                <UserName>{userInfo.nickname}</UserName>
                <UserTitle>{userInfo.intro}</UserTitle>
                <Line />
            </UserInfo>
            <Others>
                또 다른 컬리log
                <Line />
                <CarouselView>
                    <Slider {...settings}>
                        <CarouselCard />
                        <CarouselCard />
                        <CarouselCard />
                    </Slider>
                </CarouselView>
            </Others>
        </Wrapper>
    );
};

export default KurlyLogPost;

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    background-color: #f2f2f2;
`;

const Home = styled.div`
    background: white;
    padding: 20px 0;
    text-align: center;
    font-weight: bold;
    color: var(--purple);
`;

const Contents = styled.div`
    height: 500px;  // 수정
    background: white;
    margin-top: 10px;
    padding: 20px;
`;

const Title = styled.div`
`;

const ProductInfo = styled.div`
    height: auto;
    background: white;
    margin-top: 10px;
    padding: 20px;
`;

const UserInfo = styled.div`
    background: white;
    margin-top: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const UserName = styled.div`
    font-weight: bold;
    color: var(--purple);
`;

const UserTitle = styled.div`
    font-size: 0.8rem;
`;

const Others = styled.div`
    height: auto;
    background: white;
    margin-top: 10px;
    padding: 20px;
`;

const Line = styled.div`
    width: 100%;
    background-color: #e2e2e2;
    height: 2px;
    margin: 10px auto;
`;

const CarouselView = styled(Slider)`
    width: 100%;
    height: 100%;

    .slick-list {
        margin: 0 auto;
        overflow-x: hidden;
    }
    
    .slick-dots {  //슬라이드의 위치
        bottom: -10px;
    }
`;