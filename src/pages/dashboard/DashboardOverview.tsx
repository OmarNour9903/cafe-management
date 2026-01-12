
import { format } from 'date-fns';
import { Users, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { useStore } from '../../store/useStore';
import { cn } from '../../utils';
import { useTranslation } from '../../utils/i18n';

export const DashboardOverview = () => {
    const employees = useStore((state) => state.employees);
    // Filter active employees in render to avoid unstable selector
    const activeEmployees = employees.filter(e => e.isActive);
    const attendance = useStore((state) => state.attendance);
    const { t } = useTranslation();

    const today = format(new Date(), 'yyyy-MM-dd');
    const todayRecords = attendance.filter(a => a.date === today);

    const totalEmployees = activeEmployees.length;
    const presentToday = todayRecords.filter(a => a.checkIn).length;
    const completedToday = todayRecords.filter(a => a.checkOut).length;
    const attendanceRate = totalEmployees > 0 ? Math.round((presentToday / totalEmployees) * 100) : 0;

    const stats = [
        {
            label: t('stats.totalEmployees'),
            value: totalEmployees,
            icon: Users,
            color: 'bg-blue-50 text-blue-600',
            sub: `${activeEmployees.filter(e => e.role === 'employee').length} ${t('stats.staff')}`
        },
        {
            label: t('stats.presentToday'),
            value: presentToday,
            icon: CheckCircle,
            color: 'bg-green-50 text-green-600',
            sub: `${attendanceRate}% ${t('stats.attendanceRate')}`
        },
        {
            label: t('stats.completedShifts'),
            value: completedToday,
            icon: Clock,
            color: 'bg-slate-100 text-slate-600',
            sub: `${presentToday - completedToday} ${t('stats.activeNow')}`
        },
        {
            label: t('stats.issues'),
            value: todayRecords.filter(a => a.status === 'late').length,
            icon: AlertCircle,
            color: 'bg-red-50 text-red-600',
            sub: t('stats.requiresAttention')
        }
    ];

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">{t('nav.dashboard')}</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, idx) => (
                    <Card key={idx} className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</h3>
                            <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
                        </div>
                        <div className={cn("p-3 rounded-xl", stat.color)}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                    </Card>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900">{t('dashboard.todaysAttendance')}</h3>
                        <span className="text-sm text-slate-500">{format(new Date(), 'dd MMM yyyy')}</span>
                    </div>
                    {todayRecords.length === 0 ? (
                        <p className="text-sm text-slate-500 py-4 text-center">{t('dashboard.noRecords')}</p>
                    ) : (
                        <div className="space-y-3">
                            {todayRecords.map(record => {
                                const emp = activeEmployees.find(e => e.id === record.employeeId);
                                if (!emp) return null;
                                return (
                                    <div key={record.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">
                                                {emp.name.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-900">{emp.name}</p>
                                                <p className="text-xs text-slate-500">
                                                    In: {format(new Date(record.checkIn!), 'hh:mm a')}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-end">
                                            <span className={cn(
                                                "text-xs font-semibold px-2 py-1 rounded-full",
                                                record.checkOut ? "bg-slate-200 text-slate-600" : "bg-green-100 text-green-700"
                                            )}>
                                                {record.checkOut ? 'Completed' : 'Active'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </Card>

                {/* Placeholder for Quick Actions or Recent Activity */}
                <Card>
                    <h3 className="font-semibold text-slate-900 mb-4">Quick Actions</h3>
                    <div className="space-y-2">
                        <p className="text-sm text-slate-500">Add logic for quick actions like "Add Employee" or "View Payroll".</p>
                    </div>
                </Card>
            </div>
        </div>
    );
};
