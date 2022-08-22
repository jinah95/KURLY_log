import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import BuyingFooter from "./BuyingFooter";
import Reviews from "./Reviews";
import plusStar from "../public/plusStar.png";
import minusStar from "../public/minusStar.png";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const ProductPerReview = () => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Wrapper>
            <ButtonWrapper>
                {" "}
                <ReviewWriter onClick={handleOpen}>후기 작성</ReviewWriter>
                <Modal hideBackdrop open={open} onClose={handleClose}>
                    <div
                        style={{
                            top: "50%",
                            left: "50%",
                            width: "80%",
                            height: "50px",
                            zIndex: "10000",
                            backgroundColor: "white",
                        }}
                    >
                        어떤 후기를 작성하시겠습니까?
                    </div>
                </Modal>
                <ReviewWrapper>
                    <StarWrapper>
                        <Image
                            src={plusStar}
                            alt="plusStar"
                            width={35}
                            height={35}
                        />
                        <Image
                            src={plusStar}
                            alt="plusStar"
                            width={35}
                            height={35}
                        />
                        <Image
                            src={plusStar}
                            alt="plusStar"
                            width={35}
                            height={35}
                        />
                        <Image
                            src={minusStar}
                            alt="plusStar"
                            width={35}
                            height={35}
                        />
                        <Image
                            src={minusStar}
                            alt="plusStar"
                            width={35}
                            height={35}
                        />
                    </StarWrapper>
                    <ReviewTotal>1,766</ReviewTotal>
                </ReviewWrapper>
            </ButtonWrapper>
            <Reviews />

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

const ButtonWrapper = styled.div`
    padding: 20px 10px;
    width: 100%;
    height: 150px;
    position: fixed;
    z-index: 100000;
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

const ReviewWrapper = styled.div`
    display: grid;
    grid-template-columns: 8fr 2fr;
    padding: 15px 2px;
`;

const StarWrapper = styled.div`
    display: flex;
    align-items: center;
`;

const ReviewTotal = styled.div`
    font-size: 28px;
    color: purple;
    font-weight: 600;
    text-align: right;
`;
