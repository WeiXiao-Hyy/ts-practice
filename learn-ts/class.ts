class Point {
  readonly id: number = 2;
  x!: number;
  y!: number;
  _name: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.id = 1;
    this._name = "ts";
  }

  get name() {
    return this._name;
  }

  set name(value) {
    this._name = value;
  }
}

class MyClass {
  [s: string]: boolean | ((s: string) => boolean);

  f() {
    return true;
  }
}

interface A {
  get(name: string): boolean;
}

class B implements A {
  // get(s:number) {
  // return true;
  // }
  get(s: string) {
    return true;
  }
}

class Car {
  id: number = 1;
  move(): void {}
}

class MyCar implements Car {
  id: number = 2;
  move(): void {}
}

interface PointConstructor {
  new (x: number, y: number): Point;
}

function createPoint(
  PointClass: PointConstructor,
  x: number,
  y: number
): Point {
  return new PointClass(x, y);
}

class Person {
  name: string = "";
}

const obj = { name: "ts" };

const p: Person = obj; // obj不是Person的实例，但是两者的类型是相同的

console.log(p instanceof Person);

class Father {
  greet() {
    console.log("hello ts");
  }
}

class Son extends Father {
  greet() {
    super.greet();
    console.log("hello ts son");
  }
}

let son = new Son();
son.greet();

interface Animal {
  animalStuff: any;
}

interface Dog extends Animal {
  dogStuff: any;
}

class AnimalHouse {
  resident: Animal;

  constructor(animal: Animal) {
    this.resident = animal;
  }
}
class DogHouse extends AnimalHouse {
  declare resident: Dog;

  constructor(dog: Dog) {
    super(dog);
  }
}

const dog = {
  animalStuff: "animalStuff",
  dogStuff: "dogStuff",
};

const dogHouse = new DogHouse(dog);

console.log(dogHouse.resident);

class staticClass {
  public static x:number = 1;
  public z:number = 1;
  protected static y:string = '1';
}

class staticSonClass extends staticClass {
  static getY() {
    return staticClass.x;
  }
}

console.log(staticSonClass.getY());

abstract class AAbs {
  abstract execute():string;
}

class BC extends AAbs {
  execute(): string {
    return "B executed"
  }
}

class ThisA {
  name = 'A';

  getName(this: ThisA) {
    return this.name;
  }
}

const a = new ThisA();
console.log(a.getName());

const b = a.getName;
b();