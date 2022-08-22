import React, { useState, useEffect } from "react";
import styled from "styled-components";
import KurlioncerReview from "./KurlioncerReview";
import { getPost } from "../api";

const KurlioncerReviews = () => {
    const [kurlyReviews, setKurlyReviews] = useState([]);

    const getKurlioncerReview = async () => {
        try {
            const res = await getPost(`/logs`);
            const newArr = res.data.data;
            setKurlyReviews([...newArr]);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getKurlioncerReview();
    }, []);
    return (
        <>
            <Wrapper>
                <BorderContainer>
                    {kurlyReviews.map((item, idx) => {
                        return (
                            <KurlioncerReview
                                key={`kurlybestreview-${idx}`}
                                item={item}
                            />
                        );
                    })}
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
