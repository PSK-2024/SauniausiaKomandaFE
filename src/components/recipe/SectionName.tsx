import React from 'react';

interface SectionNameProps {
  name: string;
}

const SectionName: React.FC<SectionNameProps> = ({ name }) => {
  return (
    <div className='section-name-container'>
      <p className='section-name'>{name}</p>
    </div>
  );
};

export default SectionName;
