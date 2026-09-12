// 1-DARAJA — BOSHLANG‘ICH

// 1. map()
const numbers1 = [2, 4, 6, 8, 10];
const res1 = numbers1.map((num) => num * 2);
console.log("1:", res1); // [ 4, 8, 12, 16, 20 ]

// 2. map()
const names2 = ["Ali", "Vali", "Sardor", "Temur"];
const res2 = names2.map((name) => `Hello, ${name}`);
console.log("2:", res2); // [ 'Hello, Ali', 'Hello, Vali', 'Hello, Sardor', 'Hello, Temur' ]

// 3. filter()
const numbers3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const res3 = numbers3.filter((num) => num % 2 === 0);
console.log("3:", res3); // [ 2, 4, 6, 8, 10 ]

// 4. filter()
const users4 = [
  { name: "Ali", age: 17 },
  { name: "Vali", age: 21 },
  { name: "Sardor", age: 16 },
  { name: "Temur", age: 25 },
];
const res4 = users4.filter((user) => user.age > 18);
console.log("4:", res4); // [ { name: 'Vali', age: 21 }, { name: 'Temur', age: 25 } ]

// 5. find()
const products5 = [
  { title: "Phone", price: 80 },
  { title: "Laptop", price: 500 },
  { title: "Mouse", price: 50 },
];
const res5 = products5.find((product) => product.price > 100);
console.log("5:", res5); // { title: 'Laptop', price: 500 }

// 2-DARAJA — O‘RTACHA

// 6. find()
const users6 = [
  { id: 1, name: "Ali" },
  { id: 2, name: "Vali" },
  { id: 3, name: "Sardor" },
  { id: 4, name: "Temur" },
];
const res6 = users6.find((user) => user.id === 3);
console.log("6:", res6); // { id: 3, name: 'Sardor' }

// 7. filter()
const products7 = [
  { title: "Phone", category: "Electronics" },
  { title: "T-shirt", category: "Fashion" },
  { title: "Laptop", category: "Electronics" },
  { title: "Book", category: "Books" },
];
const res7 = products7.filter((product) => product.category === "Electronics");
console.log("7:", res7); // [ { title: 'Phone', category: 'Electronics' }, { title: 'Laptop', category: 'Electronics' } ]

// 8. map()
const products8 = [
  { id: 1, title: "Phone", price: 500 },
  { id: 2, title: "Laptop", price: 1000 },
  { id: 3, title: "Mouse", price: 50 },
];
const res8 = products8.map((product) => product.title);
console.log("8:", res8); // [ 'Phone', 'Laptop', 'Mouse' ]

// 9. some()
const users9 = [
  { name: "Ali", age: 17 },
  { name: "Vali", age: 21 },
];
const res9 = users9.some((user) => user.age > 18);
console.log("9:", res9); // true

// 10. every()
const numbers10 = [2, 5, 8, 10, 15];
const res10 = numbers10.every((num) => num > 0);
console.log("10:", res10); // true

// 11. includes()
const tech11 = ["HTML", "CSS", "JavaScript", "React"];
const res11 = tech11.includes("React");
console.log("11:", res11); // true

// 12. indexOf()
const tech12 = ["HTML", "CSS", "JavaScript", "React"];
const res12 = tech12.indexOf("JavaScript");
console.log("12:", res12); // 2

// 3-DARAJA — REDUCE()

// 13. reduce()
const numbers13 = [10, 20, 30, 40, 50];
const res13 = numbers13.reduce((sum, num) => sum + num, 0);
console.log("13:", res13); // 150

// 14. reduce()
const products14 = [
  { title: "Phone", price: 500 },
  { title: "Laptop", price: 1000 },
  { title: "Mouse", price: 50 },
];
const res14 = products14.reduce((total, p) => total + p.price, 0);
console.log("14:", res14); // 1550

// 15. reduce()
const numbers15 = [12, 45, 7, 89, 23, 56];
const res15 = numbers15.reduce(
  (max, num) => (num > max ? num : max),
  numbers15[0],
);
console.log("15:", res15); // 89

