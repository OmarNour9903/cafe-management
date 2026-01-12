import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Employee, AttendanceRecord, Transaction, AppSettings } from '../types';
import { format } from 'date-fns';

// Simple UUID generator if uuid package not installed (we didn't install uuid, using simple math random for now or add uuid dep)
// Recommended to add uuid, but for now I'll use crypto.randomUUID if available or simple function
const generateId = () => crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 9);

interface AppState {
    employees: Employee[];
    attendance: AttendanceRecord[];
    transactions: Transaction[];
    settings: AppSettings;

    // Actions
    addEmployee: (employee: Omit<Employee, 'id'>) => void;
    updateEmployee: (id: string, data: Partial<Employee>) => void;
    deleteEmployee: (id: string) => void;

    clockIn: (employeeId: string) => void;
    clockOut: (employeeId: string) => void;
    getAttendanceForDate: (employeeId: string, date: string) => AttendanceRecord | undefined;

    addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
    setLanguage: (lang: 'ar' | 'en') => void;
    seedData: () => void;
}

export const useStore = create<AppState>()(
    persist(
        (set, get) => ({
            employees: [],
            attendance: [],
            transactions: [],
            settings: {
                payrollDay: 10,
                ownerPasscode: '225599',
                shiftDuration: 8,
                theme: 'light',
                language: 'ar',
            },

            addEmployee: (employee) => set((state) => ({
                employees: [...state.employees, { ...employee, id: crypto.randomUUID() }]
            })),

            updateEmployee: (id, updates) => set((state) => ({
                employees: state.employees.map(e => e.id === id ? { ...e, ...updates } : e)
            })),

            deleteEmployee: (id) => set((state) => ({
                employees: state.employees.filter(e => e.id !== id)
            })),

            clockIn: (employeeId) => set((state) => {
                const today = format(new Date(), 'yyyy-MM-dd');
                // Check if already checked in today
                const existing = state.attendance.find(a => a.employeeId === employeeId && a.date === today);
                if (existing) return state; // Already exists

                const newRecord: AttendanceRecord = {
                    id: generateId(),
                    employeeId,
                    date: today,
                    checkIn: new Date().toISOString(),
                    checkOut: null,
                    status: 'pending',
                    totalHours: 0,
                };
                return { attendance: [...state.attendance, newRecord] };
            }),

            clockOut: (employeeId) => set((state) => {
                const today = format(new Date(), 'yyyy-MM-dd');
                return {
                    attendance: state.attendance.map(a => {
                        if (a.employeeId === employeeId && a.date === today && !a.checkOut) {
                            const checkOutTime = new Date();
                            const checkInTime = new Date(a.checkIn!);
                            const diffMs = checkOutTime.getTime() - checkInTime.getTime();
                            const hours = diffMs / (1000 * 60 * 60);

                            return {
                                ...a,
                                checkOut: checkOutTime.toISOString(),
                                status: hours >= 8 ? 'present' : (hours > 6 ? 'present' : 'late'), // Simple logic for now
                                totalHours: parseFloat(hours.toFixed(2)),
                            };
                        }
                        return a;
                    })
                };
            }),

            getAttendanceForDate: (employeeId, date) => {
                return get().attendance.find(a => a.employeeId === employeeId && a.date === date);
            },

            addTransaction: (transaction) => set((state) => ({
                transactions: [...state.transactions, {
                    ...transaction,
                    id: crypto.randomUUID(),
                    date: new Date().toISOString()
                }]
            })),

            setLanguage: (lang) => set((state) => ({
                settings: { ...state.settings, language: lang }
            })),

            seedData: () => set((state) => {
                if (state.employees.length > 0) return state;
                return {
                    employees: [
                        { id: '1', name: 'Al-Hassan', role: 'employee', hourlyRate: 40, startDate: new Date().toISOString(), isActive: true },
                        { id: '2', name: 'Omar', role: 'employee', hourlyRate: 50, startDate: new Date().toISOString(), isActive: true },
                        { id: '3', name: 'Khaled', role: 'employee', hourlyRate: 45, startDate: new Date().toISOString(), isActive: true },
                    ]
                };
            })
        }),
        {
            name: 'nizami-db',
            storage: createJSONStorage(() => localStorage),
        }
    )
);
