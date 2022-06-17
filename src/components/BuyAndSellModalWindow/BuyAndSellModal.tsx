import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Formik,
  Form,
  Field
} from 'formik';
import { Box, Typography, Modal, Button  } from '@mui/material';
import { buyBitcoin, changeModalTypeBitcoins, deposit, sellBitcoin, setHistory, withdraw } from '../../redux/bitcoinSlice';

import './buyAndSellModal.style.css';

const INITIAL_VALUES = { bitcoin: 1 };

export default function BuyAnsSellModal() {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  
  const { modalTypeBitcoins, bitcoinPrice, userMoney, userBitcoins } = useSelector((state: RootState) => state.bitcoins);

  const closeModal = useCallback(() => {
    setError('');
    dispatch(changeModalTypeBitcoins(''));
  }, [dispatch]);

  const buyAndSell = useCallback((values: { bitcoin: number }) =>{
    if(modalTypeBitcoins === 'buyBitcoin'){
      if(userMoney < bitcoinPrice){
        setError('you don`t have enough money')
      } else{
        dispatch(buyBitcoin(values.bitcoin));
        dispatch(withdraw(bitcoinPrice*values.bitcoin));
        dispatch(setHistory(`Purchased ${values.bitcoin} Bitcoin`));
        closeModal();
      }
    } else{
        if(userBitcoins < values.bitcoin){
          setError('you don`t have enough bitcoins')
        } else {
          dispatch(sellBitcoin(values.bitcoin));
          dispatch(deposit(bitcoinPrice*values.bitcoin));
          dispatch(setHistory(`Sold ${values.bitcoin} Bitcoin`));
          closeModal();
        }
    }
  }, [bitcoinPrice, closeModal, dispatch, modalTypeBitcoins, userBitcoins, userMoney]);

  return (
      <Modal
        open={modalTypeBitcoins !== ''}
        onClose={closeModal}
      >
        <Box className='boxModal'>
          <Typography variant='h4'> {modalTypeBitcoins === 'buyBitcoin' ? 'Buy' : 'Sell'} Bitcoins</Typography>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit= {buyAndSell}
          >
          <Form>
            <Field
              id="bitcoin" 
              name="bitcoin" 
              type="number"
              min="1"
              max="1000"
              className="bitcoinField"
            />
            {!!error && <p className='error'>{error}</p>}
            <Button className="submitBtn" type="submit" color="primary" variant="contained" fullWidth>
            {modalTypeBitcoins === 'buyBitcoin' ? 'Buy' : 'Sell' }
            </Button>            
          </Form>
          </Formik>
        </Box>
      </Modal>
  );
}
