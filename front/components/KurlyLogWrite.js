import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Image from "next/image";
import plusStar from "../public/plusStar.png";
import styled from "styled-components";
import { styled as materialStyled } from '@mui/material/styles';
import { TextField, Typography } from "@mui/material";
import Button from '@mui/material/Button';
import { post } from "../api";

const Write = dynamic(() => import("./Write"), { ssr: false });

const KurlyLogWrite = ({ setWrite, userId, productId }) => {
    const viewContainerRef = useRef(null);
    const router = useRouter();
    const [preview, setPreview] = useState(false);
    const [htmlStr, setHtmlStr] = useState('');
    const [productInfo, setProductInfo] = useState({});
    const [kurlyLog, setKurlyLog] = useState({
        score: 0,
        good : "",
        bad : "",
        title : "",
        image : "",
        content : "",
    });

    const changeKurlyLog = (key, value) => {
        setKurlyLog((current) => {
            let newKurlyLog = { ...current };
            newKurlyLog[key] = value;
            return newKurlyLog;
        });
    };

    const getProductInfo = async () => {
        try {
            const res = await get("/goods/", productId);
            setProductInfo(res.data.data);
            // console.log(res.data)
        } catch (err) {
            console.error("error message: ", err);
        }
    };

    const uploadPost = () => {
        // 게시물 작성 한 것 업로드 구현
        changeKurlyLog("content", htmlStr);
        const postkurlyLog = async () => {
            try {
                // 입력한 내용이 없을 경우
                if (kurlyLog.title === "" || kurlyLog.content === "") {
                    return;
                } else {
                    const res = await post(`/logs/${productId}`, kurlyLog);
                    console.log(res.data)
                }
            } catch (err) {
                console.error("error message: ", err);
            }
        };

        // 글쓰기 완료
        // setWrite(false);

        // 포스트 보기 
        router.push(
            {
                pathname: `/kurlyLog/${productId}`,
                query: {
                    productId,
                },
            },
        );
    }

    useEffect(() => {
        getProductInfo();
        if (viewContainerRef.current) {
            viewContainerRef.current.innerHTML += htmlStr;
        }
    }, [htmlStr, preview])

    return (
        <Wrapper>
        {
            preview ? (
                <div>
                    {/* 제목 이미지 등 보이기 */}
                    <ViewContainer ref={viewContainerRef} />
                    <ButtonWrapper>
                        <ConfirmButton onClick={() => setPreview(false)}>
                            확인
                        </ConfirmButton>
                    </ButtonWrapper>
                </div>
            ) : (
                <div>
                    <WriteWrapper>
                        <Product>상품이름/사진 {productId}에 대해서..</Product>
                        <Line />
                        <ReviewWrapper>
                            <h3>상품은 만족하셨나요?</h3>
                            <div>
                                <Image
                                    src={plusStar}
                                    alt="plusStar"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <ReviewSummary>
                                <div>
                                    <Badge reviewType="good">👍</Badge>
                                    좋았어요
                                </div>
                                <Review
                                    placeholder="좋았던 점을 적어주세요!"
                                    value={kurlyLog.good}
                                    onChange={(e) => changeKurlyLog("good", e.target.value)}
                                />
                            </ReviewSummary>
                            <ReviewSummary>
                                <div>
                                    <Badge reviewType="bad">👎</Badge>
                                    별로에요
                                </div>
                                <Review
                                    placeholder="개선하면 좋을 점을 적어주세요!"
                                    value={kurlyLog.bad}
                                    onChange={(e) => changeKurlyLog("bad", e.target.value)}
                                />
                            </ReviewSummary>
                        </ReviewWrapper>
                        <Line />
                        <Title
                            placeholder="제목을 입력해주세요."
                            value={kurlyLog.title}
                            onChange={(e) => changeKurlyLog("title", e.target.value)}
                        />
                        <Write htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
                    </WriteWrapper>
                    <ButtonWrapper>
                        <PreviewButton onClick={() => setPreview(true)}>
                            미리보기
                        </PreviewButton>
                        <Buttons>
                            <ConfirmButton onClick={() => setWrite(false)}>
                                취소
                            </ConfirmButton>
                            <ConfirmButton onClick={uploadPost}>
                                완료
                            </ConfirmButton>
                        </Buttons>
                    </ButtonWrapper>
                </div>
            )
        }
        </Wrapper>
    )
}

export default KurlyLogWrite;

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    background-color: white;
`;

const ViewContainer = styled.div`
    border: 1px solid #e2e2e2;;
    margin: 10px;

    .ql-align-center {
        text-align: center;
    }

    .ql-syntax {
        background-color: #23241f;
        color: #f8f8f2;
        border-radius: 3px;
        padding: 5px;
        margin: 0 10px;
    }
`;

const WriteWrapper = styled.div`
    width: 100%;
    height: auto;
`;

const Product = styled.div`
    width: 100%;
    height: 70px;
`;

const ReviewWrapper = styled.div`
    height: 270px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
`;

const ReviewSummary = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-weigth: bold;
    color: #525252;
    text-align: center;
    margin: 5px auto;
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

const Review = materialStyled(TextField)(
    () => ({
        width: "70vw",
        '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: "none",
        }
    })
);

const Title = materialStyled(TextField)(
    () => ({
        width: "100%",
        '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: "none",
        }
    })
);

const ButtonWrapper = styled.div`
    width: 100%;
    height: 70px;
    background-color: #f2f2f2;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Buttons = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
`;

const PreviewButton = materialStyled(Button)(
    () => ({
        width: '140px',
        height: '40px',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '0.8rem',
        border: '0',
        borderRadius: '0',
        '&:hover': {
            border: '0',
        }
    })
);

const ConfirmButton = materialStyled(Button)(
    () => ({
        width: '70px',
        height: '40px',
        backgroundColor: 'black',
        color: 'white',
        fontSize: '0.8rem',
        border: '0',
        borderRadius: '25px',
        '&:hover': {
            backgroundColor: 'var(--purple)',
        }
    })
);

const Line = styled.div`
    width: 100%;
    background-color: #e2e2e2;
    height: 1px;
    margin: 10px auto;
`;