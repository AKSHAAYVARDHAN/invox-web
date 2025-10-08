
import React from 'react';
import { auth } from '../../services/firebaseConfig';
import { HomeIcon, CompassIcon, UsersIcon, BellIcon, MailIcon, UserIcon, LogOutIcon } from '../common/Icons';

interface SidebarProps {
  onLogout: () => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: string; active?: boolean }> = ({ icon, label, active = false }) => (
  <a href="#" className={`flex items-center space-x-4 p-3 rounded-lg transition-colors duration-200 ${active ? 'bg-invox-red text-white' : 'hover:bg-invox-gray'}`}>
    {icon}
    <span className="font-semibold text-lg">{label}</span>
  </a>
);

const Sidebar: React.FC<SidebarProps> = ({ onLogout }) => {
  const user = auth.currentUser;

  return (
    <aside className="w-1/5 bg-invox-dark border-r border-invox-gray p-6 flex flex-col justify-between min-h-screen sticky top-0">
      <div>
        <h1 className="text-3xl font-bold text-invox-red mb-12">Invox</h1>
        <nav className="space-y-4">
          <NavItem icon={<HomeIcon />} label="Home" active />
          <NavItem icon={<CompassIcon />} label="Explore" />
          <NavItem icon={<UsersIcon />} label="Communities" />
          <NavItem icon={<BellIcon />} label="Notifications" />
          <NavItem icon={<MailIcon />} label="Messages" />
          <NavItem icon={<UserIcon />} label="Profile" />
        </nav>
      </div>
      
      {user && (
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-invox-gray rounded-full flex items-center justify-center">
            <UserIcon />
          </div>
          <div className="flex-1">
            <p className="font-semibold">{user.email?.split('@')[0]}</p>
            <p className="text-sm text-invox-light-gray">{user.email}</p>
          </div>
          <button onClick={onLogout} className="p-2 rounded-full hover:bg-invox-gray text-invox-light-gray hover:text-white transition-colors">
            <LogOutIcon />
          </button>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
