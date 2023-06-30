import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Formik,
  Form,
  Field
} from 'formik';
import { Box, Typography, Modal, Button  } from '@mui/material';
import { changeModalTypePrice } from '../../redux/bitcoinSlice';
import { useChangePriceMutation, useGetPriceQuery } from '../../redux/services/bitcoinPrice';
import { useAddHistoryMutation } from '../../redux/services/history';

import './priceModal.style.css';

const INITIAL_VALUES = { price: 0 };

export default function PriceModal() {
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  
  const { modalTypePrice } = useSelector((state: RootState) => state.bitcoins);
  const { data: bitcoinPrice = 0 } = useGetPriceQuery();

  const closeModal = useCallback(() => {
    setError('');
    dispatch(changeModalTypePrice(''));
  }, [dispatch]);

  const [changeBitcoinPrice] = useChangePriceMutation();
  const [ addHistory ] = useAddHistoryMutation();

  const increaseAndDescrease = useCallback((values: { price: number }) => {
    const price = new Intl.NumberFormat('en').format(values.price);
    if(modalTypePrice === 'Increase'){
      changeBitcoinPrice({bitcoin_price: values.price + bitcoinPrice});
      addHistory({ text_history: `Increased Bitcoin price by ${price}$` });
      closeModal();
    } else{
        if(bitcoinPrice >= values.price){
          changeBitcoinPrice({bitcoin_price: bitcoinPrice -values.price });
          addHistory({ text_history: `Decreased Bitcoin price by ${price}$` });
          closeModal();
        } else {
          setError('bitcoin price is too low');
        }
      }
  }, [addHistory, bitcoinPrice, changeBitcoinPrice, closeModal, modalTypePrice]);

  return (
    <>
      <Modal
        open={modalTypePrice !== ''}
        onClose={closeModal}
      >
        <Box className='boxModal'>
          {modalTypePrice === 'Increase' 
          ? <Typography variant='h4'>Increase Bitcoin Price</Typography>
          : <Typography variant='h4'>Decrease Bitcoin Price</Typography>
          }
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={increaseAndDescrease}
          >
          <Form>
            <Field
              id="price" 
              name="price" 
              label="price"
              type="number"
              min="100"
              max="1000000"
              className="bitcoinPriceField"
            />
            {!!error && <p className='error'>{error}</p>}
            <Button type="submit" color="primary" variant="contained" fullWidth>
            {modalTypePrice === 'Increase' ? 'Increase' : 'Decrease' }
            </Button>            
          </Form>
          </Formik>
        </Box>
      </Modal>
    </>
  );
}
