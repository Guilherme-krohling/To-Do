import { useState } from "react";
import { useLanguage } from '../context/LanguageContext';

export default function GlobalAddTask({ add, columns }) {
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("Low");
    const [destination, setDestination] = useState(columns[0]?.id || "");
    
    const { t } = useLanguage();
    const prioritiesOptions = ["High", "Medium", "Low"];

    const handleAdd = () => {
        if (!title.trim() || !destination) return;
        add(title, priority, destination);
        setTitle("");
    };

    return (
        <div className="mb-6 bg-white dark:bg-dracula-current p-4 rounded-xl shadow-md border border-gray-200 dark:border-dracula-comment w-full max-w-4xl mx-auto flex-shrink-0">
            <div className="flex flex-col sm:flex-row gap-4 items-end">
                {/* --- DROP PRIORITY --- */}
                <div className="flex flex-col shrink-0 w-full sm:w-auto">
                    <label className="text-xs text-gray-500 dark:text-dracula-comment font-bold mb-1 uppercase tracking-widest">
                        {t('PRIORITY')}
                    </label>
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="p-2 text-sm rounded-md border-2 border-gray-200 dark:border-dracula-comment dark:bg-dracula-bg dark:text-dracula-fg focus:outline-none focus:border-blue-500 bg-white cursor-pointer w-full"                          
                    >
                        {prioritiesOptions.map((opt) => (
                            <option key={opt} value={opt}>{t(opt.toUpperCase())}</option>
                        ))}
                    </select>
                </div>

                {/* --- DROP DESTINATION --- */}
                <div className="flex flex-col shrink-0 w-full sm:w-auto">
                    <label className="text-xs text-gray-500 dark:text-dracula-comment font-bold mb-1 uppercase tracking-widest">
                        Destino
                    </label>
                    <select
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="p-2 text-sm rounded-md border-2 border-gray-200 dark:border-dracula-comment dark:bg-dracula-bg dark:text-dracula-fg focus:outline-none focus:border-blue-500 bg-white cursor-pointer w-full max-w-full sm:max-w-[160px]"                          
                    >
                        {columns.map((col) => (
                            <option key={col.id} value={col.id}>{col.title}</option>
                        ))}
                    </select>
                </div>

                {/* --- INPUT TEXT --- */}
                <div className="flex flex-col w-full">
                    <label className="text-xs text-gray-500 dark:text-dracula-comment font-bold mb-1 uppercase tracking-widest">
                        {t('TASK_NAME')}
                    </label>
                    <input
                        className="w-full p-2 text-sm rounded-md border-2 border-gray-200 bg-white text-slate-800 dark:border-dracula-comment dark:bg-dracula-bg dark:text-dracula-fg focus:outline-none focus:border-blue-500 placeholder-gray-400"
                        type="text"
                        placeholder={t('NEW_TASK')}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") handleAdd(); }}
                    />
                </div>

                {/* --- BOTÃO --- */}
                <button 
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-dracula-purple dark:to-dracula-pink text-white px-6 py-2 rounded-md transition-colors font-bold shadow-md h-[38px] w-full sm:w-auto mt-2 sm:mt-0 whitespace-nowrap"
                    onClick={handleAdd}
                >
                    {t('BTN_ADD')}
                </button>
            </div>
        </div>
    );
}
