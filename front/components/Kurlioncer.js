import React, { useState, useEffect } from "react";
import styled from "styled-components";
import PersonCard from "./PersonCard";
import { getPost } from "../api";

const Kurlioncer = () => {
    const [personList, setPersonList] = useState([]);

    const getKurlioncer = async () => {
        try {
            const res = await getPost(`/users/best`);
            const newArr = res.data.data;
            setPersonList([...newArr]);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        getKurlioncer();
    }, []);

    return (
        <Wrapper>
            <BorderContainer>
                {personList.map((item, idx) => {
                    return (
                        <PersonCard
                            key={`Kurlioncer-${idx}`}
                            item={item}
                            index={idx}
                        />
                    );
                })}
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
