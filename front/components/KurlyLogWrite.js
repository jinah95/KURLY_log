import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import plusStar from "../public/plusStar.png";
import styled from "styled-components";
import { styled as materialStyled } from '@mui/material/styles';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { get, patch, sendPostImageFile } from "../api";

const Write = dynamic(() => import("./Write"), { ssr: false });

const KurlyLogWrite = ({ changeWrite, postInfo }) => {
    const viewContainerRef = useRef(null);
    const [preview, setPreview] = useState(false);
    const [htmlStr, setHtmlStr] = useState("");
    const [productInfo, setProductInfo] = useState({});

    const [imgList, setImgList] = useState([]);
    const [score, setScore] = useState(postInfo.score);
    const [good, setGood] = useState(postInfo.good);
    const [bad, setBad] = useState(postInfo.bad);
    const [title, setTitle] = useState(postInfo.title);
    const [image, setImage] = useState(postInfo.image);
    const [content, setContent] = useState(postInfo.content);


    // const [kurlyLog, setKurlyLog] = useState({
    //     score: postInfo.score,
    //     good : postInfo.good,
    //     bad : postInfo.bad,
    //     title : postInfo.title,
    //     image : postInfo.image,
    //     content : postInfo.content,
    // });

    // const changeKurlyLog = (key, value) => {
    //     setKurlyLog((current) => {
    //         let newKurlyLog = { ...current };
    //         newKurlyLog[key] = value;
    //         // console.log("업데이트 데이터: ", newKurlyLog);
    //         return newKurlyLog;
    //     });
    // };

    // productId로 상품 정보 조회
    
    const getProductInfo = async () => {
        try {
            const res = await get("/goods/", postInfo.product_id);
            setProductInfo(res.data.data);
        } catch (err) {
            console.error("error message: ", err);
        }
    };

     // 게시물 수정 업로드
    const uploadPost = async () => {
        if (title === "" || content === "") {
            return;
        }

        // S3에 이미지 업로드
        const formData = new FormData();
        imgList.map((item) => formData.append("img", item.file));
        const res = await sendPostImageFile("/upload/multi/", formData);
        
        // S3 주소 저장
        const imageS3Url = await res.data.data; 
        
        const data = await patch(`/logs/${postInfo.review_id}`, {
            score: score,
            good : good,
            bad : bad,
            title : title,
            image : imageS3Url, 
            content : content,
        });
        console.log("수정: ", data.data);

        changeWrite();
    }

    // 이미지 추가
    const handleAddImages = (e) => {
        const images = e.currentTarget.files;
        let imageUrlLists = [...imgList];

        for (let i = 0; i < images.length; i++) {
            const currentImageUrl = URL.createObjectURL(images[i]);
            imageUrlLists.push({ show: currentImageUrl, file: images[i] });
        }

        if (imageUrlLists.length > 5) {
            imageUrlLists = imageUrlLists.slice(0, 5);
        }
        setImgList(imageUrlLists);
    };

    // 이미지 삭제
    const handleDeleteImage = (e) => {
        const deleteIndex = e.currentTarget.id;
        let imageUrlLists = [...imgList];
        imageUrlLists = imageUrlLists.filter((item) => {
            return item !== imageUrlLists[deleteIndex];
        });
        setImgList(imageUrlLists);
    };

    // url로 file 변환
    const convertURLtoFile = async (url) => {
        const response = await fetch(url);
        const data = await response.blob();
        const ext = url.split(".").pop(); // url 구조에 맞게 수정할 것
        console.log(ext);
        const filename = url.split("/").pop(); // url 구조에 맞게 수정할 것
        console.log(filename);
        const metadata = { type: `image/${ext}` };
        return new File([data], filename, metadata);
    };

    // postInfo.image url 배열을 {show:, file:} 객체로 변환
    // useEffect(() => {
    //     console.log(postInfo.image);
    //     console.log(typeof(postInfo.image));
    //     const newImgList = postInfo.image.map((url) => {
    //         let obj = { show: url, file: convertURLtoFile(url) };
    //         return obj;
    //     })

    //     console.log(newImgList);
    //     setImgList(newImgList);
    // }, [])

    useEffect(() => {
        getProductInfo();
        if (viewContainerRef.current) {
            viewContainerRef.current.innerHTML += htmlStr;
        }
        setContent(htmlStr.replace(/(<([^>]+)>)/gi, ""));
    }, [htmlStr, preview])

    useEffect(() => {
        setHtmlStr(postInfo.content);
    }, [postInfo])

    return (
        <Wrapper>
        {
            preview ? (
                <div>
                    {/* 제목 이미지 등 보이기 */}
                    <ViewContainer ref={viewContainerRef} />
                    <ButtonWrapper>
                        <ConfirmButton onClick={() => setPreview(false)}>
                            확인
                        </ConfirmButton>
                    </ButtonWrapper>
                </div>
            ) : (
                <div>
                    <WriteWrapper>
                        <Product>[{productInfo.detail}]</Product>
                        <Line />
                        <ReviewWrapper>
                            <h3>상품은 만족하셨나요?</h3>
                            <div>
                                <Image
                                    src={plusStar}
                                    alt="plusStar"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <ReviewSummary>
                                <div>
                                    <Badge reviewType="good">👍</Badge>
                                    좋았어요
                                </div>
                                <Review
                                    placeholder="좋았던 점을 적어주세요!"
                                    value={good}
                                    onChange={(e) => setGood(e.target.value)}
                                />
                            </ReviewSummary>
                            <ReviewSummary>
                                <div>
                                    <Badge reviewType="bad">👎</Badge>
                                    별로에요
                                </div>
                                <Review
                                    placeholder="개선하면 좋을 점을 적어주세요!"
                                    value={bad}
                                    onChange={(e) => setBad(e.target.value)}
                                />
                            </ReviewSummary>
                        </ReviewWrapper>
                        <Line />
                        <WriteContent>
                            <h5>상세 후기 작성</h5>
                            <Title
                                placeholder="제목을 입력해주세요."
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <WriteContainer>
                                <Write htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
                            </WriteContainer>
                            <ImageUpload>
                                <h5>사진 등록하기 (최대 5장)</h5>
                                <InputLabel htmlFor="input-file">+</InputLabel>
                                <input
                                    type="file"
                                    multiple
                                    id="input-file"
                                    accept="image/*"
                                    style={{ display: "none" }}
                                    onChange={(e) => handleAddImages(e)}
                                />
                            </ImageUpload>
                            <ImageWrapper>
                                {imgList.map((img, index) => (
                                    <ImageCard key={index}>
                                        <Image
                                            src={img.show}
                                            alt={index}
                                            width={50}
                                            height={50}
                                        />
                                        <div
                                            id={index}
                                            onClick={(e) => handleDeleteImage(e)}>
                                            x
                                        </div>
                                    </ImageCard>
                                ))}
                            </ImageWrapper>
                        </WriteContent>
                    </WriteWrapper>
                    <ButtonWrapper>
                        <PreviewButton onClick={() => setPreview(true)}>
                            미리보기
                        </PreviewButton>
                        <Buttons>
                            <ConfirmButton onClick={changeWrite}>
                                취소
                            </ConfirmButton>
                            <ConfirmButton onClick={uploadPost}>
                                완료
                            </ConfirmButton>
                        </Buttons>
                    </ButtonWrapper>
                </div>
            )
        }
        </Wrapper>
    )
}

