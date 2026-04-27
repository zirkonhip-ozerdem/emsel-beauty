export function filterValidGalleryItems<
  T extends {
    imageUrl: string | null;
    sortOrder: number;
  },
>(items: T[]) {
  return items.filter(
    (item): item is T & { imageUrl: string } => Boolean(item.imageUrl),
  );
}
