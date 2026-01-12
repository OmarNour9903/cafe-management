import { useState } from 'react';
import { format, subDays, addDays } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useStore } from '../../store/useStore';
import { cn } from '../../utils';
import { useTranslation } from '../../utils/i18n';

export const AttendanceLog = () => {
    const allEmployees = useStore((state) => state.employees);
    const employees = allEmployees.filter(e => e.isActive);
    const attendance = useStore((state) => state.attendance);
    const { t } = useTranslation();

    // In a real app we would have updateAttendance action

    // Local state for date navigation
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));

    const handlePrevDay = () => setSelectedDate(curr => format(subDays(new Date(curr), 1), 'yyyy-MM-dd'));
    const handleNextDay = () => setSelectedDate(curr => format(addDays(new Date(curr), 1), 'yyyy-MM-dd'));

    const getStatusColor = (status?: string) => {
        switch (status) {
            case 'present': return 'bg-green-100 text-green-700';
            case 'late': return 'bg-yellow-100 text-yellow-700';
            case 'absent': return 'bg-red-100 text-red-700';
            default: return 'bg-slate-100 text-slate-500';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-900">{t('log.title')}</h2>

                <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-sm">
                    <button onClick={handlePrevDay} className="p-2 hover:bg-slate-50 rounded-lg text-slate-500">
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div className="flex items-center gap-2 px-2 min-w-[140px] justify-center font-medium text-slate-700">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        {format(new Date(selectedDate), 'EEE, MMM dd')}
                    </div>
                    <button onClick={handleNextDay} className="p-2 hover:bg-slate-50 rounded-lg text-slate-500">
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>

            <Card noPadding>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">{t('employees.name')}</th>
                                <th className="px-6 py-4">{t('log.checkIn')}</th>
                                <th className="px-6 py-4">{t('log.checkOut')}</th>
                                <th className="px-6 py-4">{t('log.totalHours')}</th>
                                <th className="px-6 py-4">{t('log.status')}</th>
                                <th className="px-6 py-4 text-right">{t('employees.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {employees.map((emp) => {
                                const record = attendance.find(a => a.employeeId === emp.id && a.date === selectedDate);
                                return (
                                    <tr key={emp.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">{emp.name}</td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {record?.checkIn ? format(new Date(record.checkIn), 'hh:mm a') : '-'}
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">
                                            {record?.checkOut ? format(new Date(record.checkOut), 'hh:mm a') : '-'}
                                        </td>
                                        <td className="px-6 py-4 font-medium">
                                            {record?.totalHours ? `${record.totalHours} hrs` : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold", getStatusColor(record?.status))}>
                                                {record?.status || 'No Record'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Button variant="ghost" size="sm" disabled>
                                                {t('employees.edit')}
                                            </Button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
