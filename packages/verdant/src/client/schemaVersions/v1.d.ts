import { StorageSchema } from "@verdant-web/common";
declare const schema: StorageSchema;
export default schema;

export type ExerciseSnapshot = {
  id: string;
  name: string;
  description: string;
  createdAt: number;
  tags: ExerciseTagsSnapshot;
};

export type ExerciseTagsSnapshot = string[];
export type ExerciseInit = {
  id?: string;
  name?: string;
  description?: string;
  createdAt?: number;
  tags?: ExerciseTagsInit;
};

export type ExerciseTagsInit = string[];

export type ShuffleSnapshot = {
  id: string;
  ordering: ShuffleOrderingSnapshot;
  currentIndex: number;
};

export type ShuffleOrderingSnapshot = number[];
export type ShuffleInit = {
  id?: string;
  ordering?: ShuffleOrderingInit;
  currentIndex?: number;
};

export type ShuffleOrderingInit = number[];

export type TagSnapshot = { name: string };
export type TagInit = { name: string };

export type MigrationTypes = {
  exercises: { init: ExerciseInit; snapshot: ExerciseSnapshot };
  shuffles: { init: ShuffleInit; snapshot: ShuffleSnapshot };
  tags: { init: TagInit; snapshot: TagSnapshot };
};
