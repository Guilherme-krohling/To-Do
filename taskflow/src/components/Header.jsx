export default function Header() {
    return (
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center gap-4">
            <h1 className="text-2xl font-bold text-white">TaskFlow</h1>
            <div className="flex gap-4">
                <button className="bg-gray-900">Theme</button>
                <button className="bg-gray-900">Language</button>
            </div>
        </header>
    );
};