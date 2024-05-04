import React from 'react';
import './StepNumber.css';

interface ListNumberProps {
  number: number;
}

const StepNumber: React.FC<ListNumberProps> = ({ number }) => {
  return <div className='list-number'>{number}</div>;
};

export default StepNumber;
