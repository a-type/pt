import { Exercise, hooks } from '@/store.js';
import { LiveUpdateTextField } from '@a-type/ui/components/liveUpdateTextField';
import { TagSelect } from './TagSelect.jsx';

export interface ExerciseEditorProps {
  exercise: Exercise;
}

export function ExerciseEditor({ exercise }: ExerciseEditorProps) {
  const { name, description, tags } = hooks.useWatch(exercise);
  const liveTags = hooks.useWatch(tags);

  return (
    <div className="col items-start gap-4">
      <label className="col items-start gap-1">
        <span>Name</span>
        <LiveUpdateTextField
          value={name}
          onChange={(v) => exercise.set('name', v)}
          className="text-2xl font-bold"
        />
      </label>
      <label className="col items-start gap-1 w-full">
        <span>Description</span>
        <LiveUpdateTextField
          value={description}
          onChange={(v) => exercise.set('description', v)}
          textArea
          className="w-full min-h-200px"
        />
      </label>
      <label className="col items-start gap-1">
        <span>Tags</span>
        <TagSelect
          selected={liveTags}
          onSelectedChange={(v) => exercise.set('tags', v)}
          allowAdd
        />
      </label>
    </div>
  );
}
