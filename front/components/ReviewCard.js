import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import styled from "styled-components";
import plusStar from "../public/plusStar.png";

const Loader = ({ style }) => (
    <div style={{ ...style, height: "150px" }}>
        <FinalWrapper className="loader">
            컨텐츠가 더이상 없습니다.
            <div onClick={() => window.scrollTo(0, 0)}>👆click!👆</div>
        </FinalWrapper>
    </div>
);

const Item = ({ style, items, router }) => (
    <CardWrapper
        style={{ ...style, width: "99.89%" }}
        onClick={() => router.push(`/kurlylog/post/${items.review_id}`)}
    >
        <Padding>
            <HashTagWrapper>
                <StarPoint>
                    {" "}
                    <Image
                        src={plusStar}
                        alt="plusStar"
                        width={30}
                        height={30}
                    />
                    <span>X {items.score}</span>
                </StarPoint>

                <HashList>
                    <HashTag type={items?.title}>
                        {items.title ? `# ${items.title}` : "단순후기"}
                    </HashTag>
                </HashList>
            </HashTagWrapper>
            <ProfileWrapper>
                <ProfileImgWrapper url={items.picture}></ProfileImgWrapper>
                <PersonContent>
                    <NameWrapper>
                        <PersonName>{items.nickname}</PersonName>
                        <UserGrade>
                            {items.grade === "샛별"
                                ? `🥉 ${items.grade}`
                                : `🥈 ${items.grade}`}
                        </UserGrade>
                    </NameWrapper>
                    <Introduce>
                        {items.age} / {items.family} / {items.intro}
                    </Introduce>
                </PersonContent>
            </ProfileWrapper>
            <ReviewSummary>
                <Badge reviewType="good">👍</Badge>
                <SummaryWrapper>
                    <Summary>{items.good}</Summary>
                </SummaryWrapper>
            </ReviewSummary>
            <ReviewSummary>
                <Badge reviewType="bad">👎</Badge>
                <SummaryWrapper>
                    <Summary>{items.bad}</Summary>
                </SummaryWrapper>
            </ReviewSummary>
            {items.title && (
                <ReviewContainer>
                    <EtcWrapper>
                        <LikesWrapper>
                            💜<LikesCnt>{items.countlikes}</LikesCnt>
                        </LikesWrapper>
                    </EtcWrapper>

                    <ImgWrapper>
                        {items.image.length > 2
                            ? Array(2)
                                  .fill(0)
                                  .map((i, idx) => (
                                      <Img
                                          key={`review-img-${idx}`}
                                          url={items.image[idx]}
                                      />
                                  ))
                            : items.image.map((i, idx) => (
                                  <Img key={`review-img-${idx}`} url={i} />
                              ))}
                    </ImgWrapper>
                </ReviewContainer>
            )}
        </Padding>
    </CardWrapper>
);

const ReviewCard = ({ image, num, style, loading, items }) => {
    const router = useRouter();
    return loading ? (
        <Loader style={style} />
    ) : (
        <Item items={items} style={style} loading={loading} router={router} />
    );
};

export default ReviewCard;

const CardWrapper = styled.div`
    height: 100%;
    padding: 5px 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
`;

const Padding = styled.div`
    width: 100%;
    height: 100%;
    padding: 10px;
    border: 1.5px solid #b3b3b3;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &:hover {
        border: 1.5px solid #5f0080;
        background-color: #ecc3fb;
    }
    &:click {
        border: 1.5px solid #5f0080;
    }
`;

const EtcWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    padding-left: 15px;
`;

const LikesWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    font-size: 20px;
`;
const LikesCnt = styled.span`
    font-size: 16px;
    padding: 0 3px;
`;

const StarPoint = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    padding: 0 0 15px 5px;
    color: gray;
    font-weight: bold;
    font-size: 18px;
`;

const HashTagWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
`;

const HashTag = styled.div`
    width: ${(props) => (props.type ? "200px" : "100px")};
    height: 24px;
    line-height: 24px;
    border-radius: 14px;
    background-color: ${(props) => (props.type ? "#fff" : "#E6E6E6")};
    color: ${(props) => (props.type ? "#5f0080" : "#545354")};
    border: ${(props) => (props.type ? "1px solid #5f0080" : "none")};
    font-size: 12px;
    text-align: center;
    margin: 0 2px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    padding-left: 3px;
`;

const HashList = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;

const ProfileWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.5fr 7fr;
    align-items: center;
`;
const ProfileImgWrapper = styled.div`
    height: 80px;
    width: 80px;
    border-radius: 50px;
    border: 2px dashed #5f0080;
    padding: 6px;
    background: url(${(props) => props.url});
    background-size: cover;
    background-position: center center;
    color: white;
    margin: 0 3px;
`;

const NameWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const UserGrade = styled.div`
    font-size: 12px;
    font-weight: bold;
    color: gray;
    padding-left: 5px;
`;

const PersonContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 10px;
`;

const PersonName = styled.div`
    font-weight: 800;
    font-size: 20px;
    color: #5f0080;
`;

const Introduce = styled.div`
    font-size: 12px;
    padding: 2px 0;
    color: gray;
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

const SummaryWrapper = styled.div`
    display: flex;
    align-items: center;
    height: 50px;
    width: 100%;
    margin: 5px 0;
`;

const Summary = styled.div`
    width: 85%;
    font-size: 14px;
    color: gray;
    word-break: break-word;
    margin-left: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical
    -webkit-letter-spacing: normal;
    letter-spacing: normal;
    overflow-wrap: break-word;
`;
const ReviewContainer = styled.div`
    display: grid;
    grid-template-columns: 3fr 7fr;
`;
const ImgWrapper = styled.div`
    height: 100px;
    display: flex;
    justify-content: flex-end;
`;

const Img = styled.div`
    width: 110px;
    height: 110px;
    background: url(${(props) => props.url});
    background-size: cover;
    background-position: center center;
    color: white;
    margin: 0 3px;
`;

const FinalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #5f0080;
    margin-top: 5px;
`;
