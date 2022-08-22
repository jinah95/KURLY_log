import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";
import { styled as materialStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const Write = dynamic(() => import("./Write"), { ssr: false });

const KurlyLogWrite = ({ setWrite }) => {
    const [preview, setPreview] = useState(false);
    const [htmlStr, setHtmlStr] = useState('');
    const viewContainerRef = useRef(null);

    const uploadPost = () => {
        // 게시물 작성 한 것 업로드 구현
    }

    useEffect(() => {
        if (viewContainerRef.current) {
            viewContainerRef.current.innerHTML += htmlStr;
        }
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
                    <Write htmlStr={htmlStr} setHtmlStr={setHtmlStr} />
                    <ButtonWrapper>
                        <PreviewButton onClick={() => setPreview(true)}>
                            미리보기
                        </PreviewButton>
                        <Buttons>
                            <ConfirmButton onClick={() => setWrite(false)}>
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

const ButtonWrapper = styled.div`
    width: 100%;
    height: 70px;
    background-color: #f2f2f2;
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
