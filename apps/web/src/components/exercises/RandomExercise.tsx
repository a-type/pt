import { hooks, Shuffle } from '@/store.js';
import {
  CardContent,
  CardMain,
  CardRoot,
  CardTitle,
} from '@a-type/ui/components/card';
import { H2 } from '@a-type/ui/components/typography';
import { Suspense, useEffect, useState } from 'react';
import { TagSelect } from './TagSelect.jsx';
import { getNextIndex, shuffle } from '@/utils.js';
import { Link } from '@verdant-web/react-router';
import { Button } from '@a-type/ui/components/button';
import { Icon } from '@a-type/ui/components/icon';
import { TagDisplay } from './TagDisplay.jsx';
import {
  CollapsibleRoot,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@a-type/ui/components/collapsible';

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

  return (
    <div className="col w-full items-stretch">
      <H2>Random Exercise</H2>
      <CollapsibleRoot className="border border-solid border-gray-5 rounded-lg p-2 gap-3 col items-stretch">
        <CollapsibleTrigger asChild>
          <Button color="ghost">
            <Icon name="filter" /> Tag filter
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <Suspense>
            <TagSelect selected={tagFilters} onSelectedChange={setTagFilters} />
          </Suspense>
        </CollapsibleContent>
      </CollapsibleRoot>
      <Suspense>
        <RandomExerciseDisplay sequence={sequence} tagFilters={tagFilters} />
      </Suspense>
      <Button
        onClick={() => {
          if (currentIndex === ordering.length - 1) {
            // shuffle again
            sequence.set('ordering', shuffle(ordering.length));
            sequence.set('currentIndex', 0);
            console.log(sequence.get('ordering').getSnapshot());
          } else {
            sequence.set('currentIndex', (currentIndex + 1) % ordering.length);
          }
        }}
        className="self-center"
      >
        <Icon name="refresh" /> Next
      </Button>
    </div>
  );
}

function RandomExerciseDisplay({
  sequence,
  tagFilters,
}: {
  sequence: Shuffle;
  tagFilters: string[];
}) {
  const { ordering, currentIndex } = hooks.useWatch(sequence);
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
  const orderingIndex = getNextIndex(
    ordering.getAll(),
    currentIndex,
    filteredData.length,
  );
  const itemsIndex = ordering.get(orderingIndex);
  const item = filteredData[itemsIndex];
  hooks.useWatch(item);

  useEffect(() => {
    if (ordering.length < data.length) {
      sequence.set('ordering', shuffle(data.length));
    }
  }, [data.length, ordering.length, sequence]);

  // write adjusted index for filtered sequences
  useEffect(() => {
    if (orderingIndex !== currentIndex) {
      sequence.set('currentIndex', orderingIndex);
    }
  }, [orderingIndex, currentIndex, ordering]);

  if (!data.length) {
    // don't show if no exercises exist
    return null;
  }

  if (!item) {
    return <div>No exercises match the current filter</div>;
  }

  return (
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
  );
}
