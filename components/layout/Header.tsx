
import React from 'react';
import { MenuIcon, ProfileIcon } from '../ui/Icons';
// FIX: Use namespace import for react-router-dom to avoid "no exported member" issues.
import * as ReactRouterDOM from 'react-router-dom';

interface HeaderProps {
    toggleSidebar: () => void;
    pageTitle: string;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar, pageTitle }) => {
    return (
        <header className="bg-invox-dark-accent sticky top-0 z-30 p-4 flex items-center justify-between md:hidden">
            <button onClick={toggleSidebar} className="text-white">
                <MenuIcon />
            </button>
            <h1 className="text-xl font-bold text-white">{pageTitle}</h1>
            {/* FIX: Use namespace import for react-router-dom to avoid "no exported member" issues. */}
            <ReactRouterDOM.Link to="/profile">
                <ProfileIcon className="w-8 h-8 text-white bg-gray-700 rounded-full p-1" />
            </ReactRouterDOM.Link>
        </header>
    );
};
