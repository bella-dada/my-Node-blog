function myInstanceof(leftValue, rightValue) {
  let rightPro = rightValue.prototype;
  leftValue = leftValue.__proto__;
  while (true) {
    if (leftValue === null) {
      return false;
    }
    if (leftValue === rightPro) {
      return true;
    }
    leftValue = leftValue.__proto__;
  }
}

function Foo() {}
var arr = [];
var obj = {};
console.log(myInstanceof(Foo, Function));
console.log(myInstanceof(arr, Array));
console.log(myInstanceof(arr, Function));
console.log(myInstanceof(obj, Object));
console.log(myInstanceof(Foo, Object));
