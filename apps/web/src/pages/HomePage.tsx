import { ExerciseList } from '@/components/exercises/ExerciseList.jsx';
import { RandomExercise } from '@/components/exercises/RandomExercise.jsx';
import { Button } from '@a-type/ui/components/button';
import { Icon } from '@a-type/ui/components/icon';
import { PageContent } from '@a-type/ui/components/layouts';
import { H1 } from '@a-type/ui/components/typography';
import { Link } from '@verdant-web/react-router';

export interface HomePageProps {}

export function HomePage({}: HomePageProps) {
  return (
    <PageContent>
      <div className="col items-stretch gap-10">
        <div className="row justify-between">
          <H1 className="text-lg">PT</H1>
          <Button size="icon" color="ghost" asChild>
            <Link to="/settings">
              <Icon name="gear" />
            </Link>
          </Button>
        </div>
        <RandomExercise />
        <ExerciseList />
      </div>
    </PageContent>
  );
}

export default HomePage;
