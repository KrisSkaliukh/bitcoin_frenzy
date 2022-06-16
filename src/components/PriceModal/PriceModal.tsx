import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Formik,
  Form,
  Field
} from 'formik';
import { Box, Typography, Modal, Button  } from '@mui/material';
import { changeModalTypePrice, descreaseBicoinPrice, increaseBicoinPrice } from '../../redux/bitcoinSlice';

import './priceModal.style.css';

const INITIAL_VALUES = { price: 1000 };

export default function PriceModal() {
  const dispatch = useDispatch();
  const [error, setError] = React.useState('')
  
  const { modalTypePrice, bitcoinPrice } = useSelector((state: RootState) => state.bitcoins);

  const closeModal = () => {
    setError('');
    dispatch(changeModalTypePrice(''));
  };

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
            onSubmit={(values: { price: number }) => {
              if(modalTypePrice === 'Increase'){
                dispatch(increaseBicoinPrice(values.price));
                closeModal();
              } else{
                  if(bitcoinPrice >= values.price){
                  dispatch(descreaseBicoinPrice(values.price));
                  closeModal();
                } else {
                  setError('bitcoin price is too low');
                }
              }
            }}
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
