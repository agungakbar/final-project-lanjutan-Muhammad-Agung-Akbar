import React from 'react';
import { Link as ChakraLink } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <h1>
        <ChakraLink as={ReactLink} to="/" data-testid="home-page">
          Student Portal
        </ChakraLink>
      </h1>
      <ul>
        <li>
          <ChakraLink as={ReactLink} to="/student" data-testid="student-page">
            All Student
          </ChakraLink>
        </li>
        <li>
          <ChakraLink as={ReactLink} to="/add" data-testid="add-page">
            Add Student
          </ChakraLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

