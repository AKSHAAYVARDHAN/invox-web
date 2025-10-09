
import React from 'react';
// FIX: Use namespace import for react-router-dom to avoid "no exported member" issues.
import * as ReactRouterDOM from 'react-router-dom';
import { HomeIcon, ExploreIcon, SpotlightIcon, CommunityIcon, HubIcon, LogoutIcon, TrendingUpIcon } from '../ui/Icons';
import { useAuth } from '../../contexts/AuthContext';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const navItems = [
    { name: 'Home', path: '/', icon: HomeIcon },
    { name: 'Trendz', path: '/trendz', icon: TrendingUpIcon },
    { name: 'Explore', path: '/explore', icon: ExploreIcon },
    { name: 'Spotlight', path: '/spotlight', icon: SpotlightIcon },
    { name: 'Communities', path: '/communities', icon: CommunityIcon },
    { name: 'Hub', path: '/hub', icon: HubIcon },
];

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const navLinkClasses = "flex items-center space-x-4 px-4 py-3 rounded-md text-invox-light-gray hover:bg-invox-dark-accent hover:text-white transition-colors duration-200";
    const activeLinkClasses = "bg-invox-dark-accent text-white";
    const { currentUser } = useAuth();
    const navigate = ReactRouterDOM.useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            // The AuthProvider will handle navigation via ProtectedRoute
        } catch (error) {
            console.error("Failed to log out", error);
        }
    };

    return (
        <>
            {/* Overlay for mobile */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={toggleSidebar}
            ></div>

            {/* Sidebar */}
            <aside className={`fixed top-0 left-0 h-full bg-invox-dark w-64 p-4 z-40 transform transition-transform md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} border-r border-gray-800 flex flex-col`}>
                <div>
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-invox-red">Invox</h1>
                        <p className="text-sm text-gray-400">Fuel Curiosity</p>
                    </div>
                    <nav>
                        <ul>
                            {navItems.map(item => (
                                <li key={item.name}>
                                    {/* FIX: Use namespace import for react-router-dom to avoid "no exported member" issues. */}
                                    <ReactRouterDOM.NavLink
                                        to={item.path}
                                        className={({ isActive }) => `${navLinkClasses} ${isActive ? activeLinkClasses : ''}`}
                                        onClick={toggleSidebar}
                                    >
                                        <item.icon className="w-6 h-6" />
                                        <span className="font-semibold">{item.name}</span>
                                    </ReactRouterDOM.NavLink>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className="mt-auto">
                    {currentUser && (
                         <div className="px-4 py-3 my-2 border-t border-b border-gray-800">
                             <p className="text-white font-semibold truncate" title={currentUser.email || ''}>{currentUser.displayName || 'User'}</p>
                            <p className="text-sm text-gray-400 truncate" title={currentUser.email || ''}>{currentUser.email}</p>
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        className={`${navLinkClasses} w-full`}
                    >
                        <LogoutIcon className="w-6 h-6" />
                        <span className="font-semibold">Logout</span>
                    </button>
                </div>
            </aside>
        </>
    );
};
