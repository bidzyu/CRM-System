import { Alert } from 'antd';
import React from 'react';

interface MyErrorProps {
  error: string;
  handleRemoveError: () => void;
}

const MyError: React.FC<MyErrorProps> = ({ error, handleRemoveError }) => {
  return (
    <>
      {error && (
        <Alert
          message={error}
          type="error"
          closable
          afterClose={handleRemoveError}
          style={{ marginBottom: 20 }}
        />
      )}
    </>
  );
};

export default MyError;
