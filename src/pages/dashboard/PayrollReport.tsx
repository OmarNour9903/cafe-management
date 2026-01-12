import { useState } from 'react';
import { format } from 'date-fns';
import { Download, Calculator } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { useStore } from '../../store/useStore';
import { getPayrollPeriod, calculateSalary, formatCurrency } from '../../utils';
import { useTranslation } from '../../utils/i18n';

export const PayrollReport = () => {
    const allEmployees = useStore((state) => state.employees);
    const employees = allEmployees.filter(e => e.isActive);
    const attendance = useStore((state) => state.attendance);
    const { t } = useTranslation();

    // Payroll Cycle State
    const [currentDate] = useState(new Date()); // Could add cycle selector later
    const { start, end } = getPayrollPeriod(currentDate);

    // Calculate Payroll Data
    const payrollData = employees.map(emp => {
        // Filter attendance for this cycle
        const empAttendance = attendance.filter(a =>
            a.employeeId === emp.id &&
            new Date(a.date) >= start &&
            new Date(a.date) <= end
        );

        const totalHours = empAttendance.reduce((sum, record) => sum + (record.totalHours || 0), 0);
        const baseSalary = calculateSalary(totalHours, emp.hourlyRate);

        // Mock transactions/bonuses for now (User asked for it but store has basic support)
        const bonuses = 0;
        const deductions = 0;

        return {
            ...emp,
            totalHours: totalHours.toFixed(2),
            baseSalary,
            netSalary: baseSalary + bonuses - deductions,
            attendanceCount: empAttendance.length
        };
    });

    const totalPayout = payrollData.reduce((sum, p) => sum + p.netSalary, 0);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900">{t('payroll.title')}</h2>
                    <p className="text-slate-500 text-sm mt-1">
                        Cycle: {format(start, 'dd MMM yyyy')} - {format(end, 'dd MMM yyyy')}
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" /> Export
                    </Button>
                    <Button>
                        <Calculator className="w-4 h-4 mr-2" /> Process Payment
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="bg-slate-900 text-white border-slate-800">
                    <p className="text-slate-400 text-sm">{t('payroll.totalPayout')}</p>
                    <h3 className="text-3xl font-bold mt-1">{formatCurrency(totalPayout)}</h3>
                </Card>
            </div>

            <Card noPadding>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">{t('employees.name')}</th>
                                <th className="px-6 py-4">{t('log.totalHours')}</th>
                                <th className="px-6 py-4">{t('employees.hourlyRate')}</th>
                                <th className="px-6 py-4">{t('payroll.days')}</th>
                                <th className="px-6 py-4 text-right">{t('payroll.netSalary')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {payrollData.map((data) => (
                                <tr key={data.id} className="hover:bg-slate-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-slate-900">{data.name}</td>
                                    <td className="px-6 py-4">{data.totalHours} hrs</td>
                                    <td className="px-6 py-4">{formatCurrency(data.hourlyRate)}/hr</td>
                                    <td className="px-6 py-4">{data.attendanceCount}</td>
                                    <td className="px-6 py-4 text-right font-bold text-slate-900">
                                        {formatCurrency(data.netSalary)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};
