import v1Schema, {
  MigrationTypes as V1Types,
} from '../client/schemaVersions/v1.js';
import { createMigration } from '@verdant-web/store';

const DEFAULT_TAGS = [
  'chest',
  'back',
  'arms',
  'abdominals',
  'legs',
  'shoulders',

  'calves',
  'hamstrings',
  'quadriceps',
  'glutes',
  'biceps',
  'triceps',
  'forearms',
  'lats',
  'traps',
  'middle back',
  'lower back',
  'neck',
  'obliques',
];

// this is your first migration, so no logic is necessary! but you can
// include logic here to seed initial data for users
export default createMigration<V1Types>(v1Schema, async ({ mutations }) => {
  await mutations.shuffles.put({
    id: 'default',
    ordering: [],
  });

  await Promise.all(
    DEFAULT_TAGS.map((name) =>
      mutations.tags.put({
        name,
      }),
    ),
  );
});
