import React from "react";
import styled from "styled-components";

const KurlyLog = () => {
    return (
        <Wrapper>
            <BestKurlioncer>
                <KurlioncerPageMove>
                    <PageMoveWrapper>
                        <PageMoveFirst>
                            <PageMoveTitle>주간 BEST 컬리언서</PageMoveTitle>
                            <MoreButton> + 상위30위 보기</MoreButton>
                            <PageMoveSubTitle>
                                인기있는 컬리언서는 ?
                            </PageMoveSubTitle>
                        </PageMoveFirst>
                    </PageMoveWrapper>
                </KurlioncerPageMove>
            </BestKurlioncer>
            <BestKurlioncer>
                <KurlioncerPageMove>
                    <PageMoveWrapper>
                        <PageMoveFirst>
                            <PageMoveTitle>주간 BEST 리뷰</PageMoveTitle>
                            <MoreButton> + 더보기</MoreButton>
                            <PageMoveSubTitle>
                                컬리언서가 쓴 재미난 리뷰!
                            </PageMoveSubTitle>
                        </PageMoveFirst>
                    </PageMoveWrapper>
                </KurlioncerPageMove>
            </BestKurlioncer>
        </Wrapper>
    );
};

export default KurlyLog;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
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
