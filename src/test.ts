import { expectType, TypeEqual } from "ts-expect";
import { TypeOfShape, pickByShape } from "./sandbox";


function basicTest() {
  type MyType = {
    id: boolean;
    name: string;
  };
  const shape = pickByShape({} as MyType, {
    id: null
  });
  shape.id;

  const f: TypeOfShape<typeof shape> = {
    id: true
  };
  console.log(f.id);
  expectType<TypeEqual<{id: boolean}, TypeOfShape<typeof shape>>>(true);
}

function wrongKeyTest() {
  type MyType = {
    id: boolean;
  };
  const shape = pickByShape({} as MyType, {
    id: null,
    wrong: null
  });
  expectType<TypeEqual<{id: boolean}, TypeOfShape<typeof shape>>>(true);
}

function nestedTest() {
  type MyType = {
    id: boolean;
    nested: {id: string}
  };
  const shapeFull = pickByShape({} as MyType, {
    nested: null
  });
  expectType<TypeEqual<{nested: {id: string}}, TypeOfShape<typeof shapeFull>>>(true);
}

function nestedWrongKeyTest() {
  type MyType = {
    id: boolean;
    nested: null | {id: string}
  };
  const shapeFull = pickByShape({} as MyType, {
    nested: {
      id: null,
      wrong: null
    }
  });
  expectType<TypeEqual<{nested: null | {id: string}}, TypeOfShape<typeof shapeFull>>>(true);
}

function nestedPartialTest() {
  type MyType = {
    id: boolean;
    nested: {id: string; name: string}
  };
  const shapeFull = pickByShape({} as MyType, {
    nested: {name: null}
  });
  expectType<TypeEqual<{nested: {name: string}}, TypeOfShape<typeof shapeFull>>>(true);
}

function keepNullableTest() {
  type MyType = {
    id: boolean;
    nested: null | {id: string}
  };
  const shapeFull = pickByShape({} as MyType, {
    nested: null
  });
  expectType<
    TypeEqual<{nested: null | {id: string}}, TypeOfShape<typeof shapeFull>>
  >(true);
}

function keepOptionalPropsTest() {
  type MyType = {
    id?: string;
  };

  const shapeFull = pickByShape({} as MyType, {
    id: null
  });

  expectType<TypeEqual<{id?: string}, TypeOfShape<typeof shapeFull>>>(true);
}

function arrayTypes() {
  type MyType = {foo: {id: string, name: string}[]};
  const sss = pickByShape({} as MyType, {
    foo: {id: null}
  });

  expectType<TypeEqual<{foo: {id: string}[]}, TypeOfShape<typeof sss>>>(true);
}

function nullableArrayTypes() {
  type NullableArray = null | {foo: string}[];
  const sss = pickByShape({} as NullableArray, {
    foo: null
  });

  expectType<TypeEqual<null | {foo: string}[], TypeOfShape<typeof sss>>>(true);
}
