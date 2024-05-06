import { Context, ComponentType, ReactNode } from "react";
import type {
  Client,
  ClientDescriptor,
  Schema,
  QueryStatus,
  UserInfo,
  ObjectEntity,
  ListEntity,
  Entity,
  AccessibleEntityProperty,
  EntityShape,
  AnyEntity,
  EntityDestructured,
  EntityFile,
  Exercise,
  ExerciseFilter,
  Shuffle,
  ShuffleFilter,
  Tag,
  TagFilter,
} from "./index.js";

type HookConfig<F> = {
  index?: F;
  skip?: boolean;
  key?: string;
};

export interface GeneratedHooks<Presence, Profile> {
  /**
   * Render this context Provider at the top level of your
   * React tree to provide a Client to all hooks.
   */
  Provider: ComponentType<{
    value: ClientDescriptor<Schema>;
    children: ReactNode;
    sync?: boolean;
  }>;
  /**
   * Direct access to the React Context, if needed.
   */
  Context: Context<ClientDescriptor<Schema>>;
  /** @deprecated use useClient instead */
  useStorage: () => Client<Presence, Profile>;
  useClient: () => Client<Presence, Profile>;
  useUnsuspendedClient: () => Client<Presence, Profile> | null;
  useSelf: () => UserInfo<Profile, Presence>;
  usePeerIds: () => string[];
  usePeer: (peerId: string | null) => UserInfo<Profile, Presence> | null;
  useFindPeer: (
    query: (peer: UserInfo<Profile, Presence>) => boolean,
    options?: { includeSelf: boolean },
  ) => UserInfo<Profile, Presence> | null;
  useFindPeers: (
    query: (peer: UserInfo<Profile, Presence>) => boolean,
    options?: { includeSelf: boolean },
  ) => UserInfo<Profile, Presence>[];
  useSyncStatus: () => boolean;
  useWatch<T extends AnyEntity<any, any, any> | null>(
    entity: T,
    options?: { deep?: boolean },
  ): EntityDestructured<T>;
  useWatch<T extends EntityFile | null>(file: T): string | null;
  useOnChange<T extends AnyEntity<any, any, any> | null>(
    entity: T,
    callback: (info: {
      isLocal: boolean;
      target?: AnyEntity<any, any, any>;
    }) => void,
    options?: { deep?: boolean },
  ): void;
  useOnChange<T extends EntityFile | null>(file: T, callback: () => void): void;
  useUndo(): () => void;
  useRedo(): () => void;
  useCanUndo(): boolean;
  useCanRedo(): boolean;
  /**
   * This non-blocking hook declaratively controls sync on/off state.
   * Render it anywhere in your tree and pass it a boolean to turn sync on/off.
   * Since it doesn't trigger Suspense, you can do this in, say, a top-level
   * route component.
   *
   * It must still be rendered within your Provider.
   */
  useSync(isOn: boolean): void;

  useExercise(id: string, config?: { skip?: boolean }): Exercise | null;
  useExerciseUnsuspended(
    id: string,
    config?: { skip?: boolean },
  ): { data: Exercise | null; status: QueryStatus };
  useOneExercise: <Config extends HookConfig<ExerciseFilter>>(
    config?: Config,
  ) => Exercise | null;
  useOneExercisesUnsuspended: <Config extends HookConfig<ExerciseFilter>>(
    config?: Config,
  ) => { data: Exercise | null; status: QueryStatus };
  useAllExercises: <Config extends HookConfig<ExerciseFilter>>(
    config?: Config,
  ) => Exercise[];
  useAllExercisesUnsuspended: <Config extends HookConfig<ExerciseFilter>>(
    config?: Config,
  ) => { data: Exercise[]; status: QueryStatus };
  useAllExercisesPaginated: <
    Config extends HookConfig<ExerciseFilter> & {
      pageSize?: number;
      suspend?: false;
    },
  >(
    config?: Config,
  ) => [
    Exercise[],
    {
      next: () => void;
      previous: () => void;
      setPage: (page: number) => void;
      hasNext: boolean;
      hasPrevious: boolean;
      status: QueryStatus;
    },
  ];
  useAllExercisesInfinite: <
    Config extends HookConfig<ExerciseFilter> & {
      pageSize?: number;
      suspend?: false;
    },
  >(
    config?: Config,
  ) => [
    Exercise[],
    { loadMore: () => void; hasMore: boolean; status: QueryStatus },
  ];

