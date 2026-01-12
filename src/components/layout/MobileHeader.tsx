import React from 'react';
import { Menu } from 'lucide-react';
import { Button } from '../ui/Button';

import { LanguageToggle } from '../ui/LanguageToggle';

interface MobileHeaderProps {
    onMenuClick: () => void;
}

export const MobileHeader: React.FC<MobileHeaderProps> = ({ onMenuClick }) => {
    return (
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur-md md:hidden">
            <div className="flex items-center gap-3">
                <Button variant="ghost" size="sm" onClick={onMenuClick} className="-ml-2 rtl:-mr-2 rtl:ml-0">
                    <Menu className="h-6 w-6 text-slate-600" />
                </Button>
                <span className="text-lg font-bold text-slate-900">
                    Nizami <span className="text-blue-600">HR</span>
                </span>
            </div>
            <LanguageToggle />
        </header>
    );
};
