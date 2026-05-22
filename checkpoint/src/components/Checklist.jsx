import { useEffect, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import {
    DndContext,
    closestCenter,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import ChecklistItem from "./ChecklistItem";

const STORAGE_KEY = "checkpoint-checklist-tasks";

export default function Checklist() {
    const { t } = useLanguage();

    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return [];
            }
        }
        return [];
    });

    const [input, setInput] = useState("");

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: { distance: 8 },
        }),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );

    const handleAdd = () => {
        const trimmed = input.trim();
        if (!trimmed) return;
        const novo = {
            id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
            text: trimmed,
            done: false,
        };
        setItems((prev) => [...prev, novo]);
        setInput("");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleAdd();
        }
    };

    const handleToggle = (id) => {
        setItems((prev) =>
            prev.map((item) =>
                item.id === id ? { ...item, done: !item.done } : item
            )
        );
    };

    const handleDelete = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (!over || active.id === over.id) return;
        setItems((prev) => {
            const oldIndex = prev.findIndex((i) => i.id === active.id);
            const newIndex = prev.findIndex((i) => i.id === over.id);
            if (oldIndex === -1 || newIndex === -1) return prev;
            return arrayMove(prev, oldIndex, newIndex);
        });
    };

    return (
        <div className="bg-white dark:bg-dracula-current rounded-lg shadow-lg flex flex-col transition-colors h-full min-h-[200px]">
            <div className="px-4 py-3 border-b border-gray-100 dark:border-dracula-comment font-bold rounded-t-lg dark:text-dracula-purple">
                {t('CHECKLIST_TITLE')}
            </div>

            <div className="p-4 flex flex-col gap-3 flex-1 min-h-0">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={t('CHECKLIST_PLACEHOLDER')}
                        className="flex-1 min-w-0 p-2 text-sm rounded-md border-2 border-gray-200 bg-white text-slate-800 dark:border-dracula-comment dark:bg-dracula-bg dark:text-dracula-fg focus:outline-none focus:border-blue-500 transition-colors placeholder-gray-400 dark:placeholder-dracula-comment"
                    />
                    <button
                        type="button"
                        onClick={handleAdd}
                        disabled={!input.trim()}
                        className="bg-blue-500 hover:bg-blue-700 dark:bg-gradient-to-r dark:from-dracula-purple dark:to-dracula-pink text-white px-4 rounded-md transition-all font-bold shadow-md cursor-pointer border-none disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 h-[38px] flex items-center justify-center text-xl leading-none"
                        title={t('BTN_ADD')}
                    >
                        +
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {items.length === 0 ? (
                        <p className="text-xs text-gray-400 dark:text-dracula-comment text-center py-6 italic">
                            {t('CHECKLIST_EMPTY')}
                        </p>
                    ) : (
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragEnd={handleDragEnd}
                        >
                            <SortableContext items={items.map((i) => i.id)} strategy={verticalListSortingStrategy}>
                                <div className="space-y-2">
                                    {items.map((item, idx) => (
                                        <ChecklistItem
                                            key={item.id}
                                            id={item.id}
                                            index={idx + 1}
                                            text={item.text}
                                            done={item.done}
                                            onToggle={() => handleToggle(item.id)}
                                            onDelete={() => handleDelete(item.id)}
                                        />
                                    ))}
                                </div>
                            </SortableContext>
                        </DndContext>
                    )}
                </div>
            </div>
        </div>
    );
}
