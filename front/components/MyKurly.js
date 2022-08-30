import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import { styled as materialStyled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import PreviewMiniCard from "./Cards/PreviewMiniCard";
import PreviewCard from "./Cards/PreviewCard";
import { get, getPost, post, deleteItem } from "../api";
import { UserStateContext } from "../pages/_app";

const MyKurly = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [bestPosts, setBestPosts] = useState([]);
    const [possibleFollow, setPossibleFollow] = useState(false);
    const router = useRouter();
    const userId = router.query?.userId;
    const userState = useContext(UserStateContext);
    const isLogin = !!userState.user;
    const loginUser = userState.user?.userId;

    // 유저 조회
    const getUserInfo = async () => {
        try {
            const res = await get("/users/", userId);
            setUser(res.data.data);
        } catch (err) {
            // console.error("error message: ", err);
        }
    };

    // 유저의 컬리로그 인기글
    const getBestPosts = async () => {
        const res = await getPost(`/logs/user/${userId}?page=1&perPage=5`);
        setBestPosts(res.data.data);
    };

    // 유저의 컬리로그 전체글
    const getPosts = async () => {
        const res = await getPost(`/logs/user/${userId}?page=1&perPage=5`);
        setPosts(res.data.data);
    };

    // 팔로우 가능 여부 확인
    const canFollow = async () => {
        if (loginUser !== userId) {
            const res = await get(`/follows/${userId}`);
            setPossibleFollow(res.data.data);
        }
    };

    // 팔로우
    const makeFollow = async () => {
        if (loginUser !== userId) {
            const res = await post(`/follows/${userId}`);
            setPossibleFollow(true);
        }
    };

    // 언팔로우
    const unFollow = async () => {
        if (loginUser !== userId) {
            const res = await deleteItem(`/follows/${userId}`);
            setPossibleFollow(false);
        }
    };

    useEffect(() => {
        getUserInfo();
        getBestPosts();
        getPosts();
        canFollow();
    }, [userId]);

    useEffect(() => {
        getUserInfo();
        canFollow();
    }, [possibleFollow]);

    return (
        <Wrapper>
            <div>
                <Header>
                    <LogInfo>
                        <h1>{user.nickname}&apos;s 컬리log</h1>
                    </LogInfo>
                    <UserInfo>
                        <UserImage>
                            {user?.picture && (
                                <Image
                                    src={user?.picture}
                                    alt="profile"
                                    width={40}
                                    height={40}
                                    unoptimized={true}
                                />
                            )}
                        </UserImage>
                        <UserProfile>
                            <div>{user.nickname}</div>
                            <div>
                                {user.age}·{user.family} | 팔로워{" "}
                                {user.followers}명
                            </div>
                        </UserProfile>
                    </UserInfo>
                    <div>
                        {loginUser !== userId &&
                            (!possibleFollow ? (
                                isLogin ? (
                                    <FollowButton onClick={makeFollow}>
                                        Follow
                                    </FollowButton>
                                ) : (
                                    <FollowButton>로그인필요</FollowButton>
                                )
                            ) : isLogin ? (
                                <FollowButton type="cancel" onClick={unFollow}>
                                    Unfollow
                                </FollowButton>
                            ) : (
                                <FollowButton>로그인필요</FollowButton>
                            ))}
                    </div>
                </Header>
                <Introduce>
                    <Title>소개</Title>
                    <div>{user.intro}</div>
                </Introduce>
                <Popular>
                    <Title>인기글</Title>
                    <CardView>
                        {bestPosts?.map((post, index) => (
                            <PreviewMiniCard key={index} post={post} />
                        ))}
                    </CardView>
                </Popular>
                <Contents>
                    <Title>전체글</Title>
                    {posts?.map((post, index) => (
                        <PreviewCard key={index} post={post} />
                    ))}
                </Contents>
            </div>
        </Wrapper>
    );
};

export default MyKurly;

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    position: relative;
    background-color: #f2f2f2;
`;

const Header = styled.div`
    width: 100%;
    height: 50vh;
    background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
        url("/background.jpg");
    background-size: cover;
    color: white;
    display: grid;
    grid-template-rows: 6fr 2fr 2fr;
    padding: 0 20px;
`;

const FollowButton = materialStyled(Button)((props) => ({
    width: "140px",
    height: "40px",
    backgroundColor: "rgba(0,0,0,0)",
    color: `${props.type === "cancel" ? "gray" : "white"}`,
    fontSize: "0.8rem",
    border: "1px solid white",
    borderRadius: "0",
    "&:hover": {
        border: "1px solid white",
    },
}));

const LogInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
`;

const UserInfo = styled.div`
    display: flex;
`;

const UserImage = styled.div`
    width: 40px;
    height: 40px;
    border: 2px solid white;
    border-radius: 25px;
    overflow: hidden;
`;

const UserProfile = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`;

const Introduce = styled.div`
    height: 150px;
    background: white;
    margin-top: 10px;
    padding: 20px;
`;

const Popular = styled.div`
    height: auto;
    background: white;
    margin-top: 10px;
    padding: 20px;
`;

const Contents = styled.div`
    height: auto;
    background: white;
    margin-top: 10px;
    padding: 20px;
`;

const Title = styled.div`
    font-weight: bold;
    margin-bottom: 10px;
`;

const CardView = styled.div`
    width: 100%;
    margin-bottom: 1px;
    white-space: nowrap;
    overflow-x: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`;
