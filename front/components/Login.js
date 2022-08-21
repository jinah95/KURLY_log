import React, { useState } from "react";
import styled from "styled-components";
import Footer from "./Footer";

const Login = () => {
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");

    const LoginHandler = (e) => {
        e.preventDefault();
        console.log(id, pw);
        setId("");
        setPw("");
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
                            value={id}
                            onChange={(e) => setId(e.target.value)}
                        />
                    </Spacer>
                    <Spacer>
                        <LoginInput
                            type="password"
                            name="password"
                            placeholder="비밀번호"
                            required
                            id="pw"
                            value={pw}
                            onChange={(e) => setPw(e.target.value)}
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
