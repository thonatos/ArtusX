import React from 'react';
import { NavLink } from 'react-router-dom';
import viteLogo from '@/assets/vite.svg';
import reactLogo from '@/assets/react.svg';
import './index.css';

const Side: React.FC<{}> = () => {
  return (
    <>
      <div className="info">
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>

        <h1>Vite + React + PWA</h1>
        <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
      </div>

      <nav className="nav">
        <NavLink
          to="/"
          className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
        >
          Home
        </NavLink>
        <NavLink
          to="/info"
          className={({ isActive, isPending }) => (isPending ? 'pending' : isActive ? 'active' : '')}
        >
          Info
        </NavLink>
      </nav>
    </>
  );
};

export default Side;
