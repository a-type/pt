export function shuffle(length: number) {
  const items = Array.from({ length }, (_, i) => i);
  for (let i = items.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    [items[i], items[j]] = [items[j], items[i]];
  }
  return items;
}

export function getNext<T>(
  ordering: number[],
  currentIndex: number,
  items: T[],
) {
  let index = currentIndex;
  let totalAttempts = 0;
  while (
    ordering[currentIndex] > items.length - 1 &&
    totalAttempts < ordering.length
  ) {
    index = (index + 1) % ordering.length;
    totalAttempts++;
  }
  if (ordering[index] < items.length) {
    return items[ordering[index]];
  }
  return items[0];
}
