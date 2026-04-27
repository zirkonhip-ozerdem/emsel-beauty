"use client";

import dynamic from "next/dynamic";

type RichTextEditorProps = {
  disabled?: boolean;
  minHeight?: number;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

const RichTextEditorClient = dynamic(
  () => import("@/components/admin/RichTextEditor.client"),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-md border border-[rgba(138,110,54,0.18)] bg-white px-4 py-6 text-sm text-gray-500">
        Editor yukleniyor...
      </div>
    ),
  },
);

export default function RichTextEditor(props: RichTextEditorProps) {
  return <RichTextEditorClient {...props} />;
}
