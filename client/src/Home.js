import React from 'react';
import styled, { keyframes } from 'styled-components';

const Home = () => {
    return (
        <HomeContainer>
            <Card>
                <Title>Welcome</Title>
                <Text>Explore and enjoy!</Text>
            </Card>
        </HomeContainer>
    );
};

const backgroundAnimation = keyframes`
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
`;

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: scale(0.9);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
`;

const float = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
    100% { transform: translateY(0); }
`;

const HomeContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #1f1c2c 0%, #928dab 100%);
    background-size: 200% 200%;
    animation: ${backgroundAnimation} 15s ease infinite;
    color: white;
    text-align: center;
    padding: 20px;
`;

const Card = styled.div`
    background: rgba(0, 0, 0, 0.7);
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    animation: ${fadeIn} 1.5s ease-out, ${float} 3s ease-in-out infinite;
    max-width: 600px;
`;

const Title = styled.h1`
    font-size: 2.5em;
    margin-bottom: 20px;
    font-family: 'Arial', sans-serif;
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
`;

const Text = styled.p`
    font-size: 1.2em;
    font-family: 'Arial', sans-serif;
    color: #dcdcdc;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;

export default Home;
