
export type FieldsQuery<Schema> =
  Schema extends unknown[] ? FieldsQuery<Schema[number]> | null
    : Schema extends object ? { [P in keyof Schema]: FieldsQuery<Schema[P]> } | null
      : null;

type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

type SubShape<Obj, Ref> =
  Ref extends unknown[]
  ? SubShape<Obj, Ref[0]>
  : {
      [P in keyof Obj]: Ref extends object
        ? P extends keyof Ref
          ? Obj[P] extends object ? SubShape<Obj[P], Ref[P]> : Ref[P]
          : never
        : never
    }

function pickByShape<T, S extends DeepPartial<FieldsQuery<T>>>(type: T, schema: S) {
  return schema as S & {_T: SubShape<S, T>};
}


type MyType = {
  id: boolean;
  nullable: null | { foo: string }[];
  subProp: {
    id: string;
  };
  arr: {required: boolean; name: string}[];
};
const shape = pickByShape({} as MyType, {
  nullable: {foo: null}
});

export type MyNarrowedType = typeof shape._T;



