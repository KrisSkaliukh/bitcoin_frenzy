import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Formik,
  Form,
  Field
} from 'formik';
import { Box, Typography, Modal, Button  } from '@mui/material';
import { buyBitcoin, changeModalTypeBitcoins, sellBitcoin } from '../../redux/bitcoinSlice';

import './buyAndSellModal.style.css';

const INITIAL_VALUES = { bitcoin: 1 };

export default function BuyAnsSellModal() {
  const dispatch = useDispatch();
  
  const { modalTypeBitcoins,  } = useSelector((state: RootState) => state.bitcoins);

  const closeModal = () => {
    dispatch(changeModalTypeBitcoins(''));
  };

  return (
    <>
      <Modal
        open={modalTypeBitcoins !== ''}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='boxModal'>
          {modalTypeBitcoins === 'buyBitcoin' 
          ? <Typography variant='h4'>Buy Bitcoins</Typography>
          : <Typography variant='h4'>Sell Bitcoins</Typography>
          }
          <Formik
            initialValues={INITIAL_VALUES}
            onSubmit={(values) => {
              if(modalTypeBitcoins === 'buyBitcoin'){

                dispatch(buyBitcoin(Number(values.bitcoin)));
              } else{
                dispatch(sellBitcoin(Number(values.bitcoin)));
              }
              dispatch(changeModalTypeBitcoins(''));
            }}
          >
          <Form>
            <Field
              id="bitcoin" 
              name="bitcoin" 
              label="bitcoin"
              type="number"
              min="1"
              max="1000"
              placeholder="Enter bitcoin count"
              className="bitcoinField"
            />
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
