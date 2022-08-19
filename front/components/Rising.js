import React from "react";
import styled from "styled-components";

const Rising = () => {
    return (
        <Wrapper>
            <Header></Header>
            <BestKurlioncer>
                <KurlioncerPageMove>
                    <PageMoveWrapper>
                        <PageMoveFirst>
                            <PageMoveTitle>떠오르는 샛별 리뷰</PageMoveTitle>
                            <PageMoveSubTitle>
                                급변하는 리뷰 사회, 나도 컬리언서가 될 수 있다?
                            </PageMoveSubTitle>
                        </PageMoveFirst>
                    </PageMoveWrapper>
                </KurlioncerPageMove>
            </BestKurlioncer>
        </Wrapper>
    );
};

export default Rising;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
`;

const Header = styled.div`
    width: 100%;
    height: 40%;
    background: url("risingAD.jpg");
    background-size: cover;
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

const MoreButton = styled.span`
    font-size: 12px;
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
