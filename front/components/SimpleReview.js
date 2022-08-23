import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import plusStar from "../public/plusStar.png";
import minusStar from "../public/minusStar.png";

const SimpleReview = () => {
    return (
        <Wrapper>
            <WriteReviewContainer>
                {" "}
                <Image
                    src={plusStar}
                    alt="minusStar"
                    id="1"
                    width={35}
                    height={35}
                />
                <input type="checkbox" name="1" value="1" />
                <ReviewSummary>
                    <Badge reviewType="good">👍</Badge>
                    <SummaryWrapper>
                        <Summary>
                            <input
                                type="text"
                                name="good"
                                placeholder="장점"
                                required
                                // onChange={(e) => setNickname(e.target.value)}
                            ></input>
                        </Summary>
                    </SummaryWrapper>
                </ReviewSummary>
                <ReviewSummary>
                    <Badge reviewType="bad">👎</Badge>
                    <SummaryWrapper>
                        <Summary>
                            <input
                                type="text"
                                name="bad"
                                placeholder="단점"
                                required
                                // onChange={(e) => setNickname(e.target.value)}
                            ></input>
                        </Summary>
                    </SummaryWrapper>
                </ReviewSummary>
                <button>완료</button>
                <button>취소</button>
            </WriteReviewContainer>
        </Wrapper>
    );
};

export default SimpleReview;

const Wrapper = styled.div`
    width: 100%;
    height: 80vh;
    position: relative;
    padding: 30px 30px;
`;

const WriteReviewContainer = styled.div`
    border: 1px solid #5f0080;
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;
const ReviewSummary = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: 8px;
`;

const Badge = styled.div`
    width: 45px;
    height: 40px;
    text-align: center;
    line-height: 38px;
    background-color: ${(props) =>
        props.reviewType === "good" ? "#5f0080" : "#fff"};
    border: ${(props) =>
        props.reviewType === "good" ? "" : "1.5px solid black"};
    border-radius: 50px;
    margin: 0 10px 0 15px;
`;

const SummaryWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 80px;
    width: 100%;
    margin: 5px 0;
`;

const Summary = styled.div`
    width: 100%;
    font-size: 14px;
    color: gray;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical
    -webkit-letter-spacing: normal;
    letter-spacing: normal;
    overflow-wrap: break-word;
`;
const ReviewContainer = styled.div`
    display: grid;
    grid-template-columns: 3fr 7fr;
`;
const ImgWrapper = styled.div`
    height: 100px;
    display: flex;
    justify-content: flex-end;
`;

const Img = styled.div`
    width: 50%;
    background: url("/best_main.jpg");
    background-size: cover;
    color: white;
    margin: 0 3px;
`;
