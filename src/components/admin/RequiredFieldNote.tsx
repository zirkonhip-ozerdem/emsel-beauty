type RequiredFieldNoteProps = {
  compact?: boolean;
};

export function RequiredFieldNote({
  compact = false,
}: RequiredFieldNoteProps) {
  return (
    <span
      className={
        compact
          ? "ml-2 text-[11px] font-medium normal-case tracking-normal text-amber-700"
          : "text-xs font-medium text-amber-700"
      }
    >
      Boş geçilemez
    </span>
  );
}
