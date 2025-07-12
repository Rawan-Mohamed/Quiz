import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useNavigate, Link } from "react-router-dom";
import styles from "./SideBar.module.css";
import "tailwindcss/tailwind.css";

import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from '../../Redux/Features/Auth/LogoutSlice';
import { AppDispatch, RootState } from '../../Redux/Store';

interface SideBarProps {
  onClose?: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onClose }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const navigate = useNavigate();

  // Fetching user role from Redux store
  const userRole = useSelector((state: RootState) => state.users.role);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  const handleMenuItemClick = () => {
    // Close sidebar on mobile when menu item is clicked
    if (onClose) {
      onClose();
    }
  };

  return (
    <div className="h-full bg-white dark:bg-neutral-800 border-r border-neutral-200 dark:border-neutral-700">
      <Sidebar 
        collapsed={isCollapsed} 
        className="bg-white dark:bg-neutral-800 border-none"
        width="320px"
        collapsedWidth="80px"
      >
        {userRole && (
          <Menu className="bg-white dark:bg-neutral-800">
            {/* Header with toggle button */}
            <MenuItem
              className="h-16 border-b border-neutral-200 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-colors"
              onClick={handleToggle}
            >
              <div className="flex items-center justify-center w-full">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  {!isCollapsed && (
                    <span className="font-semibold text-lg text-neutral-900 dark:text-neutral-100">
                      QuizWiz
                    </span>
                  )}
                </div>
              </div>
            </MenuItem>

            {/* Dashboard */}
            <MenuItem
              className="hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              icon={
                <div className="w-6 h-6 text-neutral-600 dark:text-neutral-300">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                  </svg>
                </div>
              }
              component={<Link to="/dashboard" onClick={handleMenuItemClick} />}
            >
              {!isCollapsed && (
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">Dashboard</span>
              )}
            </MenuItem>

            {/* Instructor-specific menu items */}
            {userRole === "Instructor" && (
              <>
                <MenuItem
                  className="hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  icon={
                    <div className="w-6 h-6 text-neutral-600 dark:text-neutral-300">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                      </svg>
                    </div>
                  }
                  component={<Link to="/dashboard/students" onClick={handleMenuItemClick} />}
                >
                  {!isCollapsed && (
                    <span className="text-neutral-700 dark:text-neutral-300 font-medium">Students</span>
                  )}
                </MenuItem>

                <MenuItem
                  className="hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                  icon={
                    <div className="w-6 h-6 text-neutral-600 dark:text-neutral-300">
                      <svg fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                  }
                  component={<Link to="/dashboard/groups" onClick={handleMenuItemClick} />}
                >
                  {!isCollapsed && (
                    <span className="text-neutral-700 dark:text-neutral-300 font-medium">Groups</span>
                  )}
                </MenuItem>
              </>
            )}

            {/* Quizzes - different for Instructor and Student */}
            <MenuItem
              className="hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              icon={
                <div className="w-6 h-6 text-neutral-600 dark:text-neutral-300">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              }
              component={
                <Link 
                  to={userRole === "Instructor" ? "/dashboard/quizzes" : "/dashboard/learnerquiz"} 
                  onClick={handleMenuItemClick} 
                />
              }
            >
              {!isCollapsed && (
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">Quizzes</span>
              )}
            </MenuItem>

            {/* Results */}
            <MenuItem
              className="hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
              icon={
                <div className="w-6 h-6 text-neutral-600 dark:text-neutral-300">
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z" />
                    <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z" />
                  </svg>
                </div>
              }
              component={<Link to="/dashboard/results" onClick={handleMenuItemClick} />}
            >
              {!isCollapsed && (
                <span className="text-neutral-700 dark:text-neutral-300 font-medium">Results</span>
              )}
            </MenuItem>

            {/* Settings section */}
            <div className="mt-auto pt-4 border-t border-neutral-200 dark:border-neutral-700">
              <MenuItem
                className="hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors"
                icon={
                  <div className="w-6 h-6 text-neutral-600 dark:text-neutral-300">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                }
                component={<Link to="/change-password" onClick={handleMenuItemClick} />}
              >
                {!isCollapsed && (
                  <span className="text-neutral-700 dark:text-neutral-300 font-medium">Settings</span>
                )}
              </MenuItem>

              <MenuItem
                className="hover:bg-error-50 dark:hover:bg-error-900/20 transition-colors"
                icon={
                  <div className="w-6 h-6 text-error-600 dark:text-error-400">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                }
                onClick={handleLogout}
              >
                {!isCollapsed && (
                  <span className="text-error-600 dark:text-error-400 font-medium">Logout</span>
                )}
              </MenuItem>
            </div>
          </Menu>
        )}
      </Sidebar>
    </div>
  );
};

export default SideBar;