export default KurlyLogWrite;

const Wrapper = styled.div`
    width: 100%;
    height: auto;
    background-color: white;
`;

const ViewContainer = styled.div`
    border: 1px solid #e2e2e2;;
    margin: 10px;

    .ql-align-center {
        text-align: center;
    }

    .ql-syntax {
        background-color: #23241f;
        color: #f8f8f2;
        border-radius: 3px;
        padding: 5px;
        margin: 0 10px;
    }
`;

const WriteWrapper = styled.div`
    width: 100%;
    height: 100%;
`;

const Product = styled.div`
    width: 100%;
    height: 70px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ReviewWrapper = styled.div`
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    padding-bottom: 10px;
`;

const ReviewSummary = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.8rem;
    font-weigth: bold;
    color: #525252;
    text-align: center;
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

const WriteContent = styled.div`
    width: 90%;
    height: 650px;
    margin: 30px auto;
`;

const Review = materialStyled(TextField)(
    () => ({
        width: "70vw",
        '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: "none",
        }
    })
);

const Title = materialStyled(TextField)(
    () => ({
        width: "100%",
        border: "none",
        '.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            border: "none",
        }
    })
);

const WriteContainer = styled.div`
    width: 100%;
    height: 400px;
`;

const ImageUpload = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

const InputLabel = styled.label`
    width: 20px;
    height: 20px;
    background-color: var(--purple);
    color: white;
    border-radius: 25px;
    display: flex;
    justify-content: center;
    align-items: end;
    margin-left: 5px;
    cursor: pointer;
`;

const ImageWrapper = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    margin: 5px 0;
    padding: 5px;
    background-color: #f2f2f2;
`;

const ImageCard = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border: 1px solid #a2a2a2;
    padding: 4px 4px;
    margin: 0 2px;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    height: 70px;
    background-color: #f2f2f2;
    margin-top: 50px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Buttons = styled.div`
    width: 150px;
    display: flex;
    justify-content: space-between;
`;

const PreviewButton = materialStyled(Button)(
    () => ({
        width: '140px',
        height: '40px',
        backgroundColor: 'white',
        color: 'black',
        fontSize: '0.8rem',
        border: '0',
        borderRadius: '0',
        '&:hover': {
            border: '0',
        }
    })
);

const ConfirmButton = materialStyled(Button)(
    () => ({
        width: '70px',
        height: '40px',
        backgroundColor: 'black',
        color: 'white',
        fontSize: '0.8rem',
        border: '0',
        borderRadius: '25px',
        '&:hover': {
            backgroundColor: 'var(--purple)',
        }
    })
);

const Line = styled.div`
    width: 80%;
    background-color: #e2e2e2;
    height: 1px;
    margin: 10px auto;
`;