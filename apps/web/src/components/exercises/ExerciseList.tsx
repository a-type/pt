import { Exercise, hooks } from '@/store.js';
import { ConfirmedButton } from '@a-type/ui/components/button';
import {
  CardActions,
  CardContent,
  CardFooter,
  CardGrid,
  CardMain,
  CardRoot,
  CardTitle,
} from '@a-type/ui/components/card';
import { Icon } from '@a-type/ui/components/icon';
import { H2 } from '@a-type/ui/components/typography';
import { Link } from '@verdant-web/react-router';
import { CreateExerciseButton } from './CreateExerciseButton.jsx';
import { TagDisplay } from './TagDisplay.jsx';

export interface ExerciseListProps {}

export function ExerciseList({}: ExerciseListProps) {
  const data = hooks.useAllExercises();

  return (
    <div className="col items-start gap-4 w-full">
      <H2>Exercises</H2>
      <CardGrid className="w-full">
        <CreateExerciseButton className="w-full h-full rounded-lg items-center justify-center col">
          <Icon name="plus" />
          <span>Add new</span>
        </CreateExerciseButton>
        {data.map((ex) => (
          <ExerciseListItem key={ex.get('id')} exercise={ex} />
        ))}
      </CardGrid>
    </div>
  );
}

function ExerciseListItem({ exercise }: { exercise: Exercise }) {
  const { id, name } = hooks.useWatch(exercise);
  const client = hooks.useClient();

  const deleteThis = () => {
    client.exercises.delete(id);
  };

  return (
    <CardRoot>
      <CardMain asChild>
        <Link to={`/edit/${id}`}>
          <CardTitle>{name}</CardTitle>
          <CardContent>
            <TagDisplay exercise={exercise} />
          </CardContent>
        </Link>
      </CardMain>
      <CardFooter>
        <CardActions>
          <ConfirmedButton
            color="ghostDestructive"
            confirmText="Delete exercise"
            onConfirm={deleteThis}
          >
            <Icon name="x" />
          </ConfirmedButton>
        </CardActions>
      </CardFooter>
    </CardRoot>
  );
}
