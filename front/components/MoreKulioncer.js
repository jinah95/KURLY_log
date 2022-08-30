import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import { getPost } from "../api";

const KurlioncerCard = ({ item, idx }) => {
    const router = useRouter();
    return (
        <PersonContainer
            odd={idx % 2 === 0 ? "even" : "odd"}
            onClick={() => router.push(`/kurlyLog/${item.user_id}`)}
        >
            <Profile>
                <GradeNumber> {idx + 1}</GradeNumber>
                <ProfileImg url={item.picture}></ProfileImg>
            </Profile>
            <PersonContent>
                <PersonName>{item.nickname}</PersonName>
                <Introduce>
                    {item.age} / {item.family} / {item.intro}
                </Introduce>
                <HashTagWrapper>
                    <HashTag># 요리레시피</HashTag>
                    <HashTag># 후기요정</HashTag>
                </HashTagWrapper>
            </PersonContent>
            <PersonData>
                <DataWrapper>
                    {" "}
                    <DataTitle>팔로워</DataTitle>
                    <DataCount>{item.followers}</DataCount>
                    <DataTitle>리뷰글</DataTitle>
                    <DataCount>{item.reviews}</DataCount>
                    <DataTitle>좋아요</DataTitle>
                    <DataCount>{item.likes}</DataCount>
                </DataWrapper>
            </PersonData>
        </PersonContainer>
    );
};

const MoreKulioncer = () => {
    const [userList, setUserList] = useState([]);
    const moreUser = async () => {
        const res = await getPost(`/users/more`);
        const newList = res.data.data;
        setUserList(newList);
    };

    useEffect(() => {
        moreUser();
    }, []);

    return (
        <Wrapper>
            <KurlioncerPageMove>
                <PageMoveWrapper>
                    <PageMoveFirst>
                        <PageMoveTitle>More Kulioncer💜</PageMoveTitle>
                        <PageMoveSubTitle>컬리언서? 야 나두!</PageMoveSubTitle>
                    </PageMoveFirst>
                </PageMoveWrapper>
            </KurlioncerPageMove>
            {userList.map((item, idx) => {
                return (
                    <KurlioncerCard
                        key={`best-more-${idx}`}
                        item={item}
                        idx={idx}
                        height={userList.length}
                    />
                );
            })}
        </Wrapper>
    );
};

export default MoreKulioncer;

const Wrapper = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
`;

const PersonContainer = styled.div`
    width: 100%;
    background-color: ${(props) =>
        props.odd === "even" ? "#E4CCFF" : "white"};
    margin: 5px 0;
    cursor: pointer;
    display: grid;
    grid-template-columns: 1.5fr 3fr 1fr;
    padding: 8px;

    &:hover {
        border: 1.5px solid #5f0080;
    }
    &:click {
        border: 1.5px solid #5f0080;
    }
`;

const Profile = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;

const GradeNumber = styled.span`
    font-weight: bold;
    color: #5f0080;
    padding-right: 3px;
`;

const ProfileImg = styled.div`
    width: 75px;
    height: 75px;
    background-color: gray;
    background: url(${(props) => props.url});
    background-size: cover;
    background-position: center center;
`;

const PersonContent = styled.div`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding-left: 20px;
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

const HashTagWrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2px 0;
`;

const HashTag = styled.div`
    width: 80px;
    height: 22px;
    line-height: 22px;
    border-radius: 14px;
    background-color: #5f0080;
    color: white;
    font-size: 10px;
    text-align: center;
    margin: 0 2px;
`;

const PersonData = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
`;

const DataWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
const DataTitle = styled.div`
    font-weight: 700;
    font-size: 14px;
    color: #5f0080;
    margin: 0 2px;
`;

const DataCount = styled.div`
    font-weight: 400;
    font-size: 13px;
    color: gray;
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
