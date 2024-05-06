import { ExerciseEditor } from '@/components/exercises/ExerciseEditor.jsx';
import { hooks } from '@/store.js';
import { Button } from '@a-type/ui/components/button';
import { Icon } from '@a-type/ui/components/icon';
import { PageContent, PageFixedArea } from '@a-type/ui/components/layouts';
import { Link, useParams } from '@verdant-web/react-router';

export interface ExercisePageProps {}

export function ExercisePage({}: ExercisePageProps) {
  const { id } = useParams();
  const exercise = hooks.useExercise(id);
  if (!exercise) return <PageContent>Not found</PageContent>;
  return (
    <PageContent>
      <PageFixedArea className="row py-3">
        <Button asChild className="self-start" color="ghost">
          <Link to="/">
            <Icon name="arrowLeft" /> Back
          </Link>
        </Button>
      </PageFixedArea>

      <ExerciseEditor exercise={exercise} />
    </PageContent>
  );
}

export default ExercisePage;
