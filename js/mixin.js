// “传统的JavaScript类”Vehicle
function Vehicle() {
  this.engines = 1;
}

Vehicle.prototype.ignition = function() {
  console.log("Turning on my engine.");
};

Vehicle.prototype.drive = function() {
  this.ignition();
  console.log("Steering and moving forward! ");
};

// “寄生类” Car
function Car() {
  // 首先，car是一个Vehicle
  var car = new Vehicle();

  // 接着我们对car进行定制
  car.wheels = 4;

  // 保存到Vehicle::drive()的特殊引用
  var vehDrive = car.drive;

  // 重写Vehicle::drive()
  car.drive = function() {
    vehDrive.call(this);
    console.log(
      "Rolling on all " + this.wheels + " wheels! "
    );
  }
  return car;
}

var myCar = new Car();

myCar.drive();
// Turning on my engine.
// Steering and moving forward!
// Rolling on all 4 wheels!

var Something = {
  cool: function() {
    this.greeting = "Hello World";
    this.count = this.count ? this.count + 1 : 1;
  }
};

Something.cool();
Something.greeting; // "Hello World"
Something.count; // 1

var Another = {
  cool: function() {
    // 隐式把Something混入Another
    Something.cool.call(this);
  }
};

Another.cool();
Another.greeting; // "Hello World"
Another.count; // 1（count不是共享状态）
