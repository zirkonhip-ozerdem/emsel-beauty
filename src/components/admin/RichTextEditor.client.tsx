"use client";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  BlockQuote,
  Bold,
  ClassicEditor,
  Essentials,
  Heading,
  Italic,
  Link,
  List,
  Paragraph,
  Underline,
} from "ckeditor5";

type RichTextEditorClientProps = {
  disabled?: boolean;
  minHeight?: number;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

export default function RichTextEditorClient({
  disabled = false,
  minHeight = 220,
  onChange,
  placeholder,
  value,
}: RichTextEditorClientProps) {
  return (
    <div
      className="admin-rich-editor"
      style={{ ["--editor-min-height" as string]: `${minHeight}px` }}
    >
      <CKEditor
        editor={ClassicEditor}
        disabled={disabled}
        data={value}
        config={{
          licenseKey: process.env.NEXT_PUBLIC_CKEDITOR_LICENSE_KEY || "GPL",
          placeholder,
          plugins: [
            Essentials,
            Paragraph,
            Heading,
            Bold,
            Italic,
            Underline,
            Link,
            List,
            BlockQuote,
          ],
          toolbar: [
            "undo",
            "redo",
            "|",
            "heading",
            "|",
            "bold",
            "italic",
            "underline",
            "|",
            "link",
            "bulletedList",
            "numberedList",
            "blockQuote",
          ],
        }}
        onChange={(_, editor) => {
          onChange(editor.getData());
        }}
      />
    </div>
  );
}
