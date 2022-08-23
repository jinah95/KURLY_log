import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/router";
import plusStar from "../public/plusStar.png";
import styled from "styled-components";
import { styled as materialStyled } from '@mui/material/styles';
import { TextField } from "@mui/material";
import Button from '@mui/material/Button';
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { get, post, sendPostImageFile } from "../api";

const Write = dynamic(() => import("./Write"), { ssr: false });

const NewKurlyLog = ({ productId }) => {
    const viewContainerRef = useRef(null);
    const [preview, setPreview] = useState(false);
    const [htmlStr, setHtmlStr] = useState("");
    const [productInfo, setProductInfo] = useState({});
    const router = useRouter();

    const [imgList, setImgList] = useState([]);
    const [score, setScore] = useState(1);
    const [good, setGood] = useState("");
    const [bad, setBad] = useState("");
    const [title, setTitle] = useState("");
    const [image, setImage] = useState([]);
    const [content, setContent] = useState("");

    // productId로 상품 정보 조회
    const getProductInfo = async () => {
        try {
            const res = await get("/goods/", productId);
            setProductInfo(res.data.data);
        } catch (err) {
            console.error("error message: ", err);
        }
    };

     // 게시물 작성 업로드
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
        
        const data = await post(`/logs/${productId}`, {
            score: score,
            good : good,
            bad : bad,
            title : title,
            image : imageS3Url, 
            content : content,
        });

         // 작성한 게시물로 이동
         const review_id = data.data.data.review_id;
         router.push(
             {
                 pathname: `/kurlylog/post/${review_id}`,
                 query: {
                     review_id,
                 },
             },
         );
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

    useEffect(() => {
        getProductInfo();
        if (viewContainerRef.current) {
            viewContainerRef.current.innerHTML += htmlStr;
        }
        setContent(htmlStr.replace(/(<([^>]+)>)/gi, ""));
    }, [htmlStr, preview])

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
                            <StarWrapper>
                                <div>
                                    <Image
                                        src={plusStar}
                                        alt="plusStar"
                                        width={30}
                                        height={30}
                                    />
                                </div>
                                <div>
                                    <Points sx={{ m: 1, minWidth: 80 }}>
                                        <InputLabel
                                            id="demo-simple-select-autowidth-label"
                                            style={{ color: "#5f0080" }}
                                        >
                                            point
                                        </InputLabel>
                                        <Select
                                            labelId="demo-simple-select-autowidth-label"
                                            id="demo-simple-select-autowidth"
                                            value={score}
                                            onChange={(e) => setScore(e.target.value)}
                                            autoWidth
                                            label="point"
                                            required
                                        >
                                            <MenuItem sx={{ minWidth: 80 }} value="1">1</MenuItem>
                                            <MenuItem value="2">2</MenuItem>
                                            <MenuItem value="3">3</MenuItem>
                                            <MenuItem value="4">4</MenuItem>
                                            <MenuItem value="5">5</MenuItem>
                                        </Select>
                                    </Points>
                                </div>
                            </StarWrapper>
                            <ReviewSummary>
                                <div>
                                    <Badge reviewType="good">👍</Badge>
                                    좋았어요
                                </div>
                                <Review
                                    placeholder="좋았던 점을 적어주세요!"
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
                                    onChange={(e) => setBad(e.target.value)}
                                />
                            </ReviewSummary>
                        </ReviewWrapper>
                        <Line />
                        <WriteContent>
                            <h5>상세 후기 작성</h5>
                            <Title
                                placeholder="제목을 입력해주세요."
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <WriteContainer>
                                <Write htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
                            </WriteContainer>
                            <ImageUpload>
                                <h5>사진 등록하기 (최대 5장)</h5>
                                <Plus htmlFor="input-file">+</Plus>
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
                                {imgList.map((image, id) => (
                                    <ImageCard key={`single-${id}`}>
                                        <Image
                                            src={image.show}
                                            alt={`image-${id}`}
                                            width={50}
                                            height={50}
                                        />
                                        <div
                                            id={`${id}`}
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
                            <ConfirmButton>
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

export default NewKurlyLog;

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

const StarWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Points = materialStyled(FormControl)(() => ({
    width: "100%",
    border: "none",
    color: "#5f0080",
    ".MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        border: "1px solid #5f0080",
    },
}));

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

const Plus = styled.label`
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