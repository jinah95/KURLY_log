import React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from "styled-components";
import { styled as materialStyled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    height: 170,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    textAlign: 'center',
};

export default function BasicModal({ open, handleClose, func }) {

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Confirm>
            삭제하시겠습니까?
          </Confirm>
          <ButtonWrapper>
            <ConfirmButton onClick={func}>확인</ConfirmButton>
            <ConfirmButton onClick={handleClose}>취소</ConfirmButton>
          </ButtonWrapper>
        </Box>
      </Modal>
    </div>
  );
}

const Confirm  = styled.div`
    font-weight: blod;
`;

const ButtonWrapper = styled.div`
    width: 100%;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
`;

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