import type {Equal, Expect} from "./test-utils";

type t = keyof unknown; // never

// console.log(typeof t);
let flag2: null = null;

interface Map<T> {
  [key: string]: T
}

let keys: keyof Map<number>;

interface Type {
  a: string
  b: number
  c: boolean
  d: undefined
  e: null
  f: never
  h: object
}

type Props = keyof Type // 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'h'
type Test = Type[Props] //string | number | boolean | object 注意 never null undefined 被排除掉了

let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
let strLenght2 = (<string>someValue).length;

type Includes<T extends readonly any[], U> = {
  [P in T[number]]: true
}[U] extends true ? true : false;

function func<T>(value: T): T {
  let data: T;
  data = value;
  return data;
}

// https://blog.csdn.net/qq_16181837/article/details/128595096
type IsEqual<T, U> =
  (<G>() => G extends T ? 1 : 2) extends (<G>() => G extends U ? 1 : 2)
    ? true
    : false;

let x: <T>() => (T extends number ? 1 : 2);
let y: <T>() => (T extends string ? 1 : 2);


type arrType<T extends readonly any[], U> = {
  [key in T[number]]: true
}[U]

type case1 = arrType<[false, 2, 3, 5, 6, 7], false>;
type case2 = arrType<[1 | 2], 1>;

let res1: case1;
let res2: case2

type inferType1<T> = T extends Array<infer U> ? U : T;
type inferType2<T> = T extends (infer U)[] ? U : T;

let res3: inferType1<Array<number>>
