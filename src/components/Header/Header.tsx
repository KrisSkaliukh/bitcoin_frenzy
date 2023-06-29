import React, {useMemo} from 'react';

import HeaderLogo from '../../assets/logo.png';

import { useGetPriceQuery } from '../../redux/services/bitcoinPrice';
import { useGetUserBitcoinsQuery, useGetUserMoneyQuery } from '../../redux/services/user';
import { Avatar, Box, IconButton, Menu, MenuItem } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import './header.style.css'
import { TOKEN_KEY } from '../../redux/constants/localStorageKeys';
import { useNavigate } from 'react-router-dom';

const ITEM_HEIGHT = 48;

export default function Header() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    setAnchorEl(null);
    localStorage.removeItem(TOKEN_KEY);
    navigate('/', { replace: true});
  };
  
  const { data = 0 } = useGetPriceQuery();
  const { data: bitcoins } = useGetUserBitcoinsQuery();
  const {data: money } = useGetUserMoneyQuery();

  const price = useMemo(() => new Intl.NumberFormat('en').format(data), [data] ) ;

  return(
    <div className='header'>
      <div className='logoAndTitle'>
        <img src={HeaderLogo} alt='header logo' className='headerLogo' />
        <h1 className='text'>BITCOIN FRENZY</h1>
      </div>
      <span className='text origin'>1 BITCOIN = {price}$  </span>
      <p className='text origin'>{money}$ <br /> {bitcoins} BITCOINS</p>
      <Box sx={{ flexDirection: 'row', display: 'flex' }}>
        <Avatar sx={{ alignSelf: 'center', margin: '8px' }} src="/broken-image.jpg" />
          <Box sx={{ alignSelf: 'center', margin: '8px' }}>
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open ? 'long-menu' : undefined}
              aria-expanded={open ? 'true' : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              id="long-menu"
              MenuListProps={{
                'aria-labelledby': 'long-button',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: '20ch',
                },
              }}
            >
              <MenuItem onClick={logOut}>
                <span className='menuText origin'>EXIT</span>
              </MenuItem>
            </Menu>
          </Box>
      </Box>
    </div>
  )
};
