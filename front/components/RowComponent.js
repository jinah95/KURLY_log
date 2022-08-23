import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import styled from "styled-components";
import plusStar from "../public/plusStar.png";

const Loader = ({ style }) => (
    <div style={style} className="list-group-loader">
        <FinalWrapper className="loader">
            컨텐츠가 더이상 없습니다.
            <div onClick={() => window.scrollTo(0, 0)}>👆click!👆</div>
        </FinalWrapper>
    </div>
);

const Item = ({ items, style, router }) => (
    <CardWrapper style={{ ...style, width: "99.89%" }}>
        <TitleWrapper>
            <KurlyLogTitle>{items.nickname}&apos;s 컬리log</KurlyLogTitle>
            <KurlyClass>샛별</KurlyClass>
        </TitleWrapper>
        <ProductTitle>{items.detail}</ProductTitle>
        <ContentsWrapper>
            <div className="avatar">
                <Image
                    src={items.image[0] ? items.image[0] : plusStar}
                    alt="product"
                    width={100}
                    height={100}
                />
            </div>
            <ReviewContainer>
                <ReviewTitleP>{items.title}</ReviewTitleP>
                <ReviewsContents>&quot; {items.content} &quot;</ReviewsContents>
            </ReviewContainer>
        </ContentsWrapper>

        <EtcWrapper>
            <ArrowWrapper
                onClick={() => router.push(`/kurlylog/post/${items.review_id}`)}
            >
                <span>{`> 더보기`}</span>
            </ArrowWrapper>
            <LikesWrapper>{items.countlikes}💜</LikesWrapper>
        </EtcWrapper>
    </CardWrapper>
);

const RowComponent = ({ style, loading, items }) => {
    const router = useRouter();

    return loading ? (
        <Loader style={style} />
    ) : (
        <Item items={items} style={style} router={router} />
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

const ReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ReviewTitleP = styled.div`
    padding: 5px 15px;
    font-weight: bold;
    letter-spacing: normal;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: keep-all;
`;

const FinalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #5f0080;
    margin-top: 50px;
`;
