import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RackViz.css';

const RackViz = () => {
    const [rackData, setRackData] = useState([]);

    useEffect(() => {
        const fetchRackData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/locations/rackstatus');
                setRackData(response.data);
            } catch (error) {
                console.error('Error fetching rack data:', error);
            }
        };

        fetchRackData();
    }, []);

    const parseRackData = (rackData) => {
        const rows = [];
        let row = [];
        for (let i = 0; i < rackData.length; i++) {
            row.push(rackData[i]);
            if (row.length === 8) {
                rows.push(row);
                row = [];
            }
        }
        return rows;
    };

    const renderRack = (rack) => {
        return rack.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
                {row.map((square, colIndex) => (
                    <div key={colIndex} className={`square ${square === '0' ? 'empty' : 'full'}`}></div>
                ))}
            </div>
        ));
    };

    return (
        <div>
            <h1>Rack Visualization</h1>
            <div className="rack-container">
                {rackData.map((rack, index) => (
                    <div key={index} className="rack">
                        <h2>Rack {rack[0]}</h2>
                        <div className="grid-container">{renderRack(parseRackData(rack.substring(1)))}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RackViz;
