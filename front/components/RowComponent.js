import React from "react";
import Image from "next/image";
import styled from "styled-components";
import plusStar from "../public/plusStar.png";

const Loader = ({ style }) => (
    <div style={style} className="list-group-loader">
        <div className="loader">컨텐츠가 더이상 없습니다.</div>
    </div>
);

const Item = ({ image, num, style, loading }) => (
    <CardWrapper style={{ ...style, width: "99.89%" }}>
        <TitleWrapper>
            <KurlyLogTitle>행복한미어캣's 컬리log</KurlyLogTitle>
            <KurlyClass>샛별</KurlyClass>
        </TitleWrapper>
        <ProductTitle>{`[비비고] 교자 왕만두 500g`}</ProductTitle>
        <ContentsWrapper>
            <div className="avatar">
                <Image src={plusStar} alt="product" width={80} height={90} />
            </div>
            <ReviewsContents>
                안녕하세요 행복한미어캣 입니다. 비비고 왕교자를 활용한 다양한
                레시피 공유드립니다. 먼저 첫번째......
            </ReviewsContents>
        </ContentsWrapper>

        <EtcWrapper>
            <ArrowWrapper>
                <span>{`> 더보기`}</span>
            </ArrowWrapper>
            <LikesWrapper>💜</LikesWrapper>
        </EtcWrapper>
    </CardWrapper>
);

const RowComponent = ({ image, num, style, loading }) => {
    return loading ? (
        <Loader style={style} />
    ) : (
        <Item image={image} num={num} style={style} loading={loading} />
    );
};

export default RowComponent;

const CardWrapper = styled.div`
    height: 100%;
    padding: 13px;
    border: 1.5px dashed #b3b3b3;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const TitleWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const KurlyLogTitle = styled.span`
    font-size: 13px;
    color: rgb(95, 0, 128);
    font-weight: 600;
    letter-spacing: normal;
    line-height: 1.29;
`;

const KurlyClass = styled.span`
    font-size: 12px;
    font-weight: 500;
    color: rgb(51, 51, 51);
    letter-spacing: normal;
    line-height: 1.29;
`;

const ProductTitle = styled.span`
    font-size: 15px;
    font-weight: 700;
    letter-spacing: normal;
    line-height: 1.29;
`;

const ContentsWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: 3fr 7fr;
    padding: 5px 0;
`;

const ReviewsContents = styled.div`
    font-size: 12px;
    font-weight: 400;
    color: rgb(51, 51, 51);
    letter-spacing: normal;
    display: flex;
    align-items: center;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: keep-all;
    padding: 0 10px;
`;

const EtcWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const ArrowWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    font-weight: 800;
    font-size: 13px;
    color: rgb(95, 0, 128);
`;

const LikesWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
