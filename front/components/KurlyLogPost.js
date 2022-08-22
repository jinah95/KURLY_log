import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import Image from "next/image";
import Profile from "../public/profile.png";
import CarouselCard from "./Cards/CarouselCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import { get } from "../api";


// data:
//     bad: "단점 없음"
//     content: "있을때 쟁여놨어요"
//     created_at: "2022-08-21T10:41:57.251Z"
//     good: "컬리 생크림빵~"
//     image: []
//     likesCount: "0"
//     product_id: 1006
//     review_id: 16
//     score: 5
//     title: "이거 사려고 대기탔어요"
//     user:
//         age: "40대"
//         family: "4인 가구"
//         grade: "컬리언서"
//         intro: "요리천재"
//         nickname: "컬리"
//         picture: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=986&q=80"
//         user_id: "e373a5b2-4918-43b2-bf85-7af10a41b4a3"
//     user_id: "e373a5b2-4918-43b2-bf85-7af10a41b4a3"

// user+productId에 대한 컬리log(게시글) 불러오기
const KurlyLogPost = ({ reviewId }) => {
    const [postInfo, setPostInfo] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [otherPosts, setOtherPosts] = useState([])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true
    };

    const getPostInfo = async () => {
        try {
            const res = await get("/logs/log/", reviewId);
            setPostInfo(res.data.data);
            setUserInfo(res.data.data.user);
            getOtherPosts(res.data.data.product_id);
            // console.log(res.data)
        } catch (err) {
            console.error("error message: ", err);
        }
    };

    const getOtherPosts = async (producId) => {
        try {
            const res = await get(`/logs/goods/${producId}?page=1&perPage=7`);
            setOtherPosts(res.data.data);
            console.log("OtherPosts: ", res.data.data);
        } catch (err) {
            console.error("error message: ", err);
        }
    };

    useEffect(() => {
        getPostInfo();
    }, []);

    return (
        <Wrapper>
            <Home>
                {userInfo.nickname}'s 컬리log
            </Home>
            <Contents>
                <Title>{postInfo.title}</Title>
                {postInfo.content}
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
                            .filter((post) => userInfo.user_id !== post.user_id)
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