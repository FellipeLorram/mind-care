import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { NoteActions } from './note-actions'

interface Props {
  content?: string
  onSave: (content: string) => void
}

export function NoteEditor({ content, onSave }: Props) {
  const editor = useEditor({
    extensions: [StarterKit.configure({
      heading:
        { HTMLAttributes: { class: 'text-xl' } }
    })],
    content,
    editorProps: {
      attributes: {
        class: 'outline-none p-12'
      }
    }
  });

  return (
    <div className='mx-auto max-w-6xl w-full flex flex-col items-center justify-between flex-1 shadow-xl'>
      <NoteActions
        onSave={onSave}
        editor={editor}
      />
      <div className='w-full border md:border-b-0 flex-1'>
        <EditorContent
          className='w-full h-96'
          editor={editor}
        />
      </div>
    </div>
  )
}


