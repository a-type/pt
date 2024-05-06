export function shuffle(length: number) {
  const items = Array.from({ length }, (_, i) => i);
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

export function getNextIndex<T>(
  ordering: number[],
  currentIndex: number,
  itemsLength: number,
) {
  let index = currentIndex;
  let totalAttempts = 0;
  while (ordering[index] >= itemsLength && totalAttempts < ordering.length) {
    index = (index + 1) % ordering.length;
    totalAttempts++;
  }
  if (ordering[index] < itemsLength) {
    return index;
  }
  console.error(
    'No valid index found from',
    ordering,
    'starting at',
    currentIndex,
    'with length',
    itemsLength,
  );
  return 0;
}
