'use client';

import MenuBar from '@/components/text-editor/menu-bar';
import Highlight from '@tiptap/extension-highlight';
import TextAlign from '@tiptap/extension-text-align';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import React from 'react';

interface RichTextEditorProps {
   content: string;
   onChange: (content: string) => void;
}

export default function RichTextEditor({ content, onChange }: RichTextEditorProps) {
   const editor = useEditor({
      extensions: [
         StarterKit,
         TextAlign.configure({
            types: ['heading', 'paragraph'],
         }),
         Highlight,
      ],
      content: content,
      editorProps: {
         attributes: {
            class: 'min-h-[156px] border rounded-md bg-slate-50 py-2 px-3',
         },
      },
      onUpdate: ({ editor }) => {
         onChange(editor.getHTML());
      },
   });

   if (!editor) {
      return null;
   }

   return (
      <div className="relative min-h-[300px] w-full border rounded-lg bg-background text-foreground">
         <MenuBar editor={editor} />
         <div className="p-2">
            <style>
               {`
            .ProseMirror {
              min-height: 400px;
              outline: none;
              padding: 1rem;
            }

            .ProseMirror h1 {
              font-size: 2em;
              font-weight: bold;
              line-height: 1;
              margin-top: 0.5em;
              margin-bottom: 0.2em;
            }

            .ProseMirror h2 {
              font-size: 1.5em;
              font-weight: bold;
              line-height: 1.2;
              margin-top: 0.5em;
              margin-bottom: 0.2em;
            }

            .ProseMirror h3 {
              font-size: 1.25em;
              font-weight: bold;
              line-height: 1.4;
              margin-top: 0.5em;
              margin-bottom: 0.2em;
            }
          `}
            </style>
            <EditorContent editor={editor} />
         </div>
      </div>
   );
}
