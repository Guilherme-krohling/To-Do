export default function Board({children}) {
    return (  
        // Grid resolve a responsividade automaticamente
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6 items-start">
           {children}
        </div>
        
    );
};