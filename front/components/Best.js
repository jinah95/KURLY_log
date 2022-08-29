import React, { useState, useEffect } from "react";
import styled from "styled-components";
import BestProduct from "./BestProduct";
import Footer from "./Footer";
import { getPost } from "../api";

const Best = () => {
    const [productList, setProductList] = useState([]);

    const getProduct = async () => {
        try {
            const res = await getPost("/goods");
            const newArr = res.data.data;
            setProductList([...newArr]);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {
        getProduct();
    }, []);

    return (
        <Wrapper>
            {" "}
            <Header></Header>
            <BestKurlioncer>
                <KurlioncerPageMove>
                    <PageMoveWrapper>
                        <PageMoveFirst>
                            <PageMoveTitle>BEST Review Item</PageMoveTitle>
                            <PageMoveSubTitle>
                                컬리언서가 선택한 인기 상품!
                            </PageMoveSubTitle>
                        </PageMoveFirst>
                    </PageMoveWrapper>
                </KurlioncerPageMove>
            </BestKurlioncer>
            <CardView>
                {productList.map((item, idx) => {
                    return (
                        <BestProduct
                            key={`product-${idx}`}
                            item={item}
                            index={idx}
                        />
                    );
                })}
            </CardView>
            <BestKurlioncer>
                <KurlioncerPageMove>
                    <PageMoveWrapper>
                        <PageMoveFirst>
                            <PageMoveTitle>🌟 샛별 상승 Item</PageMoveTitle>
                            <PageMoveSubTitle>
                                혜성처럼 등장한 인기 급 상승템!
                            </PageMoveSubTitle>
                        </PageMoveFirst>
                    </PageMoveWrapper>
                </KurlioncerPageMove>
            </BestKurlioncer>
            <CardView>
                {productList.map((item, idx) => {
                    return (
                        <BestProduct
                            key={`product-${idx}`}
                            item={item}
                            index={idx}
                            type="other"
                        />
                    );
                })}
            </CardView>
            <CreateSpacer />
            <Footer />
        </Wrapper>
    );
};

export default Best;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
`;

const Header = styled.div`
    width: 100%;
    height: 45%;
    background: url("/best_main.jpg");
    background-size: cover;
    background-position: center center;
    color: white;
    display: grid;
    grid-template-rows: 8fr 2fr;
    padding: 0 20px;
`;

const BestKurlioncer = styled.div`
    margin: 16px 0px;
`;

const KurlioncerPageMove = styled.a`
    padding: 16px;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
`;

const PageMoveWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

const PageMoveFirst = styled.div``;

const PageMoveTitle = styled.span`
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: calc(100% - 70px);
    color: rgb(51, 51, 51);
    font-size: 18px;
    line-height: normal;
    font-weight: 600;
    letter-spacing: 0.2px;
`;

const PageMoveSubTitle = styled.span`
    display: block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 14px;
    color: rgb(153, 153, 153);
    font-weight: 400;
    letter-spacing: normal;
    line-height: 1.29;
    margin-top: 4px;
`;

const CardView = styled.div`
    width: 100%;
    margin-bottom: 1px;
    padding: 0 8px;
    white-space: nowrap;
    overflow-x: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const CreateSpacer = styled.div`
    height: 10%;
    width: 100%;
`;
