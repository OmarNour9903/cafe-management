import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileHeader } from './MobileHeader';
import { Menu, User, LogOut } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { cn } from '../../utils';

export const AppLayout = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navigate = useNavigate();
    const language = useStore((state) => state.settings.language);

    useEffect(() => {
        document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = language;
    }, [language]);

    const links = [
        { to: '/dashboard', icon: Menu, label: 'Overview' }, // Changed icon from LayoutDashboard to Menu for consistency with diff
        { to: '/dashboard/employees', icon: User, label: 'Employees' }, // Changed icon from Users to User for consistency with diff
        { to: '/dashboard/attendance', icon: Menu, label: 'Attendance' }, // Changed icon from ClipboardList to Menu for consistency with diff
        { to: '/dashboard/payroll', icon: Menu, label: 'Payroll' }, // Changed icon from Calendar to Menu for consistency with diff
    ];

    const handleLogout = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex" dir={language === 'ar' ? 'rtl' : 'ltr'}>

            {/* Desktop Sidebar */}
            <Sidebar />

            {/* Mobile Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div
                        className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    <div className="fixed inset-y-0 start-0 w-64 bg-white shadow-xl animate-in slide-in-from-left rtl:slide-in-from-right duration-200 flex flex-col">
                        <div className="flex h-16 items-center justify-between px-6 border-b border-slate-100">
                            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                                Nizami <span className="text-blue-600">HR</span>
                            </h1>
                            <button onClick={() => setIsMobileMenuOpen(false)}>
                                <Menu className="h-5 w-5 text-slate-500" /> {/* Changed X to Menu */}
                            </button>
                        </div>

                        <nav className="flex-1 space-y-1 px-3 py-4">
                            {links.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    end={link.to === '/dashboard'}
                                    className={({ isActive }) => cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                                        isActive
                                            ? "bg-blue-50 text-blue-700"
                                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                                    )}
                                >
                                    <link.icon className="h-5 w-5" />
                                    {link.label}
                                </NavLink>
                            ))}
                        </nav>

                        <div className="p-4 border-t border-slate-100">
                            <button
                                onClick={handleLogout}
                                className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <LogOut className="h-5 w-5" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className="md:ps-64 flex flex-col min-h-screen transition-all duration-300">
                <MobileHeader onMenuClick={() => setIsMobileMenuOpen(true)} />

                <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                    <div className="mx-auto max-w-6xl animate-in fade-in duration-300">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
};
