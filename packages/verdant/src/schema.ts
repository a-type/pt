import { schema } from '@verdant-web/store';
import cuid from 'cuid';

/**
 * Welcome to your Verdant schema!
 *
 * The schema is where you define your data model.
 *
 * Read more at https://verdant.dev/docs/local-storage/schema
 *
 * The code below is provided as an example, but you'll
 * probably want to delete it and replace it with your
 * own schema.
 *
 * The schema is used to generate the client code for Verdant.
 * After you've replaced this example schema, run `pnpm generate -f`
 * in the root directory to bootstrap your client.
 *
 * For subsequent changes to your schema, use just `pnpm generate`.
 */

const exercises = schema.collection({
  name: 'exercise',
  primaryKey: 'id',
  fields: {
    id: schema.fields.string({
      default: cuid,
    }),
    name: schema.fields.string({
      default: 'New exercise',
    }),
    description: schema.fields.string({
      default: '',
    }),
    createdAt: schema.fields.number({
      default: () => Date.now(),
    }),
    tags: schema.fields.array({
      items: schema.fields.string(),
    }),
  },
  indexes: {
    createdAt: {
      field: 'createdAt',
    },
    tags: {
      type: 'string[]',
      compute: (doc) => doc.tags,
    },
  },
});

const shuffles = schema.collection({
  name: 'shuffle',
  primaryKey: 'id',
  fields: {
    id: schema.fields.string({
      default: cuid,
    }),
    ordering: schema.fields.array({
      items: schema.fields.number(),
    }),
    currentIndex: schema.fields.number({
      default: 0,
    }),
  },
});

const tags = schema.collection({
  name: 'tag',
  primaryKey: 'name',
  fields: {
    name: schema.fields.string(),
  },
});

export default schema({
  version: 1,
  collections: {
    exercises,
    shuffles,
    tags,
  },
});
