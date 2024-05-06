/** @generated - do not modify this file. */

// src/schema.ts
import { schema } from "@verdant-web/store";
import cuid from "cuid";
var exercises = schema.collection({
  name: "exercise",
  primaryKey: "id",
  fields: {
    id: schema.fields.string({
      default: cuid
    }),
    name: schema.fields.string({
      default: "New exercise"
    }),
    description: schema.fields.string({
      default: ""
    }),
    createdAt: schema.fields.number({
      default: () => Date.now()
    }),
    tags: schema.fields.array({
      items: schema.fields.string()
    })
  },
  indexes: {
    createdAt: {
      field: "createdAt"
    },
    tags: {
      type: "string[]",
      compute: (doc) => doc.tags
    }
  }
});
var shuffles = schema.collection({
  name: "shuffle",
  primaryKey: "id",
  fields: {
    id: schema.fields.string({
      default: cuid
    }),
    ordering: schema.fields.array({
      items: schema.fields.number()
    }),
    currentIndex: schema.fields.number({
      default: 0
    })
  }
});
var tags = schema.collection({
  name: "tag",
  primaryKey: "name",
  fields: {
    name: schema.fields.string()
  }
});
var schema_default = schema({
  version: 1,
  collections: {
    exercises,
    shuffles,
    tags
  }
});
export {
  schema_default as default
};
