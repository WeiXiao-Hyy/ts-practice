var Task = {
  setID: function (ID) {
    this.id = ID;
  },
  outputID: function () {
    console.log(this.id)
  },
}

var XYZ = Object.create(Task);

XYZ.prepareTask = function (ID, Label) {
  this.setID(ID);
  this.label = Label;
}

function Foo() {

}

var a1 = new Foo();

console.log(a1.constructor === (Foo.prototype.constructor))
console.log(a1.constructor.name)


function Foo(who) {
  this.me = who;
}

Foo.prototype.identify = function () {
  return "I am " + this.me;
};

function Bar(who) {
  Foo.call(this, who);
}

Bar.prototype = Object.create(Foo.prototype);

Bar.prototype.speak = function () {
  alert("Hello, " + this.identify() + ".");
};

var b1 = new Bar("b1");
var b2 = new Bar("b2");

b1.speak();
b2.speak();

Foo = {
  init: function (who) {
    this.me = who;
  },
  identify: function () {
    return "I am " + this.me;
  }
};

Bar = Object.create(Foo);

Bar.speak = function () {
  alert("Hello, " + this.identify() + ".");
};

var b1 = Object.create(Bar);
b1.init("b1");
var b2 = Object.create(Bar);

// 父类
function Controller() {
  this.errors = [];
}

Controller.prototype.showDialog = function (title, msg) {
  // 给用户显示标题和消息
};
Controller.prototype.success = function (msg) {
  this.showDialog("Success", msg);
};
Controller.prototype.failure = function (err) {
  this.errors.push(err);
  this.showDialog("Error", err);
};

// 子类
function LoginController() {
  Controller.call(this);
}

// 把子类关联到父类
LoginController.prototype =
  Object.create(Controller.prototype);
LoginController.prototype.getUser = function () {
  return document.getElementById("login username").value;
};
LoginController.prototype.getPassword = function () {
  return document.getElementById("login password").value;
};
LoginController.prototype.validateEntry = function (user, pw) {
  user = user || this.getUser();
  pw = pw || this.getPassword();
  if (!(user && pw)) {
    return this.failure(
      "Please enter a username & password! "
    );
  } else if (pw.length < 5) {
    return this.failure(
      "Password must be 5+ characters! "
    );
  }

  // 如果执行到这里说明通过验证
  return true;
};
// 重写基础的failure()
LoginController.prototype.failure = function (err) {
  // “super”调用
  Controller.prototype.failure.call(
    this,
    "Login invalid: " + err
  );
};

// 子类
function AuthController(login) {
  Controller.call(this);
  // 合成
  this.login = login;
}

// 把子类关联到父类
AuthController.prototype =
  Object.create(Controller.prototype);
AuthController.prototype.server = function (url, data) {
  return $.ajax({
    url: url,
    data: data
  });
};
AuthController.prototype.checkAuth = function () {
  var user = this.login.getUser();
  var pw = this.login.getPassword();

  if (this.login.validateEntry(user, pw)) {
    this.server("/check-auth", {
      user: user,
      pw: pw
    })
      .then(this.success.bind(this))
      .fail(this.failure.bind(this));
  }
};
// 重写基础的success()
AuthController.prototype.success = function () {
  // “super”调用
  Controller.prototype.success.call(this, "Authenticated! ");
};
// 重写基础的failure()
AuthController.prototype.failure = function (err) {
  // “super”调用
  Controller.prototype.failure.call(
    this,
    "Auth Failed: " + err
  );
};

var auth = new AuthController(
  // 除了继承，我们还需要合成
  new LoginController()
);
auth.checkAuth();

// 父类
function Widget(width, height) {
  this.width = width || 50;
  this.height = height || 50;
  this.$elem = null;
}

Widget.prototype.render = function ($where) {
  if (this.$elem) {
    this.$elem.css({
      width: this.width + "px",
      height: this.height + "px"
    }).appendTo($where);
  }
};

// 子类
function Button(width, height, label) {
  // 调用“super”构造函数
  Widget.call(this, width, height);
  this.label = label || "Default";
  this.$elem = $("<button>").text(this.label);
}

// 让Button“继承”Widget
Button.prototype = Object.create(Widget.prototype);

// 重写render(..)
Button.prototype.render = function ($where) {
  // “super”调用
  Widget.prototype.render.call(this, $where);
  this.$elem.click(this.onClick.bind(this));
};

Button.prototype.onClick = function (evt) {
  console.log("Button '" + this.label + "' clicked! ");
};
$(document).ready(function () {
  var $body = $(document.body);
  var btn1 = new Button(125, 30, "Hello");
  var btn2 = new Button(150, 40, "World");

  btn1.render($body);
  btn2.render($body);
});

// 对象委托
var Widget = {
  init: function (width, height) {
    this.width = width || 50;
    this.height = height || 50;
    this.$elem = null;
  },
  insert: function ($where) {
    if (this.$elem) {
      this.$elem.css({
        width: this.width + "px",
        height: this.height + "px"
      }).appendTo($where);
    }
  }
};

var Button = Object.create(Widget);

Button.setup = function (width, height, label) {
  // 委托调用
  this.init(width, height);
  this.label = label || "Default";

  this.$elem = $("<button>").text(this.label);
};
Button.build = function ($where) {              // 委托调用
  this.insert($where);
  this.$elem.click(this.onClick.bind(this));
};
Button.onClick = function (evt) {
  console.log("Button '" + this.label + "' clicked! ");
};

$(document).ready(function () {
  var $body = $(document.body);

  var btn1 = Object.create(Button);
  btn1.setup(125, 30, "Hello");

  var btn2 = Object.create(Button);
  btn2.setup(150, 40, "World");

  btn1.build($body);
  btn2.build($body);
});
