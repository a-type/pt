import { hooks, Shuffle } from '@/store.js';
import {
  CardContent,
  CardMain,
  CardRoot,
  CardTitle,
} from '@a-type/ui/components/card';
import { H2 } from '@a-type/ui/components/typography';
import { useEffect, useState } from 'react';
import { TagSelect } from './TagSelect.jsx';
import { getNext, shuffle } from '@/utils.js';
import { Chip } from '@a-type/ui/components/chip';
import { Link } from '@verdant-web/react-router';
import { Button } from '@a-type/ui/components/button';
import { Icon } from '@a-type/ui/components/icon';
import { TagDisplay } from './TagDisplay.jsx';

export interface RandomExerciseProps {}

export function RandomExercise({}: RandomExerciseProps) {
  const sequence = hooks.useShuffle('default');
  const client = hooks.useClient();

  if (!sequence) {
    client.shuffles.put({ id: 'default', ordering: [] });
    return null;
  }

  return <RandomExercisePicker sequence={sequence} />;
}

function RandomExercisePicker({ sequence }: { sequence: Shuffle }) {
  const { ordering, currentIndex } = hooks.useWatch(sequence);
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const firstTag = tagFilters[0];
  const data = hooks.useAllExercises({
    index: firstTag
      ? {
          where: 'tags',
          equals: firstTag,
        }
      : undefined,
  });
  const filteredData = data.filter((ex) => {
    const tags = ex.get('tags');
    return tagFilters.every((tag) => tags.includes(tag));
  });
  const item = getNext(ordering.getAll(), currentIndex, filteredData);
  hooks.useWatch(item);

  useEffect(() => {
    if (ordering.length < data.length) {
      sequence.set('ordering', shuffle(data.length));
    }
  }, [data.length, ordering.length, sequence]);

  return (
    <div className="col w-full items-stretch">
      <H2>Random Exercise</H2>
      <div className="row flex-wrap gap-2 border border-solid border-gray-5 rounded-lg p-2">
        <div>Tag filter</div>
        <TagSelect selected={tagFilters} onSelectedChange={setTagFilters} />
      </div>
      {item ? (
        <CardRoot>
          <CardMain asChild>
            <Link to={`/edit/${item.get('id')}`}>
              <CardTitle>{item.get('name')}</CardTitle>
              <CardContent>
                <div>{item.get('description')}</div>
                <TagDisplay exercise={item} />
              </CardContent>
            </Link>
          </CardMain>
        </CardRoot>
      ) : (
        <div>No matching exercises. Try changing your filter?</div>
      )}
      <Button
        onClick={() =>
          sequence.set('currentIndex', (currentIndex + 1) % ordering.length)
        }
        className="self-center"
      >
        <Icon name="refresh" /> Next
      </Button>
    </div>
  );
}
