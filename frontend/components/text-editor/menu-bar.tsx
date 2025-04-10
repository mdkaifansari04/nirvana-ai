import { Toggle } from '@/components/ui/toggle';
import type { Editor } from '@tiptap/react';
import { AlignCenter, AlignLeft, AlignRight, Bold, Heading1, Heading2, Heading3, Highlighter, Italic, List, ListOrdered, Strikethrough } from 'lucide-react';

export default function MenuBar({ editor }: { editor: Editor | null }) {
   if (!editor) {
      return null;
   }

   const options = [
      {
         icon: <Heading1 className="size-4" />,
         onClick: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
         preesed: editor.isActive('heading', { level: 1 }),
      },
      {
         icon: <Heading2 className="size-4" />,
         onClick: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
         preesed: editor.isActive('heading', { level: 2 }),
      },
      {
         icon: <Heading3 className="size-4" />,
         onClick: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
         preesed: editor.isActive('heading', { level: 3 }),
      },
      {
         icon: <Bold className="size-4" />,
         onClick: () => editor.chain().focus().toggleBold().run(),
         preesed: editor.isActive('bold'),
      },
      {
         icon: <Italic className="size-4" />,
         onClick: () => editor.chain().focus().toggleItalic().run(),
         preesed: editor.isActive('italic'),
      },
      {
         icon: <Strikethrough className="size-4" />,
         onClick: () => editor.chain().focus().toggleStrike().run(),
         preesed: editor.isActive('strike'),
      },
      {
         icon: <AlignLeft className="size-4" />,
         onClick: () => editor.chain().focus().setTextAlign('left').run(),
         preesed: editor.isActive({ textAlign: 'left' }),
      },
      {
         icon: <AlignCenter className="size-4" />,
         onClick: () => editor.chain().focus().setTextAlign('center').run(),
         preesed: editor.isActive({ textAlign: 'center' }),
      },
      {
         icon: <AlignRight className="size-4" />,
         onClick: () => editor.chain().focus().setTextAlign('right').run(),
         preesed: editor.isActive({ textAlign: 'right' }),
      },
      {
         icon: <List className="size-4" />,
         onClick: () => editor.chain().focus().toggleBulletList().run(),
         preesed: editor.isActive('bulletList'),
      },
      {
         icon: <ListOrdered className="size-4" />,
         onClick: () => editor.chain().focus().toggleOrderedList().run(),
         preesed: editor.isActive('orderedList'),
      },
      {
         icon: <Highlighter className="size-4" />,
         onClick: () => editor.chain().focus().toggleHighlight().run(),
         preesed: editor.isActive('highlight'),
      },
   ];

   return (
      <div className="border rounded-md p-1 mb-1 bg-slate-50 space-x-2 z-50">
         {options.map((option) => {
            const iconName = option.icon.type.name;
            const key = `toggle-${iconName}`;

            return (
               <Toggle key={key} pressed={option.preesed} onPressedChange={option.onClick}>
                  {option.icon}
               </Toggle>
            );
         })}
      </div>
   );
}
