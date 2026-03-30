import GenericBoard from "./GenericBoard";
import { useLanguage } from '../context/LanguageContext';

export default function YearlyBoard() {
  const { t } = useLanguage();

  const columns = [
    { id: "JAN", title: t('JAN') || "Janeiro" },
    { id: "FEB", title: t('FEB') || "Fevereiro" },
    { id: "MAR", title: t('MAR') || "Março" },
    { id: "APR", title: t('APR') || "Abril" },
    { id: "MAY", title: t('MAY') || "Maio" },
    { id: "JUN", title: t('JUN') || "Junho" },
    { id: "JUL", title: t('JUL') || "Julho" },
    { id: "AUG", title: t('AUG') || "Agosto" },
    { id: "SEP", title: t('SEP') || "Setembro" },
    { id: "OCT", title: t('OCT') || "Outubro" },
    { id: "NOV", title: t('NOV') || "Novembro" },
    { id: "DEC", title: t('DEC') || "Dezembro" },
  ];

  return <GenericBoard storageKey="tarefa-salva-yearly" columns={columns} allowAddInAllColumns={false} enableInlineAdd={true} />;
}
