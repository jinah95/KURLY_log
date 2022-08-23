import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import plusStar from "../public/plusStar.png";
import minusStar from "../public/minusStar.png";
import { styled as materialStyled } from "@mui/material/styles";
import { TextField } from "@mui/material";
import { post } from "../api";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const SimpleReview = () => {
    const [score, setScore] = useState("1");
    const [good, setGood] = useState("");
    const [bad, setBad] = useState("");

    const router = useRouter();
    const productId = router.query?.item;

    const uploadPost = async () => {
        if (good === "" || bad === "") {
            return;
        }

        const newPost = {
            score: score,
            good: good,
            bad: bad,
        };

        try {
            const res = await post(`/logs/${productId}`, {
                score: score,
                good: good,
                bad: bad,
            });
            // console.log(res.data.data);
            router.push(`/review/${productId}`);
        } catch (err) {
            console.error("error message: ", err);
        }
    };

    const handleChange = (e) => {
        setScore(e.target.value);
    };

    return (
        <Wrapper>
            <WriteReviewContainer>
                {" "}
                <Line />
                <ReviewWrapper>
                    <h3>상품은 만족하셨나요?</h3>
                    <StarWrapper>
                        <div>
                            <Image
                                src={plusStar}
                                alt="plusStar"
                                width={30}
                                height={30}
                            />
                        </div>
                        <div>
                            <Points sx={{ m: 1, minWidth: 80 }}>
                                <InputLabel
                                    id="demo-simple-select-autowidth-label"
                                    style={{ color: "#5f0080" }}
                                >
                                    point
                                </InputLabel>
                                <Select
                                    labelId="demo-simple-select-autowidth-label"
                                    id="demo-simple-select-autowidth"
                                    value={score}
                                    onChange={(e) => handleChange(e)}
                                    autoWidth
                                    label="point"
                                    required
                                >
                                    <MenuItem value="1">1</MenuItem>
                                    <MenuItem value="2">2</MenuItem>
                                    <MenuItem value="3">3</MenuItem>
                                    <MenuItem value="4">4</MenuItem>
                                    <MenuItem value="5">5</MenuItem>
                                </Select>
                            </Points>
                        </div>
                    </StarWrapper>
                    <ReviewSummary>
                        <div>
                            <Badge reviewType="good">👍</Badge>
                            좋았어요
                        </div>
                        <Review
                            placeholder="좋았던 점을 적어주세요!"
                            value={good}
                            onChange={(e) => {
                                setGood(e.target.value);
                            }}
                        />
                    </ReviewSummary>
                    <ReviewSummary>
                        <div>
                            <Badge reviewType="bad">👎</Badge>
                            별로에요
                        </div>
                        <Review
                            placeholder="개선하면 좋을 점을 적어주세요!"
                            value={bad}
                            onChange={(e) => setBad(e.target.value)}
                        />
                    </ReviewSummary>
                </ReviewWrapper>
                <Line />
                <ConfirmWrapper>
                    <ConfirmButton color="black" onClick={() => uploadPost()}>
                        완료
                    </ConfirmButton>
                    <ConfirmButton
                        color="red"
                        onClick={() => router.push(`/review/${productId}`)}
                    >
                        취소
                    </ConfirmButton>
                </ConfirmWrapper>
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

const ReviewWrapper = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: 10px;
`;

const WriteContent = styled.div`
    width: 90%;
    height: 500px;
    margin: 30px auto;
`;

const Review = materialStyled(TextField)(() => ({
    width: "70vw",
    ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #5f0080",
    },
}));

const Points = materialStyled(FormControl)(() => ({
    width: "100%",
    border: "none",
    color: "#5f0080",
    ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #5f0080",
    },
}));

const StarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const ConfirmWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Line = styled.div`
    width: 80%;
    background-color: #e2e2e2;
    height: 1px;
    margin: 10px auto;
`;

const ConfirmButton = styled.button`
    border: none;
    margin: 0 10px;
    width: 60px;
    height: 40px;
    border-radius: 5px;
    color: ${(props) => props.color};
    font-weight: bold;
    font-size: 15px;
`;