  useShuffle(id: string, config?: { skip?: boolean }): Shuffle | null;
  useShuffleUnsuspended(
    id: string,
    config?: { skip?: boolean },
  ): { data: Shuffle | null; status: QueryStatus };
  useOneShuffle: <Config extends HookConfig<ShuffleFilter>>(
    config?: Config,
  ) => Shuffle | null;
  useOneShufflesUnsuspended: <Config extends HookConfig<ShuffleFilter>>(
    config?: Config,
  ) => { data: Shuffle | null; status: QueryStatus };
  useAllShuffles: <Config extends HookConfig<ShuffleFilter>>(
    config?: Config,
  ) => Shuffle[];
  useAllShufflesUnsuspended: <Config extends HookConfig<ShuffleFilter>>(
    config?: Config,
  ) => { data: Shuffle[]; status: QueryStatus };
  useAllShufflesPaginated: <
    Config extends HookConfig<ShuffleFilter> & {
      pageSize?: number;
      suspend?: false;
    },
  >(
    config?: Config,
  ) => [
    Shuffle[],
    {
      next: () => void;
      previous: () => void;
      setPage: (page: number) => void;
      hasNext: boolean;
      hasPrevious: boolean;
      status: QueryStatus;
    },
  ];
  useAllShufflesInfinite: <
    Config extends HookConfig<ShuffleFilter> & {
      pageSize?: number;
      suspend?: false;
    },
  >(
    config?: Config,
  ) => [
    Shuffle[],
    { loadMore: () => void; hasMore: boolean; status: QueryStatus },
  ];

  useTag(id: string, config?: { skip?: boolean }): Tag | null;
  useTagUnsuspended(
    id: string,
    config?: { skip?: boolean },
  ): { data: Tag | null; status: QueryStatus };
  useOneTag: <Config extends HookConfig<TagFilter>>(
    config?: Config,
  ) => Tag | null;
  useOneTagsUnsuspended: <Config extends HookConfig<TagFilter>>(
    config?: Config,
  ) => { data: Tag | null; status: QueryStatus };
  useAllTags: <Config extends HookConfig<TagFilter>>(config?: Config) => Tag[];
  useAllTagsUnsuspended: <Config extends HookConfig<TagFilter>>(
    config?: Config,
  ) => { data: Tag[]; status: QueryStatus };
  useAllTagsPaginated: <
    Config extends HookConfig<TagFilter> & {
      pageSize?: number;
      suspend?: false;
    },
  >(
    config?: Config,
  ) => [
    Tag[],
    {
      next: () => void;
      previous: () => void;
      setPage: (page: number) => void;
      hasNext: boolean;
      hasPrevious: boolean;
      status: QueryStatus;
    },
  ];
  useAllTagsInfinite: <
    Config extends HookConfig<TagFilter> & {
      pageSize?: number;
      suspend?: false;
    },
  >(
    config?: Config,
  ) => [Tag[], { loadMore: () => void; hasMore: boolean; status: QueryStatus }];
}

type HookName = `use${string}`;
type ArgsWithoutClient<T> = T extends (client: Client, ...args: infer U) => any
  ? U
  : never;
export function createHooks<
  Presence = any,
  Profile = any,
  Mutations extends {
    [N: HookName]: (client: Client<Presence, Profile>, ...args: any[]) => any;
  } = never,
>(options?: {
  Context?: Context<StorageDescriptor<Presence, Profile> | null>;
}): GeneratedHooks<Presence, Profile> & {
  withMutations: <
    Mutations extends {
      [Name: HookName]: (
        client: Client<Presence, Profile>,
        ...args: any[]
      ) => unknown;
    },
  >(
    mutations: Mutations,
  ) => GeneratedHooks<Presence, Profile> & {
    [MutHook in keyof Mutations]: (
      ...args: ArgsWithoutClient<Mutations[MutHook]>
    ) => ReturnType<Mutations[MutHook]>;
  };
};
