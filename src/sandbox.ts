
export type FieldsQuery<Schema> =
  Schema extends unknown[] ? FieldsQuery<Schema[number]> | null
    : Schema extends object ? { [P in keyof Schema]: FieldsQuery<Schema[P]> } | null
      : null;

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

type NarrowByShape<Shape, T> =
  NonNullable<T> extends unknown[]
  ? NarrowByShape<Shape, NonNullable<T>[0]>[]
  : {
      [K in keyof Shape]: T extends object
        ? K extends keyof T
          ? Shape[K] extends object ? NarrowByShape<Shape[K], T[K]> : T[K]
          : never
        : never
    }

export function pickByShape<T, S extends DeepPartial<FieldsQuery<T>>>(type: T, schema: S) {
  return schema as S & {_T: NarrowByShape<S, T>};
}
