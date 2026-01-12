import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('ar-EG', {
        style: 'currency',
        currency: 'EGP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

export function calculateSalary(hours: number, hourlyRate: number): number {
    return Math.round(hours * hourlyRate);
}

export function getPayrollPeriod(currentDate: Date = new Date()): { start: Date, end: Date } {
    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // 0-indexed
    const currentYear = currentDate.getFullYear();

    let start: Date, end: Date;

    if (currentDay >= 10) {
        // Current cycle: 10th of this month to 9th of next month
        // Wait, prompt says: "From 10th to 10th of next month". usually means 10th (start) -> 9th (end)?
        // Or 10th (end of previous) -> 10th (current)?
        // Prompt: "Cycle from day 10 to day 10".
        // Let's assume 10th of Month X is the START. And runs until 9th of Month X+1.
        start = new Date(currentYear, currentMonth, 10);
        end = new Date(currentYear, currentMonth + 1, 9, 23, 59, 59);
    } else {
        // We are in the cycle that started last month
        start = new Date(currentYear, currentMonth - 1, 10);
        end = new Date(currentYear, currentMonth, 9, 23, 59, 59);
    }

    return { start, end };
}
