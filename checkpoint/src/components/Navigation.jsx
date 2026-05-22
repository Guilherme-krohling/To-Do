import { useLanguage } from '../context/LanguageContext';

export default function Navigation({ currentBoard, setCurrentBoard, isMobileOpen, closeMobileMenu }) {
    const { t } = useLanguage();

    const menus = [
        { id: 'daily', label: t('MENU_DAILY') || 'Diário' },
        { id: 'weekly', label: t('MENU_WEEKLY') || 'Semanal' },
        { id: 'yearly', label: t('MENU_YEARLY') || 'Anual' },
    ];

    return (
        <>
            {/* Navegação Desktop (Sub-header) */}
            <nav className="hidden md:flex bg-white dark:bg-dracula-current px-6 py-2 gap-4 shadow-sm z-10 justify-center">
                {menus.map((menu) => (
                    <button
                        key={menu.id}
                        onClick={() => setCurrentBoard(menu.id)}
                        className={`
                            flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all
                            ${currentBoard === menu.id 
                                ? 'bg-blue-600 dark:bg-dracula-purple text-white shadow-md' 
                                : 'text-slate-600 dark:text-dracula-fg hover:bg-blue-50 dark:hover:bg-dracula-bg'
                            }
                        `}
                    >
                        {menu.label}
                    </button>
                ))}
            </nav>

            {/* Menu Mobile (Hambúrguer Overlay) */}
            {isMobileOpen && (
                <>
                    <div 
                        className="fixed inset-0 bg-black/50 z-40 md:hidden"
                        onClick={closeMobileMenu}
                    />
                    <div className="md:hidden absolute top-[72px] left-0 w-[250px] bg-white dark:bg-dracula-current border-r border-b border-gray-200 dark:border-dracula-comment p-4 flex flex-col gap-2 z-50 shadow-lg rounded-br-xl">
                        {menus.map((menu) => (
                            <button
                                key={menu.id}
                                onClick={() => {
                                    setCurrentBoard(menu.id);
                                    closeMobileMenu();
                                }}
                                className={`
                                    flex items-center px-4 py-3 rounded-lg font-bold transition-all text-left
                                    ${currentBoard === menu.id 
                                        ? 'bg-blue-600 dark:bg-dracula-purple text-white shadow-md' 
                                        : 'text-slate-600 dark:text-dracula-fg hover:bg-blue-50 dark:hover:bg-dracula-bg'
                                    }
                                `}
                            >
                                {menu.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </>
    );
}
