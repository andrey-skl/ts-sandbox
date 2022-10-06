import { expectType, TypeEqual } from "ts-expect";
import { pickByShape } from "./sandbox";


function basicTest() {
  type MyType = {
    id: boolean;
    name: string;
  };
  const shape = pickByShape({} as MyType, {
    id: null
  });
  expectType<TypeEqual<{id: boolean}, typeof shape._T>>(true);
}

function nestedTest() {
  type MyType = {
    id: boolean;
    nested: {id: string}
  };
  const shapeFull = pickByShape({} as MyType, {
    nested: null
  });
  expectType<TypeEqual<{nested: {id: string}}, typeof shapeFull._T>>(true);
}

function nestedPartialTest() {
  type MyType = {
    id: boolean;
    nested: {id: string; name: string}
  };
  const shapeFull = pickByShape({} as MyType, {
    nested: {name: null}
  });
  expectType<TypeEqual<{nested: {name: string}}, typeof shapeFull._T>>(true);
}

function arrayTypes() {
  type NullableArray = null | {foo: string}[];
  const sss = pickByShape({} as NullableArray, {
    foo: null
  });

  expectType<TypeEqual<{foo: string}, typeof sss._T>>(true);
}
