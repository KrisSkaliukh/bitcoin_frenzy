import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';

import {
  Formik,
  Form,
  Field
} from 'formik';
import { Box, Typography, Modal, Button  } from '@mui/material';
import { changeModalTypeBitcoins } from '../../redux/bitcoinSlice';
import { useGetPriceQuery } from '../../redux/services/bitcoinPrice';
import { useChangeBitcoinsCountMutation, useChangeMoneyCountMutation, useGetUserBitcoinsQuery, useGetUserMoneyQuery } from '../../redux/services/user';
import { useAddHistoryMutation } from '../../redux/services/history';

import './buyAndSellModal.style.css';

const INITIAL_VALUES = { bitcoin: 1 };

export default function BuyAnsSellModal() {
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  
  const { modalTypeBitcoins } = useSelector((state: RootState) => state.bitcoins);

  const { data: bitcoinPrice = 0 } = useGetPriceQuery();
  const { data: userMoney } = useGetUserMoneyQuery();
  const { data: userBitcoins } = useGetUserBitcoinsQuery();

  const [ changeBitcoinsCount ] = useChangeBitcoinsCountMutation();
  const [ changeCountMoney ] = useChangeMoneyCountMutation();
  const [ addHistory ] = useAddHistoryMutation();

  const closeModal = useCallback(() => {
    setError('');
    dispatch(changeModalTypeBitcoins(''));
  }, [dispatch]);

  const buyAndSell = useCallback((values: { bitcoin: number }) =>{
    if(modalTypeBitcoins === 'buyBitcoin'){
      if(bitcoinPrice && userMoney && userMoney === 0 && userMoney < bitcoinPrice){
        setError('you don`t have enough money')
      } else {
          if (userMoney) {
            const count_money = userMoney - (bitcoinPrice * values.bitcoin);      
            changeCountMoney({count_money});
          }
          changeBitcoinsCount({ count_bitcoins: values.bitcoin + userBitcoins });
          addHistory({ text_history: `Purchased ${values.bitcoin} Bitcoin` });
          closeModal();
        }
    } else {
        if(userBitcoins < values.bitcoin){
          setError('you don`t have enough bitcoins')
        } else {
          changeBitcoinsCount({ count_bitcoins:  userBitcoins - values.bitcoin });
          if (userMoney) {
            const count_money = userMoney + (bitcoinPrice * values.bitcoin);      
            changeCountMoney({count_money});
          }
          addHistory({ text_history: `Sold ${values.bitcoin} Bitcoin` });
          closeModal();
        }
    }
  }, [addHistory, bitcoinPrice, changeBitcoinsCount, changeCountMoney, closeModal, modalTypeBitcoins, userBitcoins, userMoney]);

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
