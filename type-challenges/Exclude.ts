// type Flatten<T> = T extends any[] ? T[number] : T;
type Flatten<T> = T extends Array<infer Item> ? Item : T; //使用infer从true分支中比较的类型进行推断的方法

type Str = Flatten<string[]>;
type Num = Flatten<number>;

type MyExclude<T, U> = T extends U ? never: T;
