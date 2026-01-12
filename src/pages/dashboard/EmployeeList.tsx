import { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { useStore } from '../../store/useStore';
import { useTranslation } from '../../utils/i18n';
import type { Employee } from '../../types';

export const EmployeeList = () => {
    const employees = useStore((state) => state.employees);
    // Filter active employees
    const activeEmployees = employees.filter(e => e.isActive);
    const addEmployee = useStore((state) => state.addEmployee);
    const updateEmployee = useStore((state) => state.updateEmployee);
    const deleteEmployee = useStore((state) => state.deleteEmployee);
    const { t } = useTranslation();

    const [search, setSearch] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        hourlyRate: '',
    });

    const filteredEmployees = activeEmployees.filter(e =>
        e.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleSubmit = () => {
        if (!formData.name || !formData.hourlyRate) return;

        const rate = parseFloat(formData.hourlyRate);

        if (editingEmployee) {
            updateEmployee(editingEmployee.id, {
                name: formData.name,
                hourlyRate: rate,
            });
        } else {
            addEmployee({
                name: formData.name,
                role: 'employee',
                hourlyRate: rate,
                startDate: new Date().toISOString(),
                isActive: true,
            });
        }
        closeModal();
    };

    const openModal = (employee?: Employee) => {
        if (employee) {
            setEditingEmployee(employee);
            setFormData({ name: employee.name, hourlyRate: employee.hourlyRate.toString() });
        } else {
            setEditingEmployee(null);
            setFormData({ name: '', hourlyRate: '' });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingEmployee(null);
        setFormData({ name: '', hourlyRate: '' });
    };

    const handleDelete = (id: string) => {
        if (confirm('Are you sure you want to delete this employee?')) {
            deleteEmployee(id);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold text-slate-900">{t('employees.title')}</h2>
                <Button onClick={() => openModal()}>
                    <Plus className="w-4 h-4 mr-2" /> {t('employees.add')}
                </Button>
            </div>

            <Card noPadding>
                <div className="p-4 border-b border-slate-100">
                    <div className="relative max-w-sm">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={t('employees.search')}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-50 text-slate-500 font-medium">
                            <tr>
                                <th className="px-6 py-4">{t('employees.name')}</th>
                                <th className="px-6 py-4">{t('employees.hourlyRate')}</th>
                                <th className="px-6 py-4">{t('employees.startDate')}</th>
                                <th className="px-6 py-4 text-right">{t('employees.actions')}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredEmployees.map((employee) => (
                                <tr key={employee.id} className="hover:bg-slate-50 transition-colors group">
                                    <td className="px-6 py-4 font-medium text-slate-900">{employee.name}</td>
                                    <td className="px-6 py-4">{employee.hourlyRate} EGP/hr</td>
                                    <td className="px-6 py-4 text-slate-500">
                                        {format(new Date(employee.startDate), 'MMM dd, yyyy')}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => openModal(employee)}
                                                className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                                                title={t('employees.edit')}
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(employee.id)}
                                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {filteredEmployees.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-8 text-center text-slate-500">
                                        {t('employees.noEmployees')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                title={editingEmployee ? t('employees.edit') : t('employees.add')}
            >
                <div className="space-y-4">
                    <Input
                        label={t('employees.name')}
                        placeholder="e.g. Ahmed Ali"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                    <Input
                        label={t('employees.hourlyRate')}
                        type="number"
                        placeholder="e.g. 50"
                        value={formData.hourlyRate}
                        onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                    />
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="ghost" onClick={closeModal}>{t('landing.cancel')}</Button>
                        <Button onClick={handleSubmit}>
                            {editingEmployee ? t('employees.save') : t('employees.create')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
