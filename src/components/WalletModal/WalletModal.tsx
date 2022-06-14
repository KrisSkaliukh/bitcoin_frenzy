import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Formik,
  Form,
  Field
} from 'formik';
import { Box, Typography, Modal, Button  } from '@mui/material';
import { deposit, openModal, withdraw } from '../../redux/bitcoinSlice';

import './walletModal.style.css';

export interface WalletModalValues { money: number };

export default function WalletModal() {
  const dispatch = useDispatch();
  const { isModalOpen, modalType } = useSelector((state: RootState) => state.bitcoins);

  const closeModal = () => {
    dispatch(openModal(false));
  };

  const initialValues: WalletModalValues = { money: 100 };

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='boxModal'>
          {modalType === 'deposit' 
          ? <Typography variant='h4'>Deposit Money</Typography>
          : <Typography variant='h4'>Withdraw Money</Typography>
          }
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => {
              if(modalType === 'deposit'){
                dispatch(deposit(Number(values.money)));
              } else{
                dispatch(withdraw(Number(values.money)));
              }
              closeModal();
            }}
          >
          <Form>
            <Field
              id="money" 
              name="money" 
              label="money"
              type="number"
              min="100"
              max="1000000"
              placeholder="Enter amount"
              className="moneyField"
            />
            <Button className="submitBtn" type="submit" color="primary" variant="contained" fullWidth>
            {modalType === 'deposit' ? 'Deposit' : 'Withdraw' }
            </Button>            
          </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
}
