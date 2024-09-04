import React from 'react';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="bg-primary text-white p-4 text-center">
      <h1>{title}</h1>
      <button className="btn btn-light mt-3">Click Me</button>
    </header>
  );
};

export default Header;