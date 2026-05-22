/**
 * Container principal.
 * Usa CSS Grid para organizar as colunas:
 * - Mobile sempre (grid-cols-1)
 * - Desktop ajustável (lg:grid-cols-X)
 */
export default function Board({ children, gridCols = 3 }) {
    const gridColsClass = {
        1: "lg:grid-cols-1",
        3: "lg:grid-cols-3",
        4: "lg:grid-cols-4",
        7: "lg:grid-cols-7"
    }[gridCols] || "lg:grid-cols-3";

    return (  
        <div className={`grid grid-cols-1 ${gridColsClass} gap-6 p-6 items-start`}>
           {children}
        </div>
    );
};