import React from "react";
import styled from "styled-components";
import PersonCard from "./PersonCard";

const Kurlioncer = () => {
    return (
        <Wrapper>
            <BorderContainer>
                <PersonCard />
                <PersonCard />
                <PersonCard />
            </BorderContainer>
        </Wrapper>
    );
};

export default Kurlioncer;

const Wrapper = styled.div`
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BorderContainer = styled.div`
    width: 100%;
    height: auto;
`;
