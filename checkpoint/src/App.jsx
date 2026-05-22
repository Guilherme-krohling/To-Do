import { useEffect, useState } from "react";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import DailyBoard from "./components/DailyBoard";
import WeeklyBoard from "./components/WeeklyBoard";
import YearlyBoard from "./components/YearlyBoard";
import ChecklistBoard from "./components/ChecklistBoard";
import Footer from "./components/Footer";

export default function App() {
  // Estado do Tema (Dark/Light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // Estado da Tela Atual (Navegação)
  const [currentBoard, setCurrentBoard] = useState("daily");
  
  // Controle do Menu Mobile
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Efeito do Tema
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  return (
    <div className="h-screen flex flex-col transition-colors dark:bg-dracula-bg dark:text-dracula-fg overflow-hidden relative">
      <Header 
        mudarTema={toggleTheme} 
        darkMode={theme === "dark"} 
        // Usa o Toggle para ligar/desligar com 1 botao
        abrirMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      />
      
      <Navigation 
        currentBoard={currentBoard} 
        setCurrentBoard={setCurrentBoard}
        isMobileOpen={isMobileMenuOpen}
        closeMobileMenu={() => setIsMobileMenuOpen(false)}
      />

      <div className="flex flex-1 overflow-hidden relative">
        {/* Adicionado overflow-y-auto para evitar travamento em boards longos */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col w-full h-full relative">
          {currentBoard === "checklist" && <ChecklistBoard />}
          {currentBoard === "daily" && <DailyBoard />}
          {currentBoard === "weekly" && <WeeklyBoard />}
          {currentBoard === "yearly" && <YearlyBoard />}
        </main>
      </div>
      
      <Footer />
    </div>
  );
}