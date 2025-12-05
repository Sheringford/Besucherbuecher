import React from 'react';
import { DiaryDocument } from '../types';
import { Calendar, FileText } from 'lucide-react';

interface DocumentCardProps {
  document: DiaryDocument;
  onClick: (doc: DiaryDocument) => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onClick }) => {
  return (
    <div 
      className="group bg-white rounded-lg border border-stone-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
      onClick={() => onClick(document)}
    >
      <div className="h-48 overflow-hidden relative bg-stone-200">
        <img 
          src={document.coverImage} 
          alt={document.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
            <span className="text-white font-serif text-lg">{document.dateRange}</span>
        </div>
      </div>
      
      <div className="p-5 flex-1 flex flex-col">
        <h3 className="font-serif text-xl font-semibold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
          {document.title}
        </h3>
        <p className="text-stone-600 text-sm mb-4 flex-1 line-clamp-3">
          {document.description}
        </p>
        
        <div className="flex items-center gap-4 text-xs text-stone-500 mt-auto pt-4 border-t border-stone-100">
          <div className="flex items-center gap-1">
            <FileText className="w-4 h-4" />
            <span>{document.pageCount} Pages</span>
          </div>
          <div className="flex items-center gap-1">
             <Calendar className="w-4 h-4" />
             <span>Digitized 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentCard;
