import React from "react";
import styled from "styled-components";
import KurlioncerReview from "./KurlioncerReview";

const KurlioncerReviews = () => {
    return (
        <>
            <Wrapper>
                <BorderContainer>
                    <KurlioncerReview />
                    <KurlioncerReview />
                    <KurlioncerReview />
                    <KurlioncerReview />
                    <KurlioncerReview />
                </BorderContainer>
            </Wrapper>
            <CreateSpacer></CreateSpacer>
        </>
    );
};

export default KurlioncerReviews;

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

const CreateSpacer = styled.div`
    height: 10%;
    width: 100%;
`;
