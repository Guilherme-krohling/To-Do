/**
 * Container principal.
 * Usa CSS Grid para organizar as colunas:
 * - Mobile (grid-cols-1): Uma coluna embaixo da outra.
 * - Desktop (md:grid-cols-3): Três colunas lado a lado.
 */
export default function Board({ children }) {
    return (  
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 items-start">
           {children}
        </div>
    );
};