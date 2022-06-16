import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Formik,
  Form,
  Field
} from 'formik';
import { Box, Typography, Modal, Button  } from '@mui/material';
import { buyBitcoin, changeModalTypeBitcoins, deposit, sellBitcoin, withdraw } from '../../redux/bitcoinSlice';

import './buyAndSellModal.style.css';

const INITIAL_VALUES = { bitcoin: 1 };

export default function BuyAnsSellModal() {
  const dispatch = useDispatch();
  
  const { modalTypeBitcoins, bitcoinPrice, userMoney, userBitcoins  } = useSelector((state: RootState) => state.bitcoins);

  const closeModal = () => {
    dispatch(changeModalTypeBitcoins(''));
  };

    
  let error;
  if(userMoney < bitcoinPrice){
    error = 'not money';
  }
  if(userBitcoins <= 0){
    error = 'not bicoins';
  }

  return (
    <>
      <Modal
        open={modalTypeBitcoins !== ''}
        onClose={closeModal}
      >
        <Box className='boxModal'>
          <Typography variant='h4'> {modalTypeBitcoins === 'buyBitcoin' ? 'Buy' : 'Sell'} Bitcoins</Typography>
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit= {(values) => {
              if(modalTypeBitcoins === 'buyBitcoin'){
                dispatch(buyBitcoin(Number(values.bitcoin)));
                dispatch(withdraw(bitcoinPrice*values.bitcoin));
              } else{
                dispatch(deposit(bitcoinPrice*values.bitcoin));
                dispatch(sellBitcoin(Number(values.bitcoin)));
              }
              dispatch(changeModalTypeBitcoins(''));
            }}
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
            {error === 'not money' && modalTypeBitcoins === 'buyBitcoin' && <p className='error'>you don`t have enough money</p>}
            {error === 'not bicoins' && modalTypeBitcoins === 'sellBitcoins' && <p className='error'>you don`t have bitcoins</p>}

            <Button className="submitBtn" type="submit" color="primary" variant="contained" fullWidth>
            {modalTypeBitcoins === 'buyBitcoin' ? 'Buy' : 'Sell' }
            </Button>            
          </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
}
