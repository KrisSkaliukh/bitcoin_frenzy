import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Formik,
  Form,
  Field
} from 'formik';
import { Box, Typography, Modal, Button  } from '@mui/material';
import { changeModalTypePrice, descreaseBicoinPrice, increaseBicoinPrice, setHistory } from '../../redux/bitcoinSlice';

import './priceModal.style.css';
import { useChangePriceMutation } from '../../redux/services/bitcoinPrice';

const INITIAL_VALUES = { price: 1000 };

export default function PriceModal() {
  const dispatch = useDispatch();
  const [error, setError] = useState('')
  
  const { modalTypePrice, bitcoinPrice } = useSelector((state: RootState) => state.bitcoins);

  const closeModal = useCallback(() => {
    setError('');
    dispatch(changeModalTypePrice(''));
  }, [dispatch]);

  const [changeBitcoinPrice] = useChangePriceMutation();

  const increaseAndDescrease = useCallback((values: { price: number }) => {
    const price = new Intl.NumberFormat('en').format(values.price);
    if(modalTypePrice === 'Increase'){
      
      changeBitcoinPrice({bitcoin_price: values.price});
      dispatch(increaseBicoinPrice(values.price));
      dispatch(setHistory(`Increased Bitcoin price by ${price}$`));
      closeModal();
    } else{
        if(bitcoinPrice >= values.price){
          dispatch(descreaseBicoinPrice(values.price));
          dispatch(setHistory(`Decreased Bitcoin price by ${price}$`));
          closeModal();
        } else {
          setError('bitcoin price is too low');
        }
      }
  }, [bitcoinPrice, changeBitcoinPrice, closeModal, dispatch, modalTypePrice]);

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
