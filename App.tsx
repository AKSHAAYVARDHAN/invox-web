import React, { useState, useMemo } from 'react';
// FIX: Use namespace import for react-router-dom to avoid "no exported member" issues.
import * as ReactRouterDOM from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import HomePage from './pages/Home';
import ExplorePage from './pages/Explore';
import SpotlightPage from './pages/Spotlight';
import TrendzPage from './pages/Trendz';
import CommunitiesPage from './pages/Communities';
import ComingSoonPage from './pages/ComingSoon';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import { AIAssistantButton } from './components/ui/AIAssistant';
import { AuthProvider, useAuth } from './contexts/AuthContext';


const pageTitles: { [key: string]: string } = {
    '/': 'Home',
    '/trendz': 'Trendz',
    '/explore': 'Explore',
    '/spotlight': 'Spotlight',
    '/communities': 'Communities',
    '/hub': 'Hub',
    '/profile': 'Profile'
};


const ProtectedLayout = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const location = ReactRouterDOM.useLocation();
    
    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);
    
    const pageTitle = useMemo(() => {
        if (location.pathname.startsWith('/communities')) {
            // This logic can be expanded to show different titles for different community views
            return 'Communities';
        }
        return pageTitles[location.pathname] || 'Invox';
    }, [location.pathname]);

    return (
        <div className="min-h-screen flex">
            <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 md:ml-64 flex flex-col">
                <Header toggleSidebar={toggleSidebar} pageTitle={pageTitle} />
                <main className="flex-grow bg-invox-dark">
                    <ReactRouterDOM.Outlet />
                </main>
            </div>
            <AIAssistantButton />
        </div>
    );
};

const AppRoutes = () => {
    const { currentUser, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-invox-dark">
                <div className="w-16 h-16 border-4 border-invox-red border-dashed rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <ReactRouterDOM.Routes>
            <ReactRouterDOM.Route path="/login" element={!currentUser ? <LoginPage /> : <ReactRouterDOM.Navigate to="/" />} />
            <ReactRouterDOM.Route path="/signup" element={!currentUser ? <SignupPage /> : <ReactRouterDOM.Navigate to="/" />} />
            
            <ReactRouterDOM.Route path="/*" element={currentUser ? <MainAppRoutes /> : <ReactRouterDOM.Navigate to="/login" />} />
        </ReactRouterDOM.Routes>
    );
};

const MainAppRoutes = () => (
    <ReactRouterDOM.Routes>
        <ReactRouterDOM.Route element={<ProtectedLayout />}>
            <ReactRouterDOM.Route path="/" element={<HomePage />} />
            <ReactRouterDOM.Route path="/trendz" element={<TrendzPage />} />
            <ReactRouterDOM.Route path="/explore" element={<ExplorePage />} />
            <ReactRouterDOM.Route path="/spotlight" element={<SpotlightPage />} />
            <ReactRouterDOM.Route path="/communities" element={<CommunitiesPage />} />
            <ReactRouterDOM.Route path="/hub" element={<ComingSoonPage pageName="Hub" />} />
            <ReactRouterDOM.Route path="/profile" element={<ComingSoonPage pageName="Profile" />} />
            <ReactRouterDOM.Route path="*" element={<ReactRouterDOM.Navigate to="/" />} />
        </ReactRouterDOM.Route>
    </ReactRouterDOM.Routes>
)


function App() {
  return (
    // FIX: Use namespace import for react-router-dom to avoid "no exported member" issues.
    <ReactRouterDOM.HashRouter>
        <AuthProvider>
            <AppRoutes />
        </AuthProvider>
    </ReactRouterDOM.HashRouter>
  );
}

export default App;