import React, { useState } from 'react';
import { HashRouter, MemoryRouter, Routes, Route, useNavigate, useParams, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import DocumentCard from './components/DocumentCard';
import ImageViewer from './components/ImageViewer';
import TranscriptionViewer from './components/TranscriptionViewer';
import GeminiPanel from './components/GeminiPanel';
import { MOCK_DIARIES } from './constants';
import { DiaryDocument, ViewMode } from './types';
import { Columns, Image as ImageIcon, FileText, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

// Landing Page Component
const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-16 max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-stone-900 mb-6">
          Historical Visitor Diaries
        </h1>
        <p className="text-lg text-stone-600 leading-relaxed">
          Explore the digitized pages of our library's visitor logs from the late 19th and early 20th centuries. 
          View original manuscripts side-by-side with modern transcriptions, assisted by AI analysis.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {MOCK_DIARIES.map(doc => (
          <DocumentCard 
            key={doc.id} 
            document={doc} 
            onClick={(d) => navigate(`/document/${d.id}`)} 
          />
        ))}
      </div>
    </div>
  );
};

// Viewer Page Component
const DocumentViewerPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const document = MOCK_DIARIES.find(d => d.id === id);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.SPLIT);
  const [isAiOpen, setIsAiOpen] = useState(false);

  if (!document) {
    return <div className="p-10 text-center">Document not found</div>;
  }

  const currentPage = document.pages[currentPageIndex];
  const hasNext = currentPageIndex < document.pages.length - 1;
  const hasPrev = currentPageIndex > 0;

  const handleNext = () => hasNext && setCurrentPageIndex(p => p + 1);
  const handlePrev = () => hasPrev && setCurrentPageIndex(p => p - 1);

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Viewer Controls */}
      <div className="bg-white border-b border-stone-200 px-4 py-3 flex items-center justify-between shadow-sm z-10">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/')} 
            className="text-stone-500 hover:text-stone-900 text-sm font-medium flex items-center gap-1"
          >
            ← Back
          </button>
          <div className="h-4 w-px bg-stone-300"></div>
          <h2 className="font-serif font-semibold text-stone-900 hidden md:block truncate max-w-xs">{document.title}</h2>
        </div>

        <div className="flex items-center gap-2 md:gap-4 bg-stone-100 rounded-lg p-1">
          <button 
            onClick={() => setViewMode(ViewMode.IMAGE_ONLY)}
            className={`p-1.5 rounded ${viewMode === ViewMode.IMAGE_ONLY ? 'bg-white shadow text-amber-600' : 'text-stone-500 hover:text-stone-700'}`}
            title="Image Only"
          >
            <ImageIcon className="w-4 h-4" />
          </button>
          <button 
             onClick={() => setViewMode(ViewMode.SPLIT)}
             className={`p-1.5 rounded ${viewMode === ViewMode.SPLIT ? 'bg-white shadow text-amber-600' : 'text-stone-500 hover:text-stone-700'}`}
             title="Split View"
          >
            <Columns className="w-4 h-4" />
          </button>
          <button 
             onClick={() => setViewMode(ViewMode.TEXT_ONLY)}
             className={`p-1.5 rounded ${viewMode === ViewMode.TEXT_ONLY ? 'bg-white shadow text-amber-600' : 'text-stone-500 hover:text-stone-700'}`}
             title="Transcription Only"
          >
            <FileText className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-4">
           {/* Pagination */}
           <div className="flex items-center gap-2">
            <button 
              onClick={handlePrev} 
              disabled={!hasPrev}
              className="p-1 rounded hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-sm font-mono w-20 text-center">
              Page {currentPageIndex + 1} / {document.pages.length}
            </span>
            <button 
              onClick={handleNext} 
              disabled={!hasNext}
              className="p-1 rounded hover:bg-stone-100 disabled:opacity-30 disabled:hover:bg-transparent"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
           </div>
           
           <button 
             onClick={() => setIsAiOpen(!isAiOpen)}
             className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${isAiOpen ? 'bg-amber-100 border-amber-300 text-amber-800' : 'bg-white border-stone-300 text-stone-600 hover:border-amber-400'}`}
           >
             <Sparkles className="w-4 h-4" />
             <span className="text-sm font-medium hidden md:inline">Ask AI</span>
           </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative flex">
        {/* Left Pane: Image */}
        {(viewMode === ViewMode.SPLIT || viewMode === ViewMode.IMAGE_ONLY) && (
          <div className={`${viewMode === ViewMode.SPLIT ? 'w-1/2 border-r border-stone-300' : 'w-full'} h-full bg-stone-900`}>
             <ImageViewer src={currentPage.imageUrl} alt={`Page ${currentPage.pageNumber}`} />
          </div>
        )}

        {/* Right Pane: Transcription */}
        {(viewMode === ViewMode.SPLIT || viewMode === ViewMode.TEXT_ONLY) && (
          <div className={`${viewMode === ViewMode.SPLIT ? 'w-1/2' : 'w-full'} h-full bg-white relative`}>
            <TranscriptionViewer xmlContent={currentPage.transcriptionXml} />
          </div>
        )}

        {/* AI Sidebar Overlay/Side */}
        <GeminiPanel 
          isOpen={isAiOpen} 
          onClose={() => setIsAiOpen(false)} 
          xmlContent={currentPage.transcriptionXml} 
        />
      </div>
    </div>
  );
};

// Main App Component with Routing
const App: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Layout onGoHome={() => navigate('/')}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/document/:id" element={<DocumentViewerPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
};

// Wrapper for Router
const AppWrapper: React.FC = () => {
  // Use MemoryRouter in blob/preview environments to avoid Location.assign security errors.
  // Use HashRouter for GitHub Pages deployment.
  const isBlobEnv = window.location.protocol === 'blob:';

  return isBlobEnv ? (
    <MemoryRouter>
      <App />
    </MemoryRouter>
  ) : (
    <HashRouter>
      <App />
    </HashRouter>
  );
};

export default AppWrapper;
