import React, { useEffect, useState } from 'react';

interface TranscriptionViewerProps {
  xmlContent: string;
}

const TranscriptionViewer: React.FC<TranscriptionViewerProps> = ({ xmlContent }) => {
  const [parsedHtml, setParsedHtml] = useState<HTMLElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parser = new DOMParser();
      // First attempt: try to parse as standard XML
      const xmlDoc = parser.parseFromString(xmlContent, "text/xml");
      
      const parserError = xmlDoc.querySelector("parsererror");
      if (parserError) {
        throw new Error("Initial XML Parsing failed");
      }

      // Check for the specific structure: <transcription><text><![CDATA[...]]></text></transcription>
      const transcriptionText = xmlDoc.querySelector("transcription > text");
      if (transcriptionText && transcriptionText.textContent) {
        // We found the CDATA content or text content inside. 
        // This content (e.g., <pb ... />\nText...) is a fragment with no single root.
        // We must wrap it to parse it successfully.
        const fragmentContent = transcriptionText.textContent;
        const wrappedContent = `<div class="page-wrapper">${fragmentContent}</div>`;
        
        const fragmentDoc = parser.parseFromString(wrappedContent, "text/xml");
        const fragmentError = fragmentDoc.querySelector("parsererror");
        
        if (fragmentError) {
             // Fallback: It might not be valid XML even when wrapped (e.g. unescaped chars),
             // or mixed content issues. Try parsing as HTML for leniency.
             const htmlParser = new DOMParser();
             const htmlDoc = htmlParser.parseFromString(wrappedContent, "text/html");
             setParsedHtml(htmlDoc.body.firstChild as HTMLElement);
        } else {
             setParsedHtml(fragmentDoc.querySelector("div"));
        }
        setError(null);
        return;
      }

      // Fallback to previous logic: Look for standard TEI body
      const body = xmlDoc.querySelector("body");
      if (body) {
        setParsedHtml(body as HTMLElement);
        setError(null);
      } else {
         // If generic valid XML but no known structure, just show root
         if (xmlDoc.documentElement) {
            setParsedHtml(xmlDoc.documentElement);
            setError(null);
         } else {
            throw new Error("Unknown XML structure");
         }
      }
    } catch (err) {
      console.error(err);
      setError("Failed to parse transcription file.");
    }
  }, [xmlContent]);

  // Helper to recursively render XML nodes as React elements
  const renderNode = (node: Node, index: number): React.ReactNode => {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      if (!text) return null;
      // Preserve newlines for plain text nodes, especially for the raw list format
      return <span key={index} className="whitespace-pre-wrap font-serif text-lg leading-relaxed text-stone-800">{text}</span>;
    }

    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName.toLowerCase();
      const children = Array.from(element.childNodes).map((child: Node, i) => renderNode(child, i));
      const attrs = element.attributes;

      switch (tagName) {
        case 'head':
          return <h2 key={index} className="text-2xl font-serif font-bold text-amber-900 mb-4 pb-2 border-b border-amber-200">{children}</h2>;
        case 'p':
          return <p key={index} className="mb-4 leading-relaxed text-stone-800 font-serif text-lg">{children}</p>;
        case 'list':
          return <ul key={index} className="list-disc pl-5 mb-4 space-y-2">{children}</ul>;
        case 'item':
          return <li key={index} className="text-stone-700">{children}</li>;
        case 'name':
          return <span key={index} className="font-semibold text-amber-800 bg-amber-50 px-1 rounded cursor-help" title="Person Entity">{children}</span>;
        case 'date':
          return <span key={index} className="font-medium text-stone-600 italic">{children}</span>;
        case 'note':
            return <span key={index} className="text-stone-500 text-sm block pl-2 border-l-2 border-stone-300 my-1">{children}</span>;
        case 'div':
            // Check if it's our wrapper or a TEI div
            if (element.className === 'page-wrapper') {
                return <div key={index} className="space-y-2">{children}</div>;
            }
            return <div key={index} className="my-2">{children}</div>;
        case 'pb':
            // Page break visualization
            const pageNum = attrs.getNamedItem('n')?.value;
            const source = attrs.getNamedItem('source')?.value;
            return (
                <div key={index} className="my-6 border-b-2 border-dashed border-stone-300 flex items-center justify-between text-xs text-stone-400 py-1">
                    <span>Page Break {pageNum ? `(p. ${pageNum})` : ''}</span>
                    {source && <span className="font-mono">{source}</span>}
                </div>
            );
        default:
          return <span key={index} className={`xml-${tagName}`}>{children}</span>;
      }
    }
    return null;
  };

  if (error) {
    return (
      <div className="p-8 text-center text-red-500 bg-red-50 rounded-lg">
        <p>{error}</p>
        <pre className="text-xs text-left mt-4 overflow-auto bg-white p-2 border">{xmlContent.substring(0, 200)}...</pre>
      </div>
    );
  }

  return (
    <div className="h-full bg-white p-8 md:p-12 overflow-y-auto custom-scrollbar">
      <div className="max-w-2xl mx-auto">
        {parsedHtml ? Array.from(parsedHtml.childNodes).map((node: Node, i) => renderNode(node, i)) : <div className="animate-pulse flex flex-col gap-4">
            <div className="h-8 bg-stone-200 w-3/4 rounded"></div>
            <div className="h-4 bg-stone-200 rounded"></div>
            <div className="h-4 bg-stone-200 rounded"></div>
            <div className="h-4 bg-stone-200 w-5/6 rounded"></div>
        </div>}
      </div>
    </div>
  );
};

export default TranscriptionViewer;
