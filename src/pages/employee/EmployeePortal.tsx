import { useState } from 'react';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Clock, LogOut, CheckCircle, XCircle, User } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useStore } from '../../store/useStore';
import { cn } from '../../utils';
import { useTranslation } from '../../utils/i18n';
import { LanguageToggle } from '../../components/ui/LanguageToggle';

export const EmployeePortal = () => {
    const navigate = useNavigate();
    const allEmployees = useStore((state) => state.employees);
    const employees = allEmployees.filter(e => e.isActive);
    const clockIn = useStore((state) => state.clockIn);
    const clockOut = useStore((state) => state.clockOut);
    const getAttendance = useStore((state) => state.getAttendanceForDate);
    const { t } = useTranslation();

    const [selectedEmployeeId, setSelectedEmployeeId] = useState<string>('');
    const [view, setView] = useState<'select' | 'action'>('select');

    const today = format(new Date(), 'yyyy-MM-dd');
    const currentRecord = selectedEmployeeId ? getAttendance(selectedEmployeeId, today) : undefined;
    const employee = employees.find(e => e.id === selectedEmployeeId);

    const handleEmployeeSelect = (id: string) => {
        setSelectedEmployeeId(id);
        setView('action');
    };

    const handleClockIn = () => {
        if (selectedEmployeeId) {
            clockIn(selectedEmployeeId);
        }
    };

    const handleClockOut = () => {
        if (selectedEmployeeId) {
            clockOut(selectedEmployeeId);
        }
    };

    if (view === 'select') {
        return (
            <div className="min-h-screen bg-slate-50 p-4 flex flex-col items-center justify-center relative">
                <div className="absolute top-4 right-4">
                    <LanguageToggle />
                </div>
                <div className="w-full max-w-md space-y-6">
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg mb-6">
                            <Clock className="w-8 h-8" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">{t('landing.employeePortal')}</h1>
                        <p className="text-slate-500">{t('Portal.loginMsg')}</p>
                    </div>

                    <Card className="max-h-[60vh] overflow-y-auto">
                        <div className="space-y-2">
                            {employees.map((emp) => (
                                <button
                                    key={emp.id}
                                    onClick={() => handleEmployeeSelect(emp.id)}
                                    className="w-full p-4 flex items-center justify-between hover:bg-slate-50 rounded-xl transition-colors border border-transparent hover:border-slate-200 group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold group-hover:bg-white group-hover:shadow-sm transition-all">
                                            {emp.name.substring(0, 2).toUpperCase()}
                                        </div>
                                        <span className="font-medium text-slate-900">{emp.name}</span>
                                    </div>
                                    <div className={`w-2 h-2 rounded-full ${getAttendance(emp.id, today)?.checkIn && !getAttendance(emp.id, today)?.checkOut
                                            ? 'bg-green-500'
                                            : 'bg-slate-300'
                                        }`} />
                                </button>
                            ))}
                        </div>
                    </Card>

                    <Button variant="ghost" className="w-full" onClick={() => navigate('/')}>
                        <LogOut className="w-4 h-4 mr-2" /> {t('common.back')}
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 p-4 flex flex-col items-center justify-center relative">
            <div className="absolute top-4 right-4">
                <LanguageToggle />
            </div>
            <div className="w-full max-w-md space-y-6">
                <Card className="text-center p-8 space-y-6">
                    <div className="flex justify-between items-start">
                        <Button variant="ghost" size="sm" onClick={() => setView('select')}>
                            <LogOut className="w-4 h-4 mr-2" /> {t('common.back')}
                        </Button>
                        <div className="text-right">
                            <h2 className="font-bold text-slate-900 flex items-center justify-end gap-2">
                                {employee?.name} <User className="w-4 h-4 text-slate-400" />
                            </h2>
                            <p className="text-sm text-slate-500">{format(new Date(), 'EEEE, MMMM dd')}</p>
                        </div>
                    </div>

                    <div className="py-8">
                        <div className="text-6xl font-bold text-slate-900 tracking-tight font-mono">
                            {format(new Date(), 'HH:mm')}
                        </div>
                        <p className="text-slate-500 mt-2">{t('portal.currentTime')}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className={cn(
                            "p-4 rounded-2xl border transition-all",
                            currentRecord?.checkIn
                                ? "bg-green-50 border-green-200 text-green-700"
                                : "bg-slate-50 border-slate-100 text-slate-400"
                        )}>
                            <p className="text-sm font-medium mb-1">{t('log.checkIn')}</p>
                            <p className="text-lg font-bold">
                                {currentRecord?.checkIn ? format(new Date(currentRecord.checkIn), 'hh:mm a') : '--:--'}
                            </p>
                        </div>
                        <div className={cn(
                            "p-4 rounded-2xl border transition-all",
                            currentRecord?.checkOut
                                ? "bg-blue-50 border-blue-200 text-blue-700"
                                : "bg-slate-50 border-slate-100 text-slate-400"
                        )}>
                            <p className="text-sm font-medium mb-1">{t('log.checkOut')}</p>
                            <p className="text-lg font-bold">
                                {currentRecord?.checkOut ? format(new Date(currentRecord.checkOut), 'hh:mm a') : '--:--'}
                            </p>
                        </div>
                    </div>

                    {!currentRecord?.checkIn ? (
                        <Button
                            size="lg"
                            className="w-full h-16 text-lg bg-green-600 hover:bg-green-700 shadow-green-200 shadow-xl"
                            onClick={handleClockIn}
                        >
                            <CheckCircle className="w-6 h-6 mr-2" /> {t('log.checkIn')}
                        </Button>
                    ) : !currentRecord.checkOut ? (
                        <Button
                            size="lg"
                            className="w-full h-16 text-lg bg-red-600 hover:bg-red-700 shadow-red-200 shadow-xl"
                            onClick={handleClockOut}
                        >
                            <XCircle className="w-6 h-6 mr-2" /> {t('log.checkOut')}
                        </Button>
                    ) : (
                        <div className="p-4 bg-blue-50 text-blue-700 rounded-xl font-medium border border-blue-100">
                            {t('portal.shiftCompleted')}
                        </div>
                    )}
                </Card>
            </div>
        </div>
    );
};
