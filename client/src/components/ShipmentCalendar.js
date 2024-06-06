// ShipmentCalendar.js

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import axios from 'axios';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './style/ShipmentCalendar.css';

const localizer = momentLocalizer(moment);

const ShipmentCalendar = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchShipments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/shipments/display');
                const shipments = response.data;

                const formattedEvents = shipments.map(shipment => ({
                    title: `${shipment.shipmentId} - ${shipment.supplier}`,
                    start: shipment.arrivalDateTime ? new Date(shipment.arrivalDateTime) : new Date(shipment.expectedArrivalDateTime),
                    end: shipment.arrivalDateTime ? new Date(shipment.arrivalDateTime) : new Date(shipment.expectedArrivalDateTime),
                    isArrived: shipment.arrivalDateTime !== null
                }));

                setEvents(formattedEvents);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };

        fetchShipments();
    }, []);

    const eventStyleGetter = (event, start, end, isSelected) => {
        let style = {
            backgroundColor: event.isArrived ? '#4caf50' : '#f44336', // Blue for arrived, red for expected
            color: '#fff',
            fontweight: 'bold',
            borderRadius: '5px',
            border: 'none',
            display: 'block',
        };

        return {
            style,
        };
    };

    return (
        <div className="shipment-calendar-container">
            <h2 className="shipment-calendar-header">Shipment Calendar</h2>
            <div className="shipment-calendar">
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }} // Adjusted height and width
                    views={['month']}
                    eventPropGetter={eventStyleGetter}
                />
            </div>
        </div>
    );
};

export default ShipmentCalendar;