// 16. reduce()
const users16 = [
  { name: "Ali", age: 18 },
  { name: "Vali", age: 20 },
  { name: "Sardor", age: 22 },
];
const res16 = users16.reduce((total, u) => total + u.age, 0);
console.log("16:", res16); // 60

// 4-DARAJA — SORT() VA REVERSE()

// 17. sort()
const numbers17 = [45, 12, 89, 3, 67, 21];
const res17 = [...numbers17].sort((a, b) => a - b);
console.log("17:", res17); // [ 3, 12, 21, 45, 67, 89 ]

// 18. sort()
const numbers18 = [45, 12, 89, 3, 67, 21];
const res18 = [...numbers18].sort((a, b) => b - a);
console.log("18:", res18); // [ 89, 67, 45, 21, 12, 3 ]

// 19. sort()
const products19 = [
  { title: "Phone", price: 800 },
  { title: "Mouse", price: 50 },
  { title: "Laptop", price: 1200 },
  { title: "Keyboard", price: 100 },
];
const res19 = [...products19].sort((a, b) => a.price - b.price);
console.log("19:", res19);
// [
//   { title: 'Mouse', price: 50 },
//   { title: 'Keyboard', price: 100 },
//   { title: 'Phone', price: 800 },
//   { title: 'Laptop', price: 1200 }
// ]

// 20. sort()
const users20 = [
  { name: "Ali", age: 18 },
  { name: "Vali", age: 25 },
  { name: "Sardor", age: 20 },
];
const res20 = [...users20].sort((a, b) => b.age - a.age);
console.log("20:", res20);
// [
//   { name: 'Vali', age: 25 },
//   { name: 'Sardor', age: 20 },
//   { name: 'Ali', age: 18 }
// ]

// 21. reverse()
const names21 = ["Ali", "Vali", "Sardor", "Temur"];
const res21 = [...names21].reverse();
console.log("21:", res21); // [ 'Temur', 'Sardor', 'Vali', 'Ali' ]

// 5-DARAJA — SLICE() VA SPLICE()

// 22. slice()
const fruits22 = ["Apple", "Banana", "Orange", "Mango", "Kiwi"];
const res22 = fruits22.slice(1, 4);
console.log("22:", res22); // [ 'Banana', 'Orange', 'Mango' ]

// 23. slice()
const fruits23 = ["Apple", "Banana", "Orange", "Mango", "Kiwi"];
const res23 = fruits23.slice(-3);
console.log("23:", res23); // [ 'Orange', 'Mango', 'Kiwi' ]

// 24. splice()
const names24 = ["Ali", "Vali", "Sardor", "Temur"];
names24.splice(names24.indexOf("Vali"), 1);
console.log("24:", names24); // [ 'Ali', 'Sardor', 'Temur' ]

// 25. splice()
const names25 = ["Ali", "Vali", "Sardor", "Temur"];
const idx25 = names25.indexOf("Sardor");
if (idx25 !== -1) names25.splice(idx25, 1, "Jasur");
console.log("25:", names25); // [ 'Ali', 'Vali', 'Jasur', 'Temur' ]

// 6-DARAJA — CONCAT() VA JOIN()

// 26. concat()
const frontend = ["HTML", "CSS", "JavaScript"];
const backend = ["Node.js", "Express", "MongoDB"];
const res26 = frontend.concat(backend);
console.log("26:", res26); // [ 'HTML', 'CSS', 'JavaScript', 'Node.js', 'Express', 'MongoDB' ]

// 27. join()
const words27 = ["I", "love", "JavaScript"];
const res27 = words27.join(" ");
console.log("27:", res27); // "I love JavaScript"

// 28. join()
const numbers28 = [1, 2, 3, 4, 5];
const res28 = numbers28.join("-");
console.log("28:", res28); // "1-2-3-4-5"

// 7-DARAJA — FLAT()

// 29. flat()
const arr29 = [1, [2, 3], [4, 5], 6];
const res29 = arr29.flat();
console.log("29:", res29); // [ 1, 2, 3, 4, 5, 6 ]

// 30. flat()
const arr30 = [1, [2, [3, [4]]]];
const res30 = arr30.flat(Infinity);
console.log("30:", res30); // [ 1, 2, 3, 4 ]
