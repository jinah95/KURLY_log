import React from "react";
import styled from "styled-components";
import Image from "next/image";
import SSAPLogo from "../public/SSAP_team.png";

const Sample = () => {
    return (
        <Wrapper>
            <SampleWrapper>
                <Image src={SSAPLogo} alt="ssap_logo" width={120} height={50} />
                <Comment>"추후 제작 예정에 있습니다. 감사합니다."</Comment>
            </SampleWrapper>
        </Wrapper>
    );
};

export default Sample;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
    background-color: #e6e6e6;
`;

const SampleWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 20%;
`;

const Comment = styled.div`
    font-size: 15px;
    font-weight: bold;
    color: #5f0080;
    padding-top: 5%;
`;
