import React, { useState, useEffect } from 'react';
import './RackViz.css'; // Assuming you have a CSS file for styling

const RackViz = () => {
  // State to manage card data and current slide index
  const [cardData, setCardData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch data from API and update state
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/locations/rackstatus');
        const data = await response.json();
        // Parse data and generate card objects
        const cards = data.map((rack) => ({
          id: rack.charAt(0),
          title: `Rack ${rack.charAt(0)}`,
          squares: generateSquares(rack.slice(1))
        }));
        setCardData(cards);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once

  // Function to generate squares based on rack status
  function generateSquares(rackStatus) {
    return rackStatus.split('').map((status, index) => (
      <div key={index} className="square" style={{ backgroundColor: status === '0' ? 'red' : 'green' }}></div>
    ));
  }

  // Function to handle next slide
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % cardData.length);
  };

  // Function to handle previous slide
  const prevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? cardData.length - 1 : prevSlide - 1
    );
  };

  return (
    <div className="rack-container">
      <div className="slideshow-container">
        <div className="prev-btn-container" onClick={prevSlide}><span role="img" aria-label="Previous">&#10094;</span></div>
        <div className="rack-card">
          <div className="rack-header">{cardData.length > 0 ? cardData[currentSlide].title : 'Loading...'}</div>
          <div className="rack-grid">{cardData.length > 0 ? cardData[currentSlide].squares : null}</div>
        </div>
        <div className="next-btn-container" onClick={nextSlide}><span role="img" aria-label="Next">&#10095;</span></div>
      </div>
    </div>
  );
};

export default RackViz;
