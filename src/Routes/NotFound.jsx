import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Kembali ke halaman sebelumnya
  };

  return (
    <div>
      <h1>404 | Not Found</h1>
      <Button data-testid="back" onClick={handleBack}>Back</Button>
    </div>
  );
};

export default NotFound;


