import React, { useState, useEffect } from "react";
import Image from "next/image";
import Profile from "../public/profile.png";
import styled from "styled-components";
import { styled as materialStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import KurlyLogWrite from "./KurlyLogWrite";
import PreviewMiniCard from "./Cards/PreviewMiniCard";
import PreviewCard from "./Cards/PreviewCard";
import { get } from "../api";

const MyKurly = () => {
    const [write, setWrite] = useState(false);
    const [userInfo, setUserInfo] = useState({})

    // 유저 받아오기
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

    return (
        <Wrapper>
        {
            write ? (
                <KurlyLogWrite setWrite={setWrite} />
            ) : (
                <div>
                    <Header>
                        <LogInfo>
                            <span>오늘 15 전체 46</span>
                            <h1>{userInfo.nickname}'s 컬리log</h1>
                        </LogInfo>
                        <UserInfo>
                            <div>
                                <Image
                                    src={Profile}
                                    alt="profile"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            <UserProfile>
                                <div>{userInfo.nickname}</div>
                                <div>{userInfo.age}·{userInfo.family}  팔로워 {userInfo.followers}명</div>
                            </UserProfile>
                        </UserInfo>
                        <PostButton 
                            variant="outlined"
                            onClick={() => setWrite(true)}>
                                글쓰기
                        </PostButton>
                    </Header>
                    <Introduce>
                        <Title>소개</Title>
                        <div>{userInfo.intro}</div>
                    </Introduce>
                    <Popular>
                        <Title>인기글</Title>
                        <CardView>
                            <PreviewMiniCard />
                            <PreviewMiniCard />
                            <PreviewMiniCard />
                        </CardView>
                    </Popular>
                    <Contents>
                        <Title>전체글</Title>
                        <div>
                            <PreviewCard />
                            <PreviewCard />
                            <PreviewCard />
                        </div>
                    </Contents>
                </div>
            )
        }
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
    background: url("/background.jpg");
    background-size: cover;
    color: white;
    display: grid;
    grid-template-rows: 7fr 2fr 2fr;
    padding: 0 20px;
`;

const PostButton = materialStyled(Button)(
    () => ({
        width: '140px',
        height: '40px',
        backgroundColor: 'rgba(0,0,0,0)',
        color: 'white',
        fontSize: '0.8rem',
        border: '1px solid white',
        borderRadius: '0',
        '&:hover': {
            border: '1px solid white',
        }
    })
);

const LogInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: end;
`;

const UserInfo = styled.div`
    display: flex;
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
