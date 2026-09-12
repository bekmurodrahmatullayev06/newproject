// Func1. a sonning n-darajasini hisoblash
function power(a, n) {
  return a ** n;
}

console.log("Func1:", power(3, 5));

// Func2. O'rta arifmetik va o'rta geometrik

function mean(a, b) {
  let arifmetik = (a + b) / 2;
  let geometrik = (a * b) ** (1 / 2);

  return `${arifmetik}, ${geometrik}`;
}

console.log("Func2:", mean(10, 20));

// Func3. Haqiqiy sonning ishorasini aniqlash

function sign(n) {
  if (n > 0) return 1;
  if (n < 0) return -1;
  return 0;
}

console.log("Func3:", sign(10)); // n orniga hohlagan son qoyib tekshiring

// Func4. Kvadrat tenglamaning ildizlar soni
function numberOfRoots(A, B, C) {
  let D = B ** 2 - 4 * A * C;

  if (D > 0) {
    return 2;
  } else if (D === 0) {
    return 1;
  } else {
    return 0;
  }
}

console.log("Func4:", numberOfRoots(1, -6, 9));

// Func5. Doiraning yuzini hisoblash

function areaCircle(R) {
  return Math.PI * R ** 2;
}

console.log("Func5:", areaCircle(5));

// Func6. A va B orasidagi sonlar yig'indisi

/*function sumRange(A, B) {
  if (A > B) return 0;

  let sum = 0;
  for (let i = A; i <= B; i++) {
    sum += i;
  }
  return sum;
}

console.log("Func6:", sumRange(8, 10)); */ //shuni unchalik tushunmadim

// Func7. Arifmetik amallarni bajaruvchi kalkulyator

function calc(A, B, S) {
  if (S === "+") {
    return A + B;
  } else if (S === "-") {
    return A - B;
  } else if (S === "*") {
    return A * B;
  } else if (S === "/") {
    return A / B;
  } else {
    return 0;
  }
}

console.log("Func7:", calc(10, 15, "*")); // 150
console.log("Func7:", calc(7, 8, "+")); // 15

// Func8. Sonning juft-toqligini aniqlash

function isEven(K) {
  return K % 2 === 0;
}

console.log("Func8:", isEven(8)); // true

// Func9. 3 ta sonni saralash (o'sish tartibida)

/*function sortABC(a, b, c) {
  let numbers = [a, b, c];
  numbers.sort((x, y) => x - y);

  return numbers.join(", ");
}

console.log("Func9:", sortABC(10, 5, 8)); // 5, 8, 10*/

// Func10. K soni N sonining darajasimi?

function isPowerN(K, N) {
  if (K === 1) return true; // 1 bo'lib qolsa - darajasi bo'ladi
  if (K < 1) return false; // 1 dan kichik bo'lib ketsa - darajasi emas

  return isPowerN(K / N, N); // K ni N ga bo'lib, qayta chaqiramiz
}

console.log("Func10:", isPowerN(81, 3)); // true
console.log("Func10:", isPowerN(20, 2)); // false
console.log("Func10:", isPowerN(81, 3)); // true

//==============================================================
//  for va while dan 15 ta vazifa
//====================
// For1. a va b orasidagi barcha sonlar berilgan va ularning butun  sonlarini chiqarish

function for1(a, b) {
  let count = 0;
  for (let i = a; i <= b; i++) {
    console.log(i);
    count++;
  }
  console.log("Jami sonlar soni:", count);
}

console.log("--- For1 ---");
for1(3, 7);

// For2. Sonlarni kamayish tartibida chiqarish (a va b kirmaydi)

function for2(a, b) {
  let count = 0;
  for (let i = b - 1; i > a; i--) {
    console.log(i);
    count++;
  }
  console.log("Jami sonlar soni:", count);
}

console.log("\n--- For2 ---");
for2(3, 8);

// For3. 1, 2, ..., 10 kg konfet narxini hisoblash

function for3(narx) {
  for (let kg = 1; kg <= 10; kg++) {
    console.log(`${kg} kg konfet narxi: ${kg * narx} so'm`);
  }
}

console.log("\n--- For3 ---");
for3(15000);

// For4. 1.2, 1.4, ..., 2 kg konfet narxini hisoblash

/*function for4(narx) {
  for (let kg = 1.2; kg <= 2.0; kg += 0.2) {
    let exactKg = Number(kg.toFixed(1));
    console.log(`${exactKg} kg konfet narxi: ${exactKg * narx} so'm`);
  }
}

console.log("\n--- For4 ---");
for4(20000);
*/

// For5.

function for5(a, b) {
  let sum = 0;
  for (let i = a; i <= b; i++) {
    sum += i;
  }
  return sum;
}

console.log("\n--- For5 ---");
console.log("Yig'indi:", for5(3, 6));

// For6.

function for6(a, b) {
  let product = 1;
  for (let i = a; i <= b; i++) {
    product *= i;
  }
  return product;
}

console.log("\n--- For6 ---");
console.log("Ko'paytma:", for6(3, 5));

// For7.

function for7(a, b) {
  let sum = 0;
  for (let i = a; i <= b; i++) {
    sum += i ** 2;
  }
  return sum;
}

console.log("\n--- For7 ---");
console.log("Kvadratlar yig'indisi:", for7(2, 4));

// For8.

function for8(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += 1 / i;
  }
  return sum;
}

console.log("\n--- For8 ---");
console.log("Yig'indi:", for8(4));

function for9(n) {
  let product = 1;
  for (let i = 1; i <= n; i++) {
    //
    product *= 1 + i / 10; // shu qismlariga tushunish qiyn boldi
  }
  return product;
}

console.log("\n--- For9 ---");
console.log("Ko'paytma:", for9(3));

// For10.

function for10(n) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += 2 * i - 1;
    console.log(`${i} ning kvadrati: ${sum}`);
  }
}

console.log("\n--- For10 ---");
for10(4);

// For11. a^n (a ning n-darajasi)

function for11(a, n) {
  let result = 1;
  for (let i = 1; i <= n; i++) {
    result *= a;
  }
  return result;
}

console.log("\n--- For11 ---");
console.log("Daraja:", for11(3, 4));

// For12. a ning 1 dan n gacha bo'lgan barcha darajalarini chiqarish

function for12(a, n) {
  let power = 1;
  for (let i = 1; i <= n; i++) {
    power *= a;
    console.log(`${a}^${i} = ${power}`);
  }
}

console.log("\n--- For12 ---");
for12(2, 4);

// For13. S = 1 + a^1 + a^2 + ... + a^n

/*function for13(a, n) {
  let sum = 1;
  let power = 1;

  for (let i = 1; i <= n; i++) {
    power *= a;
    sum += power;
    console.log(`${a}^${i} = ${power}`);
  }

  console.log("Jami yig'indi:", sum);
}

console.log("\n--- For13 ---");
for13(2, 3);
*/ // bu qismlariga tushunish qiyn boldi

// For14. S = 1! + 2! + 3! + ... + n!

function for14(n) {
  let sum = 0;
  let fact = 1;

  for (let i = 1; i <= n; i++) {
    fact *= i;
    sum += fact;
  }

  return sum;
}

console.log("\n--- For14 ---");
console.log("Faktoriyallar yig'indisi:", for14(4));

// For15. S = 1^K + 2^K + ... + N^K

function for15(N, K) {
  let sum = 0;
  for (let i = 1; i <= N; i++) {
    sum += i ** K;
  }
  return sum;
}

console.log("\n--- For15 ---");
console.log("Yig'indi:", for15(3, 2));
