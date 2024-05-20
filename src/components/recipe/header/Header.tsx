import React from 'react';
import './Header.css';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className='product-name'>
      <h1>{title}</h1>
    </div>
  );
};

export default Header;
