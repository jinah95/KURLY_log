import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import Footer from "./Footer";
import { DispatchContext } from "../pages/_app";
import { post } from "../api";

const Login = () => {
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useContext(DispatchContext);
    const router = useRouter();
    const { returnUrl } = router.query;

    const LoginHandler = async (e) => {
        e.preventDefault();
        try {
            // "auth/login" 엔드포인트로 post요청함.
            const res = await post("/login", {
                nickname,
                password,
            });
            // 유저 정보는 response의 data임.
            const user = res.data.data;

            // JWT 토큰은 유저 정보의 token임.
            const jwtToken = user.token;
            // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
            sessionStorage.setItem("userToken", jwtToken);
            // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
            dispatch({
                type: "LOGIN_SUCCESS",
                payload: user,
            });

            if (returnUrl !== "mykurly") {
                router.push(returnUrl);
            } else {
                router.push(`/kurlyLog/${user.userId}`);
            }
            setNickname("");
            setPassword("");
        } catch (err) {
            console.error("로그인에 실패하였습니다", err);
            setNickname("");
            setPassword("");
        }
    };

    return (
        <Wrapper>
            <LoginWrapper>
                <Title>로 그 인</Title>
                <form onSubmit={(e) => LoginHandler(e)}>
                    <Spacer>
                        <LoginInput
                            type="text"
                            name="username"
                            placeholder="아이디"
                            required
                            value={nickname}
                            onChange={(e) => setNickname(e.target.value)}
                        />
                    </Spacer>
                    <Spacer>
                        <LoginInput
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            required
                            id="pw"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Spacer>
                    <Spacer>
                        <SubmitButton type="submit" value="로그인하기" />
                    </Spacer>
                </form>
            </LoginWrapper>
            <Footer />
        </Wrapper>
    );
};

export default Login;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
`;

const Title = styled.div`
    font-weight: bold;
    font-size: 20px;
    color: #5f0080;
`;
const LoginWrapper = styled.div`
    width: 100%;
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LoginInput = styled.input`
    width: 60vw;
    height: 5vh;
    border: 2px solid #5f0080;
    font-size: 15px;
`;

const SubmitButton = styled.input`
    border: 2px solid #5f0080;
    background-color: #5f0080;
    width: 30vw;
    height: 5vh;
    color: white;
    font-weight: bold;
    font-size: 15px;
`;

const Spacer = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
`;
