import React, { useState, useEffect, useContext } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { useRouter } from "next/router";
import Link from "next/link";
import styled from "styled-components";
import KurlyLogWrite from "./KurlyLogWrite";
import CarouselCard from "./Cards/CarouselCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import Modal from "./Modal";
import { get, post, deleteItem } from "../api";
import { UserStateContext } from "../pages/_app";

const KurlyLogPost = () => {
    const [write, setWrite] = useState(false);
    const [postInfo, setPostInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const [otherPosts, setOtherPosts] = useState([]);
    const [createdAt, setCreatedAt] = useState("");
    const [product, setProduct] = useState({});
    const [like, setLike] = useState(false);
    const router = useRouter();
    const reviewId = router.query?.reviewId;
    const userState = useContext(UserStateContext);
    const loginUser = userState.user?.userId;

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
    };

    const changeWrite = () => {
        setWrite((current) => !current);
    };

    const changeLikesCount = async () => {
        // console.log('like: ', like);
        // if (like) {
        //     const res = await deleteItem("/likes/", reviewId);
        //     console.log(res.data);
        // } else {
        //     const res = await post(`/likes/${reviewId}`);
        //     console.log(res.data);
        // }
        // setLike((current) => !current);
    };

    // reviewId로 해당 컬리log 조회
    const getPostInfo = async () => {
        try {
            const res = await get("/logs/log/", reviewId);
            setPostInfo(res.data.data);
            setUserInfo(res.data.data.user);
            getOtherPosts(res.data.data.product_id);
            getProductInfo(res.data.data.product_id);
            setCreatedAt(
                moment(
                    res.data.data.created_at.substr(0, 10),
                    "YYYY-MM-DD"
                ).format("YYYY-MM-DD")
            );
        } catch (err) {
            // console.error("error message: ", err);
        }
    };

    // 해당 상품 다른 사람의 컬리log 조회
    const getOtherPosts = async (producId) => {
        try {
            const res = await get(`/logs/goods/${producId}?page=1&perPage=7`);
            setOtherPosts(res.data.data.reviews);
        } catch (err) {
            // console.error("error message: ", err);
        }
    };

    // 해당 상품 조회
    const getProductInfo = async (producId) => {
        try {
            const res = await get("/goods/", producId);
            setProduct(res.data.data);
        } catch (err) {
            // console.error("error message: ", err);
        }
    };

    // 게시물 삭제
    const deletePost = async () => {
        try {
            const res = await deleteItem(`/logs/${reviewId}`);
            const userId = userInfo.user_id;
            router.push({
                pathname: "/kurlylog/userInfo",
                query: {
                    userId,
                },
            });
        } catch (err) {
            // console.error("error message: ", err);
        }
    };

    useEffect(() => {
        getPostInfo();
    }, [reviewId, write, like]);

    return write ? (
        <KurlyLogWrite changeWrite={changeWrite} postInfo={postInfo} />
    ) : (
        <Wrapper>
            <Home>{userInfo.nickname}&apos;s 컬리log</Home>
            <Contents>
                <h3>{postInfo.title}</h3>
                {createdAt} 
                {loginUser == userInfo.user_id && (
                    <EditContents>
                        {" "}|{" "}<span onClick={() => setWrite(true)}>수정하기</span>
                        {" "}|{" "}<span onClick={handleOpen}>삭제하기</span>
                    </EditContents>
                )}
                {open && (
                    <Modal
                        open={open}
                        handleClose={handleClose}
                        func={deletePost}
                    />
                )}
                <Line />
                <ImageWrapper>
                    <ImageCardWrapper>
                        {postInfo.image?.map((img, index) => (
                            <ImageCard
                                key={index}
                                src={img}
                                alt={`image-${index}`}
                                width={150}
                                height={150}
                                unoptimized={true}
                            />
                        ))}
                    </ImageCardWrapper>
                </ImageWrapper>
                <Content>{postInfo.content}</Content>
                <Line />
                <LikeCount onClick={changeLikesCount}>
                    {postInfo.likesCount} 💜
                </LikeCount>
            </Contents>
            <ProductInfo
                onClick={() => router.push(`/product/productInfo?productId=${postInfo.product_id}`)}
            >
                [{product.detail}] 사러가기
            </ProductInfo>
            <Link href={`/kurlylog/userInfo?userId=${userInfo.user_id}`} passHref>
                <UserInfo>
                    <UserImage>
                        {userInfo.picture && (
                            <Image
                                src={userInfo.picture}
                                alt="profile"
                                width={40}
                                height={40}
                                unoptimized={true}
                            />
                        )}
                    </UserImage>
                    <UserName>{userInfo.nickname}</UserName>
                    <UserTitle>{userInfo.intro}</UserTitle>
                </UserInfo>
            </Link>
            <Others>
                또 다른 컬리log
                <Line />
                <CarouselView>
                    <Slider {...settings}>
                        {otherPosts
                            ?.filter(
                                (post) =>
                                    userInfo.user_id != post.user_id &&
                                    reviewId != post.review_id
                            )
                            .map((post, index) => (
                                <CarouselCard key={index} post={post} />
                            ))}
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

const EditContents = styled.span`
    cursor: pointer;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
`;

const ImageCardWrapper = styled.div`
    width: 100%;
    height: 100%;
    white-space: nowrap;
    background-color: #f7f7f7;
    overflow-x: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const ImageCard = styled(Image)`
    margin-right: 10px;
    display: inline-block;
`;

const Content = styled.div`
    min-height: 150px;
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
    cursor: pointer;
`;

const UserInfo = styled.div`
    background: white;
    margin-top: 10px;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
`;

const UserImage = styled.div`
    width: 40px;
    height: 40px;
    border: 1px solid white;
    border-radius: 25px;
    overflow: hidden;
`;

const UserName = styled.div`
    font-weight: bold;
    color: var(--purple);
    margin: 5px auto;
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
    height: 1px;
    margin: 10px auto;
`;

const CarouselView = styled(Slider)`
    width: 100%;
    height: 100% .slick-list {
        margin: 0 auto;
        overflow-x: hidden;
    }

    .slick-dots {
        //슬라이드의 위치
        bottom: -10px;
    }
`;
