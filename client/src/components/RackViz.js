import React, { useState, useEffect } from 'react';
import './style/RackViz.css'; // Assuming you have a CSS file for styling

const RackViz = () => {
  // State to manage card data and current slide index
  const [cardData, setCardData] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Function to generate squares based on rack status
  function generateSquares(rackStatus) {
    const squares = [];
    let locationIndex = 1;
    for (let level = 3; level >= 0; level--) {
      for (let location = 1; location <= 8; location++) {
        const rack = rackStatus.charAt(0);
        const label = `${rack}${level}${location}`;
        squares.push(
          <div key={label} className="square" style={{ backgroundColor: rackStatus.charAt(locationIndex) === '0' ? 'red' : 'green' }}>
            <div className="label">{label}</div>
          </div>
        );
        locationIndex++;
      }
    }
    return squares;
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

  useEffect(() => {
    // Function to fetch data from API
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/locations/rackstatus');
        const data = await response.json();
        // Parse data and generate card objects
        const cards = data.map((rack) => ({
          id: rack.charAt(0),
          title: `Rack ${rack.charAt(0)}`,
          squares: generateSquares(rack)
        }));
        setCardData(cards);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData(); // Initial fetch when component mounts

    const intervalId = setInterval(fetchData, 1000); // Fetch data every minute
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []); // Empty dependency array ensures this effect runs only once

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
