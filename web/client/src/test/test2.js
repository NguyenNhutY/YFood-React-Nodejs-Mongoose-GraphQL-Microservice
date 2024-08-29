var fullName = new String("Y");

class Test {
  a = 3;
  codePointAt() {}
  match() {}
  replace() {}
}

const test = new Test();
const test1 = new test.constructor();
function Constructor() {
  this.test = 3;
}
Constructor.prototype.fullName = () => {};
class Test1 {
  hello = 1;
}
const test4 = new Constructor(Test1);

//   console.log(test4);
Test1.prototype.constructor = Constructor;
const test3 = new Test1.prototype.constructor();

console.log(test3);
