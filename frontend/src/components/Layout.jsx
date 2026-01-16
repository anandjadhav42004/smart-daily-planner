import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Toaster } from 'react-hot-toast';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans selection:bg-primary-500/30">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-600/20 rounded-full blur-[128px]" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[128px]" />
            </div>

            <Sidebar />
            <Topbar />

            <main className="ml-72 p-8 pt-4 relative z-10">
                {children}
            </main>

            <Toaster
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: 'rgba(15, 23, 42, 0.8)',
                        backdropFilter: 'blur(12px)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: '#fff',
                        borderRadius: '12px',
                    }
                }}
            />
        </div>
    );
};

export default Layout;
