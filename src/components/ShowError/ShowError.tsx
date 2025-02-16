import { message } from 'antd';
import { useEffect } from 'react';

interface ShowErrorProps {
  error: string | undefined;
  removeError: () => void;
}
//
const ShowError: React.FC<ShowErrorProps> = ({ error, removeError }) => {
  useEffect(() => {
    if (error) {
      message.error(error).then(removeError);
    }
  }, [error]);

  return null;
};

export default ShowError;
