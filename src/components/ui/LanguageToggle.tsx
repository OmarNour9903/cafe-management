
import { Globe } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const LanguageToggle = () => {
    const language = useStore((state) => state.settings.language);
    const setLanguage = useStore((state) => state.setLanguage);

    const toggleLanguage = () => {
        const newLang = language === 'ar' ? 'en' : 'ar';
        setLanguage(newLang);
        // Force document direction update immediately
        document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = newLang;
    };

    return (
        <button
            onClick={toggleLanguage}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200 hover:bg-slate-100 hover:border-slate-300 transition-all shadow-sm group"
            title={language === 'ar' ? 'Switch to English' : 'تغيير للعربية'}
        >
            <Globe className="w-4 h-4 text-blue-600 group-hover:rotate-12 transition-transform duration-300" />
            <span className="text-sm font-semibold text-slate-700 font-sans">
                {language === 'ar' ? 'English' : 'عربي'}
            </span>
        </button>
    );
};
