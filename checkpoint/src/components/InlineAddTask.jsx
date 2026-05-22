import { useState, useRef, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";

export default function InlineAddTask({ onAdd, onCancel }) {
    const { t } = useLanguage();
    const [title, setTitle] = useState("");
    const [priority, setPriority] = useState("High");
    const inputRef = useRef(null);

    // Focus initial na montagem
    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title.trim(), priority);
            setTitle("");
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape") {
            onCancel();
        }
    };

    return (
        <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="bg-gray-50 dark:bg-dracula-bg rounded-md p-3 mb-3 border border-gray-200 dark:border-dracula-comment shadow-sm">
            <input 
                ref={inputRef}
                type="text" 
                placeholder={t('TASK_NAME') || "Task Name"}
                className="w-full bg-white dark:bg-dracula-current text-gray-800 dark:text-dracula-fg placeholder-gray-400 dark:placeholder-dracula-comment rounded px-3 py-2 outline-none focus:ring-1 focus:ring-indigo-400 dark:focus:ring-dracula-purple text-sm mb-2"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            
            <div className="flex gap-2">
                <select 
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="flex-1 bg-white dark:bg-dracula-current text-gray-800 dark:text-dracula-fg rounded px-2 py-1 outline-none text-sm border-none focus:ring-1 focus:ring-indigo-400 dark:focus:ring-dracula-purple"
                >
                    <option value="High">{t('HIGH') || "High"}</option>
                    <option value="Medium">{t('MEDIUM') || "Medium"}</option>
                    <option value="Low">{t('LOW') || "Low"}</option>
                </select>

                <button 
                    type="submit" 
                    className="bg-indigo-600 dark:bg-dracula-purple text-white dark:text-dracula-bg font-semibold rounded px-4 py-1 flex items-center justify-center text-sm shadow-sm hover:brightness-110 transition-all cursor-pointer border-none"
                    disabled={!title.trim()}
                >
                    {t('ADD') || "Add"}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="bg-gray-200 hover:bg-gray-300 dark:bg-dracula-comment dark:hover:bg-opacity-80 text-gray-700 dark:text-dracula-bg font-semibold rounded px-2 py-1 items-center justify-center text-sm transition-all cursor-pointer border-none"
                    title={t('CANCEL') || "Cancelar"}
                >
                    ✕
                </button>
            </div>
        </form>
    );
}
