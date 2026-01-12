import { useStore } from '../store/useStore';

export const dictionary: Record<string, { ar: string; en: string }> = {
    // Landing Page
    'landing.businessOwner': { ar: 'صاحب العمل', en: 'Business Owner' },
    'landing.employeePortal': { ar: 'بوابة الموظف', en: 'Employee Portal' },
    'landing.accessDashboard': { ar: 'الدخول للوحة التحكم', en: 'Access Dashboard' },
    'landing.recordAttendance': { ar: 'تسجيل الحضور والانصراف', en: 'Record Attendance' },
    'landing.enterPasscode': { ar: 'أدخل رمز الدخول', en: 'Enter Passcode' },
    'landing.login': { ar: 'دخول', en: 'Login' },
    'landing.cancel': { ar: 'إلغاء', en: 'Cancel' },

    // Sidebar
    'nav.dashboard': { ar: 'الرئيسية', en: 'Dashboard' },
    'nav.employees': { ar: 'الموظفين', en: 'Employees' },
    'nav.attendance': { ar: 'سجل الحضور', en: 'Attendance' },
    'nav.payroll': { ar: 'الرواتب', en: 'Payroll' },
    'nav.logout': { ar: 'خروج', en: 'Logout' },

    // Dashboard Overview
    'stats.totalEmployees': { ar: 'إجمالي الموظفين', en: 'Total Employees' },
    'stats.presentToday': { ar: 'حضور اليوم', en: 'Present Today' },
    'stats.completedShifts': { ar: 'ورديات مكتملة', en: 'Completed Shifts' },
    'stats.issues': { ar: 'تنبيهات / تأخير', en: 'Issues / Late' },
    'stats.attendanceRate': { ar: 'نسبة الحضور', en: 'Attendance Rate' },
    'stats.activeNow': { ar: 'نشط الآن', en: 'Active Now' },
    'stats.staff': { ar: 'موظف', en: 'Staff' },
    'stats.requiresAttention': { ar: 'يحتاج انتباه', en: 'Requires Attention' },
    'dashboard.todaysAttendance': { ar: 'حضور اليوم', en: "Today's Attendance" },
    'dashboard.noRecords': { ar: 'لا يوجد سجلات حضور اليوم حتى الآن.', en: 'No attendance records for today yet.' },

    // Employee List
    'employees.title': { ar: 'الموظفين', en: 'Employees' },
    'employees.add': { ar: 'إضافة موظف', en: 'Add Employee' },
    'employees.search': { ar: 'بحث...', en: 'Search...' },
    'employees.name': { ar: 'الاسم', en: 'Name' },
    'employees.hourlyRate': { ar: 'سعر الساعة', en: 'Hourly Rate' },
    'employees.startDate': { ar: 'تاريخ البدء', en: 'Start Date' },
    'employees.actions': { ar: 'إجراءات', en: 'Actions' },
    'employees.noEmployees': { ar: 'لم يتم العثور على موظفين.', en: 'No employees found.' },
    'employees.edit': { ar: 'تعديل موظف', en: 'Edit Employee' },
    'employees.save': { ar: 'حفظ التغييرات', en: 'Save Changes' },
    'employees.create': { ar: 'إنشاء موظف', en: 'Create Employee' },

    // Portal
    'Portal.loginMsg': { ar: 'اختر اسمك لتسجيل الحضور', en: 'Select your name to record attendance' },
    'portal.currentTime': { ar: 'التوقيت المحلي', en: 'Current Local Time' },
    'portal.shiftCompleted': { ar: 'تم تسجيل الانصراف اليوم', en: 'Shift Completed Today' },

    // Attendance Log
    'log.title': { ar: 'سجل الحضور', en: 'Attendance Log' },
    'log.checkIn': { ar: 'حضور', en: 'Check In' },
    'log.checkOut': { ar: 'انصراف', en: 'Check Out' },
    'log.totalHours': { ar: 'ساعات العمل', en: 'Total Hours' },
    'log.status': { ar: 'الحالة', en: 'Status' },

    // Payroll
    'payroll.title': { ar: 'تقرير الرواتب', en: 'Payroll Report' },
    'payroll.totalPayout': { ar: 'إجمالي الرواتب', en: 'Total Payout' },
    'payroll.netSalary': { ar: 'صافي الراتب', en: 'Net Salary' },
    'payroll.days': { ar: 'أيام', en: 'Days' },

    // Common
    'common.back': { ar: 'رجوع', en: 'Back' },
    'common.date': { ar: 'التاريخ', en: 'Date' }
};

export const useTranslation = () => {
    const language = useStore((state) => state.settings.language);

    const t = (key: string) => {
        return dictionary[key]?.[language] || key;
    };

    return { t, language, isRTL: language === 'ar' };
};
