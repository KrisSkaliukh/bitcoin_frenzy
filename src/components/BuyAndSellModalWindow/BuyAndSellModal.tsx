import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Formik,
  Form,
  Field
} from 'formik';
import { Box, Typography, Modal, Button  } from '@mui/material';
import { buyBitcoin, changeModalTypeBitcoins, deposit, sellBitcoin, setError, withdraw } from '../../redux/bitcoinSlice';

import './buyAndSellModal.style.css';

const INITIAL_VALUES = { bitcoin: 1 };

export default function BuyAnsSellModal() {
  const dispatch = useDispatch();
  
  const { modalTypeBitcoins, bitcoinPrice, userMoney, error, userBitcoins } = useSelector((state: RootState) => state.bitcoins);
  const closeModal = () => {
    dispatch(changeModalTypeBitcoins(''));
  };

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
                if(userMoney < bitcoinPrice){
                  dispatch(setError('not money'));
                } else{
                  dispatch(buyBitcoin(Number(values.bitcoin)));
                  dispatch(withdraw(bitcoinPrice*values.bitcoin));
                  dispatch(changeModalTypeBitcoins(''));
                }
              } else{
                  if(userBitcoins < values.bitcoin){
                    dispatch(setError('not bitcoins'));
                  } else {
                    dispatch(sellBitcoin(Number(values.bitcoin)));
                    dispatch(deposit(bitcoinPrice*values.bitcoin));
                    dispatch(changeModalTypeBitcoins(''));
                  }
              }
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
            {error === 'not bitcoins' && modalTypeBitcoins === 'sellBitcoins' && <p className='error'>you don`t have bitcoins</p>}

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
