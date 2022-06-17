import * as React from 'react';

import BitcoinPrice from '../../components/BitcoinPrice';
import PriceModal from '../../components/PriceModal';

export default function BitcoinPricePage() {
  return (
    <>
      <BitcoinPrice />
      <PriceModal />
    </>
  )
};
