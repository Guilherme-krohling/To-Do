import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function ChecklistItem({ id, index, text, done, onToggle, onDelete }) {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging
    } = useSortable({ id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.3 : 1,
        touchAction: 'none'
    };

    const baseClasses = "p-3 rounded-md shadow-sm border flex items-center gap-3 group cursor-grab active:cursor-grabbing hover:shadow-md transition-all";
    const stateClasses = done
        ? "bg-green-50 border-green-200 dark:bg-dracula-green/20 dark:border-dracula-green/40"
        : "bg-white border-gray-100 dark:bg-dracula-bg dark:border-dracula-comment/40";

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`${baseClasses} ${stateClasses}`}
        >
            <span className="text-xs font-bold text-gray-400 dark:text-dracula-comment w-5 text-right shrink-0 select-none">
                {index}.
            </span>

            <button
                type="button"
                onClick={onToggle}
                onPointerDown={(e) => e.stopPropagation()}
                className={`w-5 h-5 shrink-0 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
                    done
                        ? "bg-green-500 border-green-500 dark:bg-dracula-green dark:border-dracula-green"
                        : "bg-transparent border-gray-300 dark:border-dracula-comment hover:border-indigo-500 dark:hover:border-dracula-purple"
                }`}
                title={done ? "Desmarcar" : "Marcar como feito"}
            >
                {done && (
                    <svg className="w-3 h-3 text-white dark:text-dracula-bg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                    </svg>
                )}
            </button>

            <span
                className={`flex-1 text-sm min-w-0 break-words transition-all ${
                    done
                        ? "line-through text-gray-400 dark:text-dracula-comment opacity-60"
                        : "text-gray-700 dark:text-dracula-fg"
                }`}
            >
                {text}
            </span>

            <button
                type="button"
                onClick={onDelete}
                onPointerDown={(e) => e.stopPropagation()}
                className="p-1.5 rounded-md text-gray-400 hover:text-red-500 hover:bg-gray-100 dark:text-dracula-comment dark:hover:bg-dracula-current transition-colors shrink-0 cursor-pointer border-none bg-transparent"
                title="Delete"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-4 h-4 fill-current">
                    <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/>
                </svg>
            </button>
        </div>
    );
}
