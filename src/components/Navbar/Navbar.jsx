import { useTheme } from "../../context/ThemeContext";

export function Navbar() {
  const {darkMode, toggleTheme} = useTheme();
  return (
    <nav className="sticky top-0 z-50 w-full transition-colors duration-300 
                    bg-white dark:bg-neutral-800 
                    border-b border-neutral-200 dark:border-neutral-800 
                    shadow-sm">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="text-xl font-black tracking-tight text-neutral-800 dark:text-neutral-100">
            Quiz<span className="text-blue-800 dark:text-blue-400">App</span>
          </p>
        </div>
        <button
          onClick={toggleTheme}
          className="group relative flex items-center justify-center w-10 h-10 rounded-full 
                     bg-neutral-100 dark:bg-neutral-800 
                     hover:bg-neutral-200 dark:hover:bg-neutral-700 
                     transition-all duration-300 border border-neutral-200 dark:border-neutral-700 
                     active:scale-90"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
