import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Formik,
  Form,
  Field
} from 'formik';
import { Box, Typography, Modal, Button  } from '@mui/material';
import { changeModalType } from '../../redux/bitcoinSlice';

import { useChangeMoneyCountMutation, useGetUserMoneyQuery } from '../../redux/services/user';
import { useAddHistoryMutation } from '../../redux/services/history';

import './walletModal.style.css';

const INITIAL_VALUES = { money: 100 };

export default function WalletModal() {
  const [error, setError] = useState('')
  const dispatch = useDispatch();
 
  const [ changeCountMoney ] = useChangeMoneyCountMutation();
  const [ addHistory ] = useAddHistoryMutation();

  const { data: countUserMoney } = useGetUserMoneyQuery();

  const { modalType } = useSelector((state: RootState) => state.bitcoins);
 
  const closeModal = useCallback(() => {
    setError('');
    dispatch(changeModalType(''));
  }, [dispatch]);

  const workWithMoney = useCallback((values: {money: number} ) =>{
    if(modalType === 'deposit'){
      if (countUserMoney) {
        const count_money = countUserMoney + values.money;
        changeCountMoney({count_money});
      };
      addHistory({ text_history: `Deposit ${values.money}`});
      closeModal();
    } else{
        if(countUserMoney && countUserMoney >= values.money){
          const count_money = countUserMoney - values.money;
          changeCountMoney({count_money});
          addHistory({ text_history: `Withdraw ${values.money}`});
          closeModal();
      } else {
        setError('you don`t have money');
      }
    }
  }, [addHistory, changeCountMoney, closeModal, countUserMoney, modalType])

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
