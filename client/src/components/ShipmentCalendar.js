import React, { useState, useEffect } from 'react';
import { CalendarPicker } from '@mui/x-date-pickers/CalendarPicker';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import dayjs from 'dayjs';

const ShipmentCalendar = () => {
    const [date, setDate] = useState(dayjs());
    const [shipments, setShipments] = useState([]);

    useEffect(() => {
        // Fetch shipments data from the API
        const fetchShipments = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/shipments/display');
                setShipments(response.data);
            } catch (error) {
                console.error('Error fetching shipments:', error);
            }
        };

        fetchShipments();
    }, []);

    return (
        <Box>
            <CalendarPicker 
                date={date}
                onChange={(newDate) => setDate(newDate)}
                renderDay={(day, selectedDates, pickersDayProps) => {
                    const dateFormatted = day.format('YYYY-MM-DD');
                    const shipment = shipments.find(
                        (shipment) =>
                            dayjs(shipment.arrivalDateTime).format('YYYY-MM-DD') === dateFormatted ||
                            dayjs(shipment.expectedArrivalDateTime).format('YYYY-MM-DD') === dateFormatted
                    );

                    return (
                        <div {...pickersDayProps}>
                            <Typography variant="caption" color={shipment ? 'primary' : 'textSecondary'}>
                                {day.date()}
                            </Typography>
                            {shipment && (
                                <Box sx={{ bgcolor: 'primary.main', borderRadius: '50%', width: 6, height: 6, mt: 1 }} />
                            )}
                        </div>
                    );
                }}
            />
        </Box>
    );
};

export default ShipmentCalendar;
