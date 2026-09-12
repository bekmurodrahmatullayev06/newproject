// ==================== ALL ARRAY TASKS IN ONE FILE ====================

// --- Array1 ---
function getLevel2(n) {
  let result = [];
  for (let i = 1; i <= n; i++) {
    result.push(Math.pow(2, i));
  }
  return result;
}

// --- Array2 ---
function generateArray(n, A, B) {
  let arr = [A, B];
  let sum = A + B;
  for (let i = 2; i < n; i++) {
    arr.push(sum);
    sum += sum;
  }
  return arr;
}

// --- Array3 ---
function printReverse(arr) {
  for (let i = arr.length - 1; i >= 0; i--) {
    console.log(arr[i]);
  }
}

// --- Array4 ---
function printOddsAndCount(arr) {
  let toqlar = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) {
      toqlar.push(arr[i]);
    }
  }
  console.log(toqlar.join(" ") + " toqlar soni = " + toqlar.length);
}

// --- Array5 ---
function printEvensThenOddsReverse(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) result.push(arr[i]);
  }
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] % 2 !== 0) result.push(arr[i]);
  }
  console.log(result.join(" "));
}

// --- Array6 ---
function printEvenIndices(arr) {
  for (let i = 0; i < arr.length; i += 2) {
    console.log(arr[i]);
  }
}

// --- Array7 ---
function printOddIndicesReverse(arr) {
  for (let i = arr.length - 1; i >= 0; i -= 2) {
    console.log(arr[i]);
  }
}

// --- Array8 ---
function printEvenThenOddIndices(arr) {
  for (let i = 0; i < arr.length; i += 2) console.log(arr[i]);
  for (let i = 1; i < arr.length; i += 2) console.log(arr[i]);
}

// --- Array9 ---
function printOddAscEvenDescIndices(arr) {
  for (let i = 1; i < arr.length; i += 2) console.log(arr[i]);
  for (let i = arr.length - 2; i >= 0; i -= 2) console.log(arr[i]);
}

// --- Array10 ---
function printZigZagPair(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    console.log(arr[left]);
    console.log(arr[left + 1]);
    console.log(arr[right]);
    console.log(arr[right - 1]);
    left += 2;
    right -= 2;
  }
}

// --- Array11 ---
function rangeOutSum(arr, K, L) {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    if (i < K || i > L) {
      sum += arr[i];
    }
  }
  return sum;
}

// --- Array12 ---
function splitTruthyFalsy(arr) {
  let truthy = [];
  let falsy = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i]) truthy.push(arr[i]);
    else falsy.push(arr[i]);
  }
  return { Truthy: truthy, Falsy: falsy };
}

// --- Array13 ---
function getOddMin(arr) {
  let min = arr[0];
  for (let i = 2; i < arr.length; i += 2) {
    if (arr[i] < min) min = arr[i];
  }
  return min;
}

// --- Array14 ---
function getEvenMax(arr) {
  let max = arr[1];
  for (let i = 3; i < arr.length; i += 2) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}

// --- Array15 ---
function getLastLocalMaxIndex(arr) {
  let lastLocalMaxIndex = -1;
  for (let i = 1; i < arr.length - 1; i++) {
    if (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]) {
      lastLocalMaxIndex = i;
    }
  }
  return lastLocalMaxIndex;
}

// ==================== TEST QILISH ====================
console.log("Array1:", getLevel2(5));
console.log("Array2:", generateArray(5, 2, 3));
console.log("Array11 Sum:", rangeOutSum([1, 2, 3, 4, 5, 6], 1, 3));
console.log("Array12:", splitTruthyFalsy([10, false, "", "Abdulaziz", null]));
console.log("Array13 Min:", getOddMin([7, 2, 3, 4, 1, 6]));
console.log("Array14 Max:", getEvenMax([7, 2, 3, 9, 1, 6]));
console.log("Array15 Index:", getLastLocalMaxIndex([1, 5, 2, 6, 3, 8, 4]));
