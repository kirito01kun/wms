import React from 'react';
import PalletList from './components/PalletList';
import AddPallet from './components/AddPallet';

const PalletEntry = () => {
    return (
        <div className='content'>
            <PalletList />
            <AddPallet />
        </div>
    );
};

export default PalletEntry;
