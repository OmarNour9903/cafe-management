
import { NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Calendar, ClipboardList, LogOut } from 'lucide-react';
import { cn } from '../../utils';
import { useTranslation } from '../../utils/i18n';
import { LanguageToggle } from '../ui/LanguageToggle';

export const Sidebar = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const links = [
        { to: '/dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
        { to: '/dashboard/employees', icon: Users, label: t('nav.employees') },
        { to: '/dashboard/attendance', icon: ClipboardList, label: t('nav.attendance') },
        { to: '/dashboard/payroll', icon: Calendar, label: t('nav.payroll') },
    ];

    const handleLogout = () => {
        // Implement logout logic here if needed
        navigate('/');
    };

    return (
        <aside className="hidden md:flex md:w-64 md:flex-col fixed inset-y-0 start-0 bg-white border-e border-slate-200">
            <div className="flex h-16 items-center px-6 border-b border-slate-100">
                <h1 className="text-xl font-bold text-slate-900 tracking-tight">
                    Nizami <span className="text-blue-600">HR</span>
                </h1>
            </div>

            <div className="flex flex-col flex-1 overflow-y-auto px-4 py-6">
                <div className="mt-8 flex flex-col gap-2">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            end={link.to === '/dashboard'}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-blue-50 text-blue-700"
                                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                            )}
                        >
                            <link.icon className="w-5 h-5" />
                            {link.label}
                        </NavLink>
                    ))}
                </div>

                <div className="mt-auto pt-6 border-t border-slate-100 space-y-4">
                    <div className="px-3">
                        <LanguageToggle />
                    </div>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-5 h-5 rtl:mirror" />
                        {t('nav.logout')}
                    </button>
                </div>
            </div>
        </aside>
    );
};
