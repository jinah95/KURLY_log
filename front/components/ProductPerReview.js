import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import BuyingFooter from "./BuyingFooter";
import Reviews from "./Reviews";
import plusStar from "../public/plusStar.png";
import minusStar from "../public/minusStar.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { getPost } from "../api";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

import { UserStateContext } from "../pages/_app";

const ProductPerReview = () => {
    const [open, setOpen] = useState(false);
    const [reviewInitial, setReviewInitial] = useState([]);
    const [totalPoint, setTotalPoint] = useState([]);
    const [productName, setProductName] = useState("");
    const router = useRouter();
    const productId = router.query?.item;

    const userState = useContext(UserStateContext);

    const isLogin = !!userState.user;

    const getProductName = async () => {
        try {
            const res = await getPost(`/goods/${productId}`);
            setProductName(res.data.data.detail);
        } catch (e) {
            console.error(e);
        }
    };

    const getInitialReview = async () => {
        try {
            const start = 1;
            const per = 5;
            const res = await getPost(
                `/logs/goods/${productId}?page=${start}&perPage=${per}`
            );

            if (res.data.message === "fail") {
                return;
            } else {
                const newArr = res.data.data.reviews;
                const newTotal = res.data.data.reviewInfo;
                setReviewInitial([...newArr]);
                setTotalPoint([...newTotal]);
            }
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getInitialReview();
        getProductName();
    }, []);

    return (
        <Wrapper>
            <ButtonWrapper>
                {" "}
                <ProductName>[ {productName} ]</ProductName>
                {isLogin ? (
                    <ReviewWriter onClick={() => setOpen((cur) => !cur)}>
                        후기 작성
                        {open && (
                            <Dialog open={open}>
                                <DialogTitle
                                    style={{
                                        color: "purple",
                                        fontWeight: "bold",
                                    }}
                                >
                                    후기 작성 방식을 선택해주세요.
                                </DialogTitle>
                                <DialogContent>
                                    <ModalButtonWrapper>
                                        <MovingButton type="kurly">
                                            <Link
                                                href={`/kurlylog/new/${productId}`}
                                                passHref
                                            >
                                                컬리log 후기 쓰러가기
                                            </Link>
                                        </MovingButton>

                                        <MovingButton
                                            type="simple"
                                            onClick={() =>
                                                router.push(
                                                    `/review/simple/${productId}`
                                                )
                                            }
                                        >
                                            단순 후기 쓰러가기
                                        </MovingButton>

                                        <CancleButton
                                            onClick={() => setOpen(true)}
                                        >
                                            취소
                                        </CancleButton>
                                    </ModalButtonWrapper>
                                </DialogContent>
                            </Dialog>
                        )}
                    </ReviewWriter>
                ) : (
                    <DisabledButton>
                        후기 쓰기는 로그인 후 이용 가능 합니다.
                    </DisabledButton>
                )}
                <ReviewWrapper>
                    <StarWrapper>
                        {totalPoint.length !== 0 ? (
                            <>
                                {" "}
                                {Array(Math.floor(totalPoint[0].avgscore))
                                    .fill(0)
                                    .map((item, idx) => (
                                        <Image
                                            key={`plus-${idx + 1}`}
                                            src={plusStar}
                                            alt="plusStar"
                                            width={35}
                                            height={35}
                                        />
                                    ))}
                                {Array(5 - Math.floor(totalPoint[0].avgscore))
                                    .fill(0)
                                    .map((item, idx) => (
                                        <Image
                                            key={`minus-${idx + 1}`}
                                            src={minusStar}
                                            alt="plusStar"
                                            width={35}
                                            height={35}
                                        />
                                    ))}
                            </>
                        ) : (
                            <>
                                {Array(5)
                                    .fill(0)
                                    .map((item, idx) => (
                                        <Image
                                            key={`minus-${idx + 1}`}
                                            src={minusStar}
                                            alt="minusStar"
                                            width={35}
                                            height={35}
                                        />
                                    ))}
                            </>
                        )}

                        {totalPoint.length !== 0 ? (
                            <AverageStarPoint>
                                {" "}
                                {totalPoint[0].avgscore}
                            </AverageStarPoint>
                        ) : (
                            ""
                        )}
                    </StarWrapper>

                    {totalPoint.length !== 0 ? (
                        <>
                            <ReviewTotal>
                                <ReviewTotalSpan>reviews</ReviewTotalSpan>
                                {totalPoint[0].countreviews}
                            </ReviewTotal>
                        </>
                    ) : (
                        <ReviewTotal>0</ReviewTotal>
                    )}
                    <AlertComment>
                        {`> 카드를 클릭하면 컬리로그로 이동합니다.`}
                    </AlertComment>
                </ReviewWrapper>
            </ButtonWrapper>
            {totalPoint.length !== 0 ? (
                <Reviews reviewInitial={reviewInitial} productId={productId} />
            ) : (
                <NoneReview>
                    현재 리뷰가 없습니다😃
                    <br /> 첫 작성자가 되어주세요!
                </NoneReview>
            )}

            <BuyingFooter />
        </Wrapper>
    );
};

export default ProductPerReview;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
`;

const ProductName = styled.div`
    font-size: 18px;
    font-weight: bold;
    text-align: center;
    height: 40px;
    line-height: 40px;
    margin-bottom: 10px;
`;
const ButtonWrapper = styled.div`
    padding: 10px 10px;
    width: 100%;
    height: 180px;
    position: fixed;
    z-index: 100;
    background-color: white;
`;

const ReviewWriter = styled.button`
    width: 100%;
    height: 50px;
    border: 1px solid rgb(95, 0, 128);
    color: rgb(95, 0, 128);
    font-size: 16px;
    font-weight: 600;
    background-color: #fff;
    cursor: pointer;
`;

const DisabledButton = styled.div`
    width: 100%;
    height: 50px;
    border: 1px solid rgb(95, 0, 128);
    color: rgb(95, 0, 128);
    font-size: 16px;
    font-weight: 600;
    background-color: #fff;
    cursor: pointer;
    line-height: 50px;
    text-align: center;
`;

const ReviewWrapper = styled.div`
    display: grid;
    grid-template-columns: 8fr 2fr;
    padding: 15px 10px;
`;

const StarWrapper = styled.div`
    display: flex;
    align-items: center;
    color: gray;
    font-weight: bold;
    font-size: 18px;
`;

const ReviewTotal = styled.div`
    font-size: 28px;
    color: purple;
    font-weight: 600;
    text-align: right;
`;

const ReviewTotalSpan = styled.span`
    font-size: 12px;
    color: #b3b3b3;
`;

const NoneReview = styled.div`
    padding-top: 200px;
    text-align: center;
    color: #5f0080;
    font-size: 18px;
    font-weight: 600;
`;

const MovingButton = styled.button`
    background-color: ${(props) =>
        props.type === "kurly" ? "#5f0080" : "#b3b3b3"};
    color: ${(props) => (props.type === "kurly" ? "#FFF" : "black")};
    border: none;
    font-size: 15px;
    font-weight: 600;
    width: 100%;
    height: 40px;
    margin-bottom: 10px;
    cursor: pointer;
`;

const ModalButtonWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;
const CancleButton = styled.button`
    margin-top: 5px;
    background: none;
    border: 1px solid gray;
    cursor: pointer;
`;

const AverageStarPoint = styled.div`
    padding-left: 10px;
`;

const AlertComment = styled.div`
    font-size: 12px;
    padding-top: 2px;
`;
