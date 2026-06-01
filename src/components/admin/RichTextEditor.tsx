"use client";

type RichTextEditorProps = {
  disabled?: boolean;
  minHeight?: number;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
};

export default function RichTextEditor({
  disabled = false,
  minHeight = 220,
  onChange,
  placeholder,
  value,
}: RichTextEditorProps) {
  return (
    <textarea
      className="w-full rounded-md border border-[rgba(138,110,54,0.18)] bg-white px-4 py-3 text-sm text-gray-800 outline-none transition focus:border-[#c5a059] focus:ring-2 focus:ring-[#f2d688]/50 disabled:bg-gray-50 disabled:text-gray-500"
      disabled={disabled}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      style={{ minHeight }}
      value={value}
    />
  );
}
