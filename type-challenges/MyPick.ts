type MyPick<T, K extends keyof T> = {
  [key in K]: T[key]
}

interface userInfo {
  name: string,
  age: number,
}

type name = 'firstname' | 'lastname'

type TName = {
  [key in name] : string
}

type A1 = 'x' extends 'x' | 'y' ? number : string;

let X:A1;