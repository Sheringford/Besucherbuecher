
import React, { useState, useRef, useEffect } from 'react';
import { ZoomIn, ZoomOut, RotateCcw, AlertCircle } from 'lucide-react';

interface ImageViewerProps {
  src: string;
  alt: string;
}

const ImageViewer: React.FC<ImageViewerProps> = ({ src, alt }) => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Image loading state
  const [currentSrc, setCurrentSrc] = useState(src);
  const [isFallback, setIsFallback] = useState(false);
  const [failedPath, setFailedPath] = useState<string | null>(null);
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Reset view and source when prop changes
  useEffect(() => {
    resetView();
    setCurrentSrc(src);
    setIsFallback(false);
    setFailedPath(null);
  }, [src]);

  const resetView = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleError = () => {
    if (!isFallback) {
      // Record the path that failed before switching
      setFailedPath(src);
      
      // Fallback to placeholder
      const filename = src.split('/').pop() || 'Page';
      setCurrentSrc(`https://placehold.co/1200x1600/f5f5dc/5d4037?text=${filename}`);
      setIsFallback(true);
    }
  };

  const handleZoom = (delta: number) => {
    setScale(prev => Math.min(Math.max(0.5, prev + delta), 4));
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (e.ctrlKey) {
        e.preventDefault();
        handleZoom(e.deltaY * -0.01);
    }
  };

  const onMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
        setIsDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const onMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div className="flex flex-col h-full bg-stone-900 overflow-hidden relative group">
      {/* Toolbar */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-stone-800/80 backdrop-blur-sm text-white rounded-full px-4 py-2 flex items-center gap-4 shadow-lg z-20 opacity-0 group-hover:opacity-100 transition-opacity">
        <button onClick={() => handleZoom(-0.25)} className="hover:text-amber-400" title="Zoom Out">
          <ZoomOut className="w-5 h-5" />
        </button>
        <span className="text-xs font-mono w-12 text-center">{Math.round(scale * 100)}%</span>
        <button onClick={() => handleZoom(0.25)} className="hover:text-amber-400" title="Zoom In">
          <ZoomIn className="w-5 h-5" />
        </button>
        <div className="w-px h-4 bg-white/20"></div>
        <button onClick={resetView} className="hover:text-amber-400" title="Reset View">
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Fallback Warning with Debug Info */}
      {isFallback && (
        <div className="absolute top-4 right-4 max-w-xs z-20">
            <div className="bg-amber-100 text-amber-900 text-xs px-3 py-2 rounded-lg shadow-md border border-amber-200 flex flex-col gap-1">
                <div className="flex items-center gap-2 font-semibold">
                    <AlertCircle className="w-3 h-3" />
                    <span>Image not found</span>
                </div>
                <div className="font-mono text-[10px] break-all bg-amber-50 p-1 rounded border border-amber-100">
                    Failed to load: {failedPath}
                </div>
                <div className="text-[10px] opacity-75">
                    Check file name & 'images' folder.
                </div>
            </div>
        </div>
      )}

      {/* Image Area */}
      <div 
        ref={containerRef}
        className={`flex-1 overflow-hidden flex items-center justify-center ${scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'}`}
        onWheel={handleWheel}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
      >
        <img 
          src={currentSrc} 
          alt={alt}
          onError={handleError}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
            maxWidth: '90%',
            maxHeight: '90%'
          }}
          className="shadow-2xl select-none"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default ImageViewer;
