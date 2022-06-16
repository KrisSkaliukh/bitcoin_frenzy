import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Formik,
  Form,
  Field
} from 'formik';
import { Box, Typography, Modal, Button  } from '@mui/material';
import { changeModalType, deposit, withdraw } from '../../redux/bitcoinSlice';

import './walletModal.style.css';

const INITIAL_VALUES = { money: 100 };

export default function WalletModal() {
  const [error, setError] = React.useState('')
  const dispatch = useDispatch();
  
  const { modalType, userMoney } = useSelector((state: RootState) => state.bitcoins);

  const closeModal = () => {
    setError('');
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
                closeModal();
              } else{
                  if(userMoney >= values.money){
                  dispatch(withdraw(Number(values.money)));
                  closeModal();
                } else {
                  setError('you don`t nave money');
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
