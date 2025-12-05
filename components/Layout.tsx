import React from 'react';
import { BookOpen, Github } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  onGoHome: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onGoHome }) => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50">
      <header className="bg-stone-900 text-stone-100 shadow-md z-10">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:text-amber-400 transition-colors"
            onClick={onGoHome}
          >
            <BookOpen className="w-6 h-6 text-amber-500" />
            <span className="font-serif text-xl font-semibold tracking-wide">ArchiveReader</span>
          </div>
          
          <nav className="flex items-center gap-6 text-sm font-medium">
            <button onClick={onGoHome} className="hover:text-amber-400 transition-colors">Collections</button>
            <a href="#" className="hover:text-amber-400 transition-colors">About Project</a>
            <a href="https://github.com" target="_blank" rel="noreferrer" className="text-stone-400 hover:text-white">
              <Github className="w-5 h-5" />
            </a>
          </nav>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {children}
      </main>

      <footer className="bg-stone-100 border-t border-stone-200 py-4 text-center text-stone-500 text-xs">
        <p>&copy; {new Date().getFullYear()} Historical Diary Transcription Project. Powered by React & Gemini.</p>
      </footer>
    </div>
  );
};

export default Layout;
