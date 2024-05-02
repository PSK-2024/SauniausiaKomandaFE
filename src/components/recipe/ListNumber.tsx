import React from 'react';

interface ListNumberProps {
  number: number;
}

const ListNumber: React.FC<ListNumberProps> = ({ number }) => {
  return <div className='list-number'>{number}</div>;
};

export default ListNumber;
