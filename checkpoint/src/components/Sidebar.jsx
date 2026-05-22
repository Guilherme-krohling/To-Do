import { useLanguage } from '../context/LanguageContext';

export default function Sidebar({ currentBoard, setCurrentBoard, isMobileOpen, closeMobileMenu }) {
    const { t } = useLanguage();

    const menus = [
        { id: 'daily', label: t('MENU_DAILY') || 'Diário', icon: '📅' },
        { id: 'weekly', label: t('MENU_WEEKLY') || 'Semanal', icon: '🗓️' },
        { id: 'yearly', label: t('MENU_YEARLY') || 'Anual', icon: '📆' },
    ];

    return (
        <>
            {/* OVERLAY MOBILE */}
            {isMobileOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={closeMobileMenu}
                />
            )}

            {/* SIDEBAR */}
            <aside className={`
                fixed md:static inset-y-0 left-0 z-50
                w-64 bg-slate-50 dark:bg-dracula-current border-r border-slate-200 dark:border-dracula-comment
                transform transition-transform duration-300 ease-in-out
                ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}>
                <div className="p-4 flex flex-col gap-2 h-full">
                    {/* Botão Fechar no Mobile */}
                    <button 
                        className="md:hidden self-end text-slate-500 dark:text-dracula-fg text-2xl font-bold mb-4"
                        onClick={closeMobileMenu}
                    >
                        ×
                    </button>

                    <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-2 px-2">
                        Navegação
                    </h2>

                    {menus.map((menu) => (
                        <button
                            key={menu.id}
                            onClick={() => {
                                setCurrentBoard(menu.id);
                                closeMobileMenu();
                            }}
                            className={`
                                flex items-center gap-3 px-4 py-3 rounded-lg font-bold transition-all text-left
                                ${currentBoard === menu.id 
                                    ? 'bg-blue-600 dark:bg-dracula-purple text-white shadow-md' 
                                    : 'text-slate-600 dark:text-dracula-fg hover:bg-blue-50 dark:hover:bg-dracula-bg'
                                }
                            `}
                        >
                            <span className="text-xl">{menu.icon}</span>
                            {menu.label}
                        </button>
                    ))}
                </div>
            </aside>
        </>
    );
}
