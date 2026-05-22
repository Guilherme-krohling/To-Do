import GenericBoard from "./GenericBoard";
import { useLanguage } from '../context/LanguageContext';

export default function DailyBoard() {
  const { t } = useLanguage();

  const columns = [
    { id: "To-Do", title: t('TO_DO') || "A Fazer" },
    { id: "In Progress", title: t('IN_PROGRESS') || "Em Andamento" },
    { id: "Done", title: t('DONE') || "Concluído" },
  ];

  return <GenericBoard storageKey="tarefa-salva-daily" columns={columns} />;
}
