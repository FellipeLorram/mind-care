import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { type Editor } from '@tiptap/react'
import { Bold, Heading1, Italic, List, Undo } from 'lucide-react';

interface Props {
  editor: Editor | null;
}

export function AppointmentNoteActions({ editor }: Props) {
  return (
    <div className='mx-auto border border-b-0 rounded-t-lg flex items-center justify-start md:justify-center flex-row flex-wrap w-full p-2 '>
      <Toggle
        onClick={() => editor?.chain().focus().toggleBold().run()}
        data-state={editor?.isActive('bold') ? 'on' : 'off'}
        aria-label="Toggle bold">
        <Bold className="mr-2 h-4 w-4" />
        Bold
      </Toggle>

      <Toggle
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        data-state={editor?.isActive('italic') ? 'on' : 'off'}
        aria-label="Toggle italic"
      >
        <Italic className="mr-2 h-4 w-4" />
        Italic
      </Toggle>

      <Toggle
        onClick={() => editor?.chain().focus().toggleHeading({ level: 1 }).run()}
        data-state={editor?.isActive('heading', { level: 1 }) ? 'on' : 'off'}
        aria-label="Toggle Heading"
      >
        <Heading1 className="mr-2 h-4 w-4" />
        Heading
      </Toggle>

      <Toggle
        onClick={() => editor?.chain().focus().toggleBulletList().run()}
        data-state={editor?.isActive('bulletList') ? 'on' : 'off'}
        aria-label="Toggle List"
      >
        <List className="mr-2 h-4 w-4" />
        List
      </Toggle>

      <Button
        onClick={() => editor?.chain().focus().undo().run()}
        disabled={
          !editor?.can()
            .chain()
            .focus()
            .undo()
            .run()
        }
        variant="ghost"

      >
        <Undo className="mr-2 h-4 w-4" />
        Undo
      </Button>
    </div>
  )
}

