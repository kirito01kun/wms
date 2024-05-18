import React from 'react';
import LocationList from './components/LocationList';
import AddLocation from './components/AddLocation';
import UpdateLocation from './components/UpdateLocation';


const LocationEntry = () => {

  return (
    <div className='content'>
    <LocationList />
    <AddLocation/>
    <UpdateLocation/>
    </div>
        
  );
};

export default LocationEntry;
