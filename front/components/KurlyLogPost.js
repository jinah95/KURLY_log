import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import Image from "next/image";
import Profile from "../public/profile.png";
import CarouselCard from "./Cards/CarouselCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import { get } from "../api";

// user+productId에 대한 컬리log(게시글) 불러오기
const KurlyLogPost = ({ userId, prouctId }) => {
    const [userInfo, setUserInfo] = useState({})
    const [postInfo, setPostInfo] = useState({})
    const [otherPosts, setOtherPosts] = useState([])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    const getUserInfo = async () => {
        try {
            const res = await get("/users/", userId);
            setUserInfo(res.data.data);
            // console.log(res.data)
        } catch (err) {
            console.error("error message: ", err);
        }
    };

    // const getPostInfo = async () => {
    //     try {
    //         const res = await get("/logs/", userId);
    //         // getPost(`post/list?page=${page + 1}&perPage=${per}`);
    //         setUserInfo(res.data.data);
    //         // console.log(res.data)
    //     } catch (err) {
    //         console.error("error message: ", err);
    //     }
    // };

    const getOtherPosts = async () => {
        try {
            const res = await get("/logs/goods/", prouctId);
            setOtherPosts(res.data.data);
            // console.log(res.data.data)
        } catch (err) {
            console.error("error message: ", err);
        }
    };

    useEffect(() => {
        getUserInfo();
        getOtherPosts();
    }, []);

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
                <UserImage>
                    <Image
                        src={Profile}
                        alt="profile"
                        width={40}
                        height={40}
                    />
                </UserImage>
                <UserName>{userInfo.nickname}</UserName>
                <UserTitle>{userInfo.intro}</UserTitle>
                <Line />
            </UserInfo>
            <Others>
                또 다른 컬리log
                <Line />
                <CarouselView>
                    <Slider {...settings}>
                    {
                        otherPosts
                            .filter((post) => userId !== post.user_id)
                            .map((post, index) => (
                                <CarouselCard 
                                    key={index}
                                    post={post}
                                />
                            ))
                    }
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

const UserImage = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 25px;
    overflow: hidden;
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
    height: 100%

    .slick-list {
        margin: 0 auto;
        overflow-x: hidden;
    }
    
    .slick-dots {  //슬라이드의 위치
        bottom: -10px;
    }
`;