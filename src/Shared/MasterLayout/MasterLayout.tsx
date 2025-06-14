import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar/SideBar';
import NavBar from '../NavBar/NavBar';

const MasterLayout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    // Persist dark mode preference
    return localStorage.getItem('darkMode') === 'true';
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  return (
    <div className={`flex h-screen ${darkMode ? 'dark' : ''}`}>
      <button
        className="fixed top-4 right-4 z-50 px-3 py-1 rounded bg-gray-200 dark:bg-gray-800 text-black dark:text-white shadow"
        onClick={() => setDarkMode((prev) => !prev)}
        aria-label="Toggle dark mode"
      >
        {darkMode ? '🌙 Dark' : '☀️ Light'}
      </button>
      <div className="flex-3" style={{backgroundColor: darkMode ? '#18181b' : '#fbfbfb', borderRight: '1px solid #ccc'}}>
        {/* Sidebar on the left */}
        <div>
          <SideBar />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        {/* Navbar at the top */}
        <div className="col-12 p-0">
          <NavBar />
        </div>
        {/* Main content area */}
        <div className="content-container flex-1 overflow-y-auto my-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MasterLayout;

