export interface Employee {
    id: string;
    name: string;
    role: 'owner' | 'employee';
    hourlyRate: number; // E.g. 50 (EGP/hour)
    startDate: string; // ISO Date
    isActive: boolean;
}

export interface AttendanceRecord {
    id: string;
    employeeId: string;
    date: string; // YYYY-MM-DD
    checkIn: string | null; // ISO DateTime
    checkOut: string | null; // ISO DateTime
    status: 'present' | 'absent' | 'late' | 'pending';
    totalHours: number; // Calculated hours
}

export interface Transaction {
    id: string;
    employeeId: string;
    date: string; // ISO DateTime
    type: 'bonus' | 'deduction';
    amount: number;
    reason: string;
}

export interface AppSettings {
    payrollDay: number; // Default 10
    ownerPasscode: string; // '225599'
    shiftDuration: number; // 8 hours
    theme: 'light' | 'dark';
    language: 'ar' | 'en';
}
