import { expectType, TypeEqual } from "ts-expect";
import { pickByShape } from "./sandbox";
import { ExpandRecursively } from "./utils";


function basicTest() {
  type MyType = {
    id: boolean;
    name: string;
  };
  const shape = pickByShape({} as MyType, {
    id: null
  });
  expectType<TypeEqual<{id: boolean}, typeof shape._Type>>(true);
}

function nestedTest() {
  type MyType = {
    id: boolean;
    nested: {id: string}
  };
  const shapeFull = pickByShape({} as MyType, {
    nested: null
  });
  expectType<TypeEqual<{nested: {id: string}}, typeof shapeFull._Type>>(true);
}

function nestedPartialTest() {
  type MyType = {
    id: boolean;
    nested: {id: string; name: string}
  };
  const shapeFull = pickByShape({} as MyType, {
    nested: {name: null}
  });
  expectType<TypeEqual<{nested: {name: string}}, typeof shapeFull._Type>>(true);
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
    TypeEqual<{nested: null | {id: string}}, typeof shapeFull._Type>
  >(true);
}

function arrayTypes() {
  type MyType = {foo: {id: string, name: string}[]};
  const sss = pickByShape({} as MyType, {
    foo: {id: null}
  });

  expectType<TypeEqual<{foo: {id: string}[]}, typeof sss._Type>>(true);
}

function nullableArrayTypes() {
  type NullableArray = null | {foo: string}[];
  const sss = pickByShape({} as NullableArray, {
    foo: null
  });

  expectType<TypeEqual<null | {foo: string}[], typeof sss._Type>>(true);
}
