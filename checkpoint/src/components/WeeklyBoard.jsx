import { useState } from "react";
import GenericBoard from "./GenericBoard";
import { useLanguage } from '../context/LanguageContext';

export default function WeeklyBoard() {
  const { t } = useLanguage();
  const [colsView, setColsView] = useState(3);

  const columns = [
    { id: "MON", title: t('MON') || "Segunda" },
    { id: "TUE", title: t('TUE') || "Terça" },
    { id: "WED", title: t('WED') || "Quarta" },
    { id: "THU", title: t('THU') || "Quinta" },
    { id: "FRI", title: t('FRI') || "Sexta" },
    { id: "SAT", title: t('SAT') || "Sábado" },
    { id: "SUN", title: t('SUN') || "Domingo" },
  ];

  return (
    <div className="flex flex-col h-full w-full relative">
      <div className="px-6 py-2 hidden md:flex justify-end items-center shrink-0 bg-white dark:bg-dracula-bg z-10 sticky top-0">
        <div className="flex bg-gray-100 dark:bg-dracula-current rounded border border-gray-200 dark:border-dracula-comment overflow-hidden">
          {[1, 3, 7].map(num => (
            <button
              key={num}
              onClick={() => setColsView(num)}
              className={`px-3 py-1 cursor-pointer transition-colors border-none text-xs font-semibold ${
                colsView === num 
                  ? "bg-indigo-600 text-white dark:bg-dracula-purple dark:text-dracula-bg" 
                  : "bg-transparent text-gray-600 dark:text-dracula-fg hover:bg-gray-200 dark:hover:bg-opacity-50"
              }`}
            >
              {num} Col{num > 1 ? 's' : ''}
            </button>
          ))}
        </div>
      </div>
      <GenericBoard storageKey="tarefa-salva-weekly" columns={columns} allowAddInAllColumns={false} enableInlineAdd={true} gridCols={colsView} />
    </div>
  );
}
