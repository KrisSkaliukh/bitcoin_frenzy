import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Formik,
  Form,
  Field
} from 'formik';
import { Box, Typography, Modal, Button  } from '@mui/material';
import { changeModalType, deposit, setHistory, withdraw } from '../../redux/bitcoinSlice';

import './walletModal.style.css';

const INITIAL_VALUES = { money: 100 };

export default function WalletModal() {
  const [error, setError] = useState('')
  const dispatch = useDispatch();
  
  const { modalType, userMoney } = useSelector((state: RootState) => state.bitcoins);

  const closeModal = useCallback(() => {
    setError('');
    dispatch(changeModalType(''));
  }, [dispatch]);

  const workWithMoney = useCallback((values: {money: number} ) =>{
    if(modalType === 'deposit'){
      dispatch(deposit(values.money));
      dispatch(setHistory(`Deposit ${values.money}`));
      closeModal();
    } else{
        if(userMoney >= values.money){
        dispatch(withdraw(values.money));
        dispatch(setHistory(`Withdraw ${values.money}`));
        closeModal();
      } else {
        setError('you don`t have money');
      }
    }
  }, [closeModal, dispatch, modalType, userMoney])

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
            onSubmit={workWithMoney}
          >
          <Form>
            <Field
              id="money" 
              name="money" 
              type="number"
              min="100"
              max="1000000"
              className="moneyField"
            />
            {!!error && <p className='error'>{error}</p>}
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
