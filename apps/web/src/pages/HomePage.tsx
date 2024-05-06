import { ExerciseList } from '@/components/exercises/ExerciseList.jsx';
import { RandomExercise } from '@/components/exercises/RandomExercise.jsx';
import { PageContent } from '@a-type/ui/components/layouts';

export interface HomePageProps {}

export function HomePage({}: HomePageProps) {
  return (
    <PageContent>
      <div className="col items-stretch gap-6">
        <RandomExercise />
        <ExerciseList />
      </div>
    </PageContent>
  );
}

export default HomePage;
