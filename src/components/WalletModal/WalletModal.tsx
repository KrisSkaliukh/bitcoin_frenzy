import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { RootState } from '../../redux/store';
import { Box, Typography, Modal  } from '@mui/material';
import { openModal } from '../../redux/bitcoinSlice';

import './walletModal.style.css';

export default function WalletModal() {
  const disaptch = useDispatch();
  const isModalOpen = useSelector((state: RootState) => state.bitcoins.isModalOpen);

  const closeModal = () => {
    disaptch(openModal(false));
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className='boxModal'>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
