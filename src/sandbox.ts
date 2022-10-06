
export type FieldsQuery<Schema> =
Schema extends unknown[] ? FieldsQuery<Schema[number]> | null
  : Schema extends object ? { [P in keyof Schema]: FieldsQuery<Schema[P]> }
    : null;

type DeepPartial<T> = T extends object ? {
[P in keyof T]?: DeepPartial<T[P]>;
} : T;

export type PartialQuery<T> = DeepPartial<FieldsQuery<T>>;

type ExtractOptionalTypes<T> = Exclude<T, NonNullable<T>>;

export type NarrowByQuery<Q, T> = T extends null | undefined
  ? ExtractOptionalTypes<T> | NarrowByQuery<Q, NonNullable<T>>
  : T extends unknown[]
    ? NarrowByQuery<Q, T[0]>[]
    : {
      [K in keyof T as (K extends keyof Q ? K : never)]: T extends object
        ? K extends keyof Q
          ? Q[K] extends object ? NarrowByQuery<Q[K], T[K]> : T[K]
          : never
        : never
    }

export function pickByShape<T, Q extends PartialQuery<T>>(type: T, query: Q) {
return query as Q & {[k: symbol]: NarrowByQuery<Q, T> };
}

export type TypeOfShape<S> = S extends {[k: symbol]: infer T} ? T : never;