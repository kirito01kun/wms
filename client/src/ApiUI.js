import React from 'react';
import LocationList from './components/LocationList';
import AddLocation from './components/AddLocation';
import UpdateLocation from './components/UpdateLocation';


const ApiUI = () => {

  return (
    <div className='content'>
    <LocationList />
    <AddLocation/>
    <UpdateLocation/>
    </div>
        
  );
};
/*<ForkliftStatus />
        <Statistics />
        <ActivityLog />*/
export default ApiUI;
