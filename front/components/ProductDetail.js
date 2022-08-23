import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import BuyingFooter from "./BuyingFooter";
import { getPost } from "../api";

const ProductDetail = () => {
    const [itemDetail, setItemDetail] = useState({});
    const [imgUrl, setImageUrl] = useState("");
    const router = useRouter();
    const productId = router.query?.item;

    const getProductDetail = async () => {
        try {
            const res = await getPost(`/goods/${productId}`);
            setItemDetail(res.data.data);
            setImageUrl(res.data.data.image[0]);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getProductDetail();
    }, []);

    return (
        <Wrapper>
            <Header url={imgUrl}></Header>
            <ProductContents>
                <TitleWrapper>
                    <DeliveryType>샛별 배송</DeliveryType>
                    <ProductTitle>{itemDetail.detail}</ProductTitle>
                    <SubDetails>지금 만나 볼 수 있는 이 가격!</SubDetails>
                    <PriceWrapper>
                        <NumPrice>
                            {!!itemDetail.price ? itemDetail.price : "27,500"}
                        </NumPrice>
                        <WonPrice>원</WonPrice>
                    </PriceWrapper>
                    <LoginNote>
                        로그인 후 구매와 후기 쓰기가 가능합니다.
                    </LoginNote>
                </TitleWrapper>
            </ProductContents>
            <BuyingFooter />
        </Wrapper>
    );
};

export default ProductDetail;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
`;

const Header = styled.div`
    width: 100%;
    height: 60%;
    background: url(${(props) => props.url});
    background-size: cover;
    background-position: center center;
    color: white;
    display: grid;
    grid-template-rows: 8fr 2fr;
    padding: 0 20px;
`;

const ProductContents = styled.div`
    padding: 24px 16px;
`;

const TitleWrapper = styled.div`
    margin-bottom: 12px;
`;

const DeliveryType = styled.div`
    font-size: 13px;
    font-weight: 600;
    line-height: 1.38;
    letter-spacing: -0.5px;
    color: rgb(153, 153, 153);
    margin-bottom: 6px;
`;

const ProductTitle = styled.div`
    font-size: 18px;
    font-weight: 600;
    line-height: 23px;
    color: rgb(51, 51, 51);
    padding-right: 76px;
`;

const SubDetails = styled.div`
    padding: 3px 60px 0px 0px;
    font-size: 14px;
    font-weight: 500;
    line-height: 19px;
    color: rgb(153, 153, 153);
`;

const PriceWrapper = styled.div`
    margin-bottom: 4px;
`;

const NumPrice = styled.span`
    font-weight: bold;
    font-size: 24px;
    color: rgb(51, 51, 51);
    line-height: 1.25;
    letter-spacing: -0.5px;
    margin-right: 3px;
    padding-left: 2px;
`;

const WonPrice = styled.span`
    font-weight: bold;
    font-size: 16px;
    color: rgb(51, 51, 51);
    line-height: 1.31;
`;

const LoginNote = styled.div`
    color: rgb(95, 0, 128);
    line-height: 19px;
    margin-top: 14px;
    font-size: 14px;
`;
