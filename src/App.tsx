import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { EmployeePortal } from './pages/employee/EmployeePortal';
import { AppLayout } from './components/layout/AppLayout';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { EmployeeList } from './pages/dashboard/EmployeeList';
import { AttendanceLog } from './pages/dashboard/AttendanceLog';
import { PayrollReport } from './pages/dashboard/PayrollReport';
import { useStore } from './store/useStore';

function App() {
  const seedData = useStore((state) => state.seedData);

  useEffect(() => {
    seedData();
  }, [seedData]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/portal" element={<EmployeePortal />} />

        {/* Protected Owner Routes */}
        <Route path="/dashboard" element={<AppLayout />}>
          <Route index element={<DashboardOverview />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="attendance" element={<AttendanceLog />} />
          <Route path="payroll" element={<PayrollReport />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
