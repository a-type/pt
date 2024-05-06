import { hooks } from '@/store.js';
import { Chip } from '@a-type/ui/components/chip';
import { Exercise } from '@pt/verdant';

export interface TagDisplayProps {
  exercise: Exercise;
}

export function TagDisplay({ exercise }: TagDisplayProps) {
  const { tags } = hooks.useWatch(exercise);
  const liveTags = hooks.useWatch(tags);

  return (
    <div className="flex flex-wrap gap-1">
      {liveTags.map((tag) => (
        <Chip key={tag} color="accent">
          {tag}
        </Chip>
      ))}
    </div>
  );
}
