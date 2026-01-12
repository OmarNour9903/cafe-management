import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Briefcase, UserCircle, MoveRight, Lock, MoveLeft } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { Modal } from '../components/ui/Modal';
import { Input } from '../components/ui/Input';
import { useStore } from '../store/useStore';
import { useTranslation } from '../utils/i18n';
import { LanguageToggle } from '../components/ui/LanguageToggle';

export const LandingPage = () => {
    const navigate = useNavigate();
    const { t, isRTL } = useTranslation();
    const ownerPasscode = useStore((state) => state.settings.ownerPasscode);

    const [modalOpen, setModalOpen] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState('');

    const handleOwnerLogin = () => {
        if (passcode === ownerPasscode) {
            navigate('/dashboard');
        } else {
            setError('Invalid Passcode');
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative">
            <div className="absolute top-4 right-4">
                <LanguageToggle />
            </div>

            <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Employee Card */}
                <Card
                    onClick={() => navigate('/portal')}
                    className="cursor-pointer hover:border-blue-500 hover:shadow-xl transition-all group p-8 flex flex-col items-center text-center gap-6"
                >
                    <div className="w-20 h-20 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <UserCircle className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-slate-900">{t('landing.employeePortal')}</h2>
                        <p className="text-slate-500">{t('landing.recordAttendance')}</p>
                    </div>
                    <Button className="w-full mt-4 group-hover:bg-blue-700">
                        {t('landing.login')} {isRTL ? <MoveLeft className="w-4 h-4 mr-2" /> : <MoveRight className="w-4 h-4 ml-2" />}
                    </Button>
                </Card>

                {/* Owner Card */}
                <Card
                    onClick={() => setModalOpen(true)}
                    className="cursor-pointer hover:border-slate-800 hover:shadow-xl transition-all group p-8 flex flex-col items-center text-center gap-6"
                >
                    <div className="w-20 h-20 rounded-2xl bg-slate-100 text-slate-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Briefcase className="w-10 h-10" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-slate-900">{t('landing.businessOwner')}</h2>
                        <p className="text-slate-500">{t('landing.accessDashboard')}</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4 group-hover:bg-slate-900 group-hover:text-white">
                        {t('landing.login')} {isRTL ? <MoveLeft className="w-4 h-4 mr-2" /> : <MoveRight className="w-4 h-4 ml-2" />}
                    </Button>
                </Card>
            </div>

            <Modal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                title={t('landing.businessOwner')}
            >
                <div className="space-y-4">
                    <div className="flex justify-center py-4">
                        <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center">
                            <Lock className="w-6 h-6 text-slate-600" />
                        </div>
                    </div>

                    <Input
                        label={t('landing.enterPasscode')}
                        type="password"
                        placeholder="••••••"
                        value={passcode}
                        onChange={(e) => {
                            setPasscode(e.target.value);
                            setError('');
                        }}
                        error={error}
                        className="text-center text-2xl tracking-widest"
                    />

                    <div className="flex gap-3 pt-2">
                        <Button variant="ghost" className="flex-1" onClick={() => setModalOpen(false)}>
                            {t('landing.cancel')}
                        </Button>
                        <Button className="flex-1" onClick={handleOwnerLogin}>
                            {t('landing.login')}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};
