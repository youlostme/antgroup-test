/**
 * 实现 clone 函数，支持深拷贝对象，请考虑尽可能多的情况。
 */

/** case 1 */
const testObj1 = {
  string: "a",
  number: 123,
  un: undefined,
  obj: {
    string: "a",
  },
  regExp: /^abc/,
};

/** case 2 */
const testObj2: any = {};
testObj2.testObj2 = testObj2;

// 一般 JavaScript 拷贝问题需要解决如下几个问题
// 1. 解决类型判断不够精确问题
// 2. 解决递归嵌套过多性能问题
// 3. 避免循环引用问题
// 4. 支持特殊对象
// 5. 支持自定义对象

// 迭代写法
// 解决递归层级过深导致内存溢出问题
const sameObj = {
  c: 1,
};
class CustomObj {
  constructor(value) {
    this.value = value;
  }
}
let input = {
  a: {
    b: sameObj,
    d: 2,
  },
  e: [1, 2, 3],
  keyForSameObj: null,
  self: null,
};
input.keyForSameObj = sameObj;
input.self = input;
input.keyForCustomObj = new CustomObj("test");
const deepCopyIterative = (input) => {
  const stack = [];
  const map = new WeakMap();
  const isObjectAndArray = (obj) => {
    const type = Object.prototype.toString.call(obj).slice(8, -1);
    return type === "Object" || type === "Array";
  };
  const copy = (obj) => {
    let newObj = Array.isArray(obj) ? [] : {};
    map.set(obj, newObj);
    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (obj[key] instanceof CustomObj) {
          // 如果值是 CustomObj 的实例，则直接引用
          newObj[key] = obj[key];
        } else if (isObjectAndArray(obj[key])) {
          // 如果属性值是对象或数组，将其入栈等待处理
          stack.push({
            parent: newObj,
            key: key,
            value: obj[key],
          });
        } else {
          newObj[key] = obj[key];
        }
      }
    }
    return newObj;
  };
  const rootCopy = copy(input);
  while (stack.length > 0) {
    const { parent, key, value } = stack.pop();
    if (!map.has(value)) {
      // 如果值没有被复制过，进行复制并记录映射
      parent[key] = copy(value);
    } else {
      // 如果值已经被复制过，直接使用映射的副本
      parent[key] = map.get(value);
    }
  }
  return rootCopy;
};

const res = deepCopyIterative(input);
console.log(res.a.b === res.keyForSameObj); // true
console.log(res.self.self.self); // 即input自身
