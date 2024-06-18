let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;

console.log(strLength);

let strings: Array<string | number> = ["one", "two", "three", 4];

console.log(strings[3]);

enum Direction {
  Up,
  Down,
  Left,
  Right
}

let move: Direction = Direction.Down;
