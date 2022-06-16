import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Formik,
  Form,
  Field
} from 'formik';
import { Box, Typography, Modal, Button  } from '@mui/material';
import { changeModalType, deposit, setError, withdraw } from '../../redux/bitcoinSlice';

import './walletModal.style.css';

const INITIAL_VALUES = { money: 100 };

export default function WalletModal() {
  const dispatch = useDispatch();
  
  const { modalType, userMoney, error } = useSelector((state: RootState) => state.bitcoins);

  const closeModal = () => {
    dispatch(changeModalType(''));
  };

  return (
    <>
      <Modal
        open={modalType !== ''}
        onClose={closeModal}
      >
        <Box className='boxModal'>
          {modalType === 'deposit' 
          ? <Typography variant='h4'>Deposit Money</Typography>
          : <Typography variant='h4'>Withdraw Money</Typography>
          }
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={(values) => {
              if(modalType === 'deposit'){
                dispatch(deposit(Number(values.money)));
                dispatch(changeModalType(''));
              } else{
                  if(userMoney >= values.money){
                  dispatch(withdraw(Number(values.money)));
                  dispatch(changeModalType(''));
                } else {
                  dispatch(setError('not money'))
                }
              }
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
            {error === 'not money' && <p className='error'>you can`t withdraw money</p>}
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
