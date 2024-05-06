/** Generated types for Verdant client */
import type {
  Client as BaseClient,
  ClientDescriptor as BaseClientDescriptor,
  ClientDescriptorOptions as BaseClientDescriptorOptions,
  CollectionQueries,
  StorageSchema,
  Migration,
} from "@verdant-web/store";
export * from "@verdant-web/store";

export class Client<Presence = any, Profile = any> {
  readonly exercises: CollectionQueries<Exercise, ExerciseInit, ExerciseFilter>;
  readonly shuffles: CollectionQueries<Shuffle, ShuffleInit, ShuffleFilter>;
  readonly tags: CollectionQueries<Tag, TagInit, TagFilter>;

  sync: BaseClient<Presence, Profile>["sync"];
  undoHistory: BaseClient<Presence, Profile>["undoHistory"];
  namespace: BaseClient<Presence, Profile>["namespace"];
  entities: BaseClient<Presence, Profile>["entities"];
  // queryStore: BaseClient<Presence, Profile>['queryStore'];
  batch: BaseClient<Presence, Profile>["batch"];
  // files: BaseClient<Presence, Profile>['files'];
  close: BaseClient<Presence, Profile>["close"];
  export: BaseClient<Presence, Profile>["export"];
  import: BaseClient<Presence, Profile>["import"];
  subscribe: BaseClient<Presence, Profile>["subscribe"];
  stats: BaseClient<Presence, Profile>["stats"];
  __dangerous__resetLocal: BaseClient<
    Presence,
    Profile
  >["__dangerous__resetLocal"];
}

export interface ClientDescriptorOptions<Presence = any, Profile = any>
  extends Omit<
    BaseClientDescriptorOptions<Presence, Profile>,
    "schema" | "migrations"
  > {
  /** WARNING: overriding the schema is dangerous and almost definitely not what you want. */
  schema?: StorageSchema;
  /** WARNING: overriding the migrations is dangerous and almost definitely not what you want. */
  migrations?: Migration[];
}

export class ClientDescriptor<Presence = any, Profile = any> {
  constructor(init: ClientDescriptorOptions<Presence, Profile>);
  open: () => Promise<Client<Presence, Profile>>;
  close: () => Promise<void>;
  readonly current: Client<Presence, Profile> | null;
  readonly readyPromise: Promise<Client<Presence, Profile>>;
  readonly schema: StorageSchema;
  readonly namespace: string;
  /**
   * Resets all local data for this client, including the schema and migrations.
   * If the client is not connected to sync, this causes the irretrievable loss of all data.
   * If the client is connected to sync, this will cause the client to re-sync all data from the server.
   * Use this very carefully, and only as a last resort.
   */
  __dangerous__resetLocal: () => Promise<void>;
}

import {
  ObjectEntity,
  ListEntity,
  EntityFile,
  EntityFileSnapshot,
} from "@verdant-web/store";

/** Generated types for Exercise */

export type Exercise = ObjectEntity<
  ExerciseInit,
  ExerciseDestructured,
  ExerciseSnapshot
>;
export type ExerciseId = string;
export type ExerciseName = string;
export type ExerciseDescription = string;
export type ExerciseCreatedAt = number;
export type ExerciseTags = ListEntity<
  ExerciseTagsInit,
  ExerciseTagsDestructured,
  ExerciseTagsSnapshot
>;
export type ExerciseTagsItem = string;
export type ExerciseInit = {
  id?: string;
  name?: string;
  description?: string;
  createdAt?: number;
  tags?: ExerciseTagsInit;
};

export type ExerciseTagsInit = string[];
export type ExerciseDestructured = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  tags: ExerciseTags;
};

export type ExerciseTagsDestructured = string[];
export type ExerciseSnapshot = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  tags: ExerciseTagsSnapshot;
};

export type ExerciseTagsSnapshot = string[];

/** Index filters for Exercise **/

export interface ExerciseCreatedAtSortFilter {
  where: "createdAt";
  order: "asc" | "desc";
}
export interface ExerciseCreatedAtMatchFilter {
  where: "createdAt";
  equals: number;
  order?: "asc" | "desc";
}
export interface ExerciseCreatedAtRangeFilter {
  where: "createdAt";
  gte?: number;
  gt?: number;
  lte?: number;
  lt?: number;
  order?: "asc" | "desc";
}
export interface ExerciseTagsSortFilter {
  where: "tags";
  order: "asc" | "desc";
}
export interface ExerciseTagsMatchFilter {
  where: "tags";
  equals: string;
  order?: "asc" | "desc";
}
export interface ExerciseTagsRangeFilter {
  where: "tags";
  gte?: string;
  gt?: string;
  lte?: string;
  lt?: string;
  order?: "asc" | "desc";
}
export interface ExerciseTagsStartsWithFilter {
  where: "tags";
  startsWith: string;
  order?: "asc" | "desc";
}
export type ExerciseFilter =
  | ExerciseCreatedAtSortFilter
  | ExerciseCreatedAtMatchFilter
  | ExerciseCreatedAtRangeFilter
  | ExerciseTagsSortFilter
  | ExerciseTagsMatchFilter
  | ExerciseTagsRangeFilter
  | ExerciseTagsStartsWithFilter;

/** Generated types for Shuffle */

export type Shuffle = ObjectEntity<
  ShuffleInit,
  ShuffleDestructured,
  ShuffleSnapshot
>;
export type ShuffleId = string;
export type ShuffleOrdering = ListEntity<
  ShuffleOrderingInit,
  ShuffleOrderingDestructured,
  ShuffleOrderingSnapshot
>;
export type ShuffleOrderingItem = number;
export type ShuffleCurrentIndex = number;
export type ShuffleInit = {
  id?: string;
  ordering?: ShuffleOrderingInit;
  currentIndex?: number;
};

export type ShuffleOrderingInit = number[];
export type ShuffleDestructured = {
  id: string;
  ordering: ShuffleOrdering;
  currentIndex: number;
};

export type ShuffleOrderingDestructured = number[];
export type ShuffleSnapshot = {
  id: string;
  ordering: ShuffleOrderingSnapshot;
  currentIndex: number;
};

export type ShuffleOrderingSnapshot = number[];

/** Index filters for Shuffle **/

export type ShuffleFilter = never;

/** Generated types for Tag */

export type Tag = ObjectEntity<TagInit, TagDestructured, TagSnapshot>;
export type TagName = string;
export type TagInit = { name: string };

export type TagDestructured = { name: string };

export type TagSnapshot = { name: string };

/** Index filters for Tag **/

export type TagFilter = never;
