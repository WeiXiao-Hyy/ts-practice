var anotherObject = {
  _foo: 0,  // 实际存储值的地方

  set foo(val) {
    this._foo = val * 2;  // 设置存储值
  },
  get foo() {
    return this._foo;  // 获取存储值
  }
};

// Object.defineProperty(anotherObject, "foo", {
//   value: 3,
//   writable: true,
//   configurable: true,
//   enumerable: true,
// });

var myObject = Object.create(anotherObject);

myObject.foo = 4

console.log(myObject.foo)

function foo() {

}

var a = new foo();
var b = new foo();
console.log(Object.getPrototypeOf(a) === Object.getPrototypeOf(b));

function NothingSpecial() {
  console.log("Don't mind me! ");
}

var a = new NothingSpecial();
// "Don't mind me! "

a; // {}

function Foo(name) {
  this.name = name;
}

Foo.prototype.myName = function() {
  return this.name;
};

function Bar(name, label) {
  Foo.call(this, name);
  this.label = label;
}

// 我们创建了一个新的Bar.prototype对象并关联到Foo.prototype
Bar.prototype = Object.create(Foo.prototype);

// 注意！现在没有Bar.prototype.constructor了
// 如果你需要这个属性的话可能需要手动修复一下它

Bar.prototype.myLabel = function() {
  return this.label;
};

var a = new Bar("a", "obj a");

a.myName(); // "a"
a.myLabel(); // "obj a"

// 用来判断o1是否关联到（委托）o2的辅助函数
function isRelatedTo(o1, o2) {
  function F(){}
  F.prototype = o2;
  return o1 instanceof F;
}

var a = {};
var b = Object.create(a);

console.log(a.isPrototypeOf(b))

var foo = {
  something: function() {
    console.log("Tell me something good...");
  }
};

var bar = Object.create(foo);

bar.something(); // Tell me something good...

var anotherObject = {
  cool: function() {
    console.log("cool! ");
  }
};

var myObject = Object.create(anotherObject);

myObject.cool(); // "cool! "


var anotherObject = {
  cool: function() {
    console.log("cool! ");
  }
};

var myObject = Object.create(anotherObject);

myObject.doCool = function() {
  this.cool(); // 内部委托！
};

myObject.doCool(); // "cool! "
