import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import Image from "next/image";
import Profile from "../public/profile.png";
import CarouselCard from "./Cards/CarouselCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css"
import moment from "moment";
import { get } from "../api";

const KurlyLogPost = ({ reviewId }) => {
    const [postInfo, setPostInfo] = useState({})
    const [userInfo, setUserInfo] = useState({})
    const [otherPosts, setOtherPosts] = useState([])
    // 현재 로그인한 유저 알아와서 otherPosts에 들어가지 않게 해야함
    const [createdAt, setCreatedAt] = useState("");

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
            setCreatedAt(moment((res.data.data.created_at).substr(0, 10), "YYYY-MM-DD").format("YYYY-MM-DD"));
        } catch (err) {
            console.error("error message: ", err);
        }
    };

    const getOtherPosts = async (producId) => {
        try {
            const res = await get(`/logs/goods/${producId}?page=1&perPage=7`);
            setOtherPosts(res.data.data);
        } catch (err) {
            console.error("error message: ", err);
        }
    };

    useEffect(() => {
        getPostInfo();
    }, [reviewId]);

    return (
        <Wrapper>
            <Home>
                {userInfo.nickname}'s 컬리log
            </Home>
            <Contents>
                <h3>{postInfo.title}</h3>
                <div>{createdAt}</div>
                <Line />
                <Content>{postInfo.content}</Content>
                <Line />
                <LikeCount>{postInfo.likesCount} 💜</LikeCount>
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
                            .filter((post) => userInfo.user_id != post.user_id && reviewId != post.review_id)
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
    min-height: auto;
    background: white;
    margin-top: 10px;
    padding: 20px;
`;

const Content = styled.div`
    min-height: 300px;
    margin: 20px auto;
`;

const LikeCount = styled.div`
    color: gray;
    font-weight: bold;
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