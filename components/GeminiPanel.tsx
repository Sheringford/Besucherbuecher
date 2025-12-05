import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot } from 'lucide-react';
import { analyzeTranscription } from '../services/geminiService';
import { ChatMessage } from '../types';

interface GeminiPanelProps {
  xmlContent: string;
  isOpen: boolean;
  onClose: () => void;
}

const GeminiPanel: React.FC<GeminiPanelProps> = ({ xmlContent, isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your research assistant. Ask me anything about this page of the diary.' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset chat when document changes (optional, keeps chat fresh per page)
  useEffect(() => {
    setMessages([{ role: 'model', text: 'Hello! I am your research assistant. Ask me anything about this page of the diary.' }]);
  }, [xmlContent]);

  const handleSend = async () => {
    if (!query.trim() || isLoading) return;

    const userMsg = query;
    setQuery('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    const responseText = await analyzeTranscription(xmlContent, userMsg);

    setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="w-80 md:w-96 border-l border-stone-200 bg-white flex flex-col shadow-xl z-20 absolute right-0 top-0 bottom-0 md:relative">
      {/* Header */}
      <div className="p-4 border-b border-stone-100 flex items-center justify-between bg-amber-50/50">
        <div className="flex items-center gap-2 text-amber-900">
          <Sparkles className="w-5 h-5 text-amber-600" />
          <h3 className="font-semibold text-sm">AI Analysis</h3>
        </div>
        <button onClick={onClose} className="text-stone-400 hover:text-stone-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-stone-50/30">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'model' ? 'bg-amber-100 text-amber-700' : 'bg-stone-200 text-stone-600'}`}>
               {msg.role === 'model' ? <Bot className="w-5 h-5" /> : <span className="font-bold text-xs">You</span>}
            </div>
            <div className={`p-3 rounded-lg text-sm max-w-[80%] ${msg.role === 'user' ? 'bg-amber-600 text-white' : 'bg-white border border-stone-200 text-stone-700'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
            <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                    <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div className="bg-white border border-stone-200 p-3 rounded-lg text-sm text-stone-500 italic">
                    Analyzing document...
                </div>
            </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-stone-200 bg-white">
        <div className="relative">
          <input
            type="text"
            className="w-full pl-4 pr-12 py-3 bg-stone-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-amber-500 focus:bg-white transition-all"
            placeholder="Ask about names, dates..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
          />
          <button 
            onClick={handleSend}
            disabled={!query.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-amber-600 hover:bg-amber-50 rounded-md disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
        <p className="text-[10px] text-stone-400 mt-2 text-center">AI generated. Check original text for accuracy.</p>
      </div>
    </div>
  );
};

export default GeminiPanel;
