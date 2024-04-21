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

// 一般 JavaScript 拷贝问题需要解决三个问题
// 1. JSON.parse(JSON.stringify(obj)) 不支持循环引用、不支持特殊对象拷贝（比如函数、正则表达式、Date对象、undefined等）、不支持自定义对象类型、存在序列化解析性能问题
// 2. 递归层级过深导致内存溢出问题 -> 用迭代法实现递归
// 3. 循环引用 -> 利用一个 map 存储
const isObjectAndArray = (obj) => {
  const type = Object.prototype.toString.call(obj).slice(8, -1);
  return type === "Object" || type === "Array";
};
export function clone(obj, map = new WeakMap()) {
  if (obj === null || !isObjectAndArray(obj)) {
    // 属性值为null或者基本类型
    return obj;
  }
  const stack = [
    {
      source: obj,
      target: Array.isArray(obj) ? [] : {},
    },
  ];
  while (stack.length) {
    const { source, target } = stack.pop();
    // map
    if (map.has(source)) {
      map.get(source);
      continue;
    }
    map.set(source, target);
    // traversal keys
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        if (isObjectAndArray(source[key])) {
          const newValue = Array.isArray(source[key]) ? [] : {};
          target[key] = newValue;
          stack.push({ source: source[key], target: newValue });
        } else {
          target[key] = source[key];
        }
      }
    }
  }
  return map.get(obj);
}
console.log(clone(testObj1));
console.log(clone(testObj2));
