import React from "react";
import { Link } from 'react-router-dom';
import { Button } from "@chakra-ui/react";

const Home = () => {
    return (
        <div className="home-container">
            <h1 className="home-title">Welcome to Student Portal Fellas!</h1>
            <Button as={Link} to="/student" colorScheme="blue" data-testid="student-btn">
                All Student
            </Button>
        </div>
    );
};

export default Home;
