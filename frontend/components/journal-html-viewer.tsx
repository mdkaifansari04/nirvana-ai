'use client';

import { parseHTML } from '@/lib/utils';
import React from 'react';

interface JournalHtmlViewerProps {
   content: string;
   className?: string;
}

export function JournalHtmlViewer({ content, className = '' }: JournalHtmlViewerProps) {
   return <div className={`journal-content ${className}`}>{parseHTML(content)}</div>;
}
