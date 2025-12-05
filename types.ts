export interface DiaryPage {
  id: string;
  pageNumber: number;
  imageUrl: string; // In a real scenario, this might point to a TIF or a converted WebP
  transcriptionXml: string; // The raw XML content
}

export interface DiaryDocument {
  id: string;
  title: string;
  dateRange: string;
  description: string;
  coverImage: string;
  pageCount: number;
  pages: DiaryPage[];
}

export enum ViewMode {
  SPLIT = 'SPLIT',
  IMAGE_ONLY = 'IMAGE_ONLY',
  TEXT_ONLY = 'TEXT_ONLY'
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isError?: boolean;
}
