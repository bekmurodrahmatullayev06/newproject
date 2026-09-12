// // const talabalar = ['Ali', 'Vali', 'Hasan', 'Husan', 'Olim']

// // const mixedarray = [1, false, null, {}, [], undefined, ]

// // const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

// // console.log( nums);

// // console.log( nums[6]);

// // console.log( 'mixedarray', mixedarray.length);
// // console.log("talabalar", talabalar.length);

// // console.log(talabalar[0]);
// // console.log(talabalar[1]);
// // console.log(talabalar[2]);
// // console.log(talabalar[3]);
// // console.log(talabalar[4]);

// // console.log('--------------------------------------------------------------------------');

// // const cars = [];

// // cars[0] = 'BMW';
// // cars[1] = 'Mercedes';
// // cars[2] = 'Opel';
// // cars[3] = 'Mazda';
// // cars[4] = 'Lada';

// // console.log(cars[0]);
// // console.log(cars[1]);
// // console.log(cars[2]);
// // console.log(cars[3]);
// // console.log(cars[4]);

// const ovqatlar=['osh'];

// function addnewelement(newelement){
//     ovqatlar[ovqatlar.length] = newelement;
//     console.log(ovqatlar);

// }

// addnewelement('qovun');
// addnewelement('tarvuz2');
// addnewelement('handalak3');

// const mevalar=['olma', 'uzum', 'anor', 'banana', 'ananas'];

// mevalar.push('qovun');
// mevalar.push('tarvuz');
// mevalar.push('handalak');
// console.log(mevalar);

// //==============================================================================================================

// mevalar.pop();
// mevalar.pop();
// mevalar.pop();
// console.log(mevalar);

console.log(
  "shift",
  "unshift",
  "push",
  "pop",
  "splice",
  "slice",
  "sort",
  "reverse",
  "concat",
  "join",
  "toString",
  "forEach",
  "map",
  "filter",
  "find",
  "findIndex",
  "every",
  "some",
  "reduce",
  "reduceRight",
  "flat",
  "flatMap",
  "copyWithin",
  "entries",
  "keys",
  "values",
);

// const talabalar = ['Ali', 'Vali', 'Hasan', 'Husan', 'Olim'];

// talabalar.sort();
// console.log(talabalar);
// talabalar.reverse();
// console.log(talabalar);
// talabalar.shift();
// console.log(talabalar);
// talabalar.unshift('Bunyod');
// console.log(talabalar);

// const feild = [
//   "IT",
//   "teacher",
//   "programmer",
//   "web developer",
//   "web designer",
//   "sen",
//   "men",
// ];

// //console.log(feild.join("-"));

// // includes = element royxatda bor yoki yoqligini tekshiradi

// console.log(feild.includes("teacher"));
// console.log(feild.includes("teacher2"));

// // indexOf = element royxatdan qaysi indexda borligini tekshiradi
// console.log(feild.indexOf("teacher"));
// console.log(feild.indexOf("teacher2"));
// console.log(feild.indexOf("web designer"));
// console.log(feild.indexOf("programmer"));



let students = ['Ali', 'Vali', 'Hasan', ];




console.log(students);
console.log(newStudents);



function addStudent() {
    students.push('Husan');
    console.log(students.length);
  } 

  addStudent();

  let numbers = [20, 30, 40,50, 60, 70, 80, 90, 100];
  


  removeFirstAndLast = () => {
      numbers.shift();
      numbers.pop();
      
  }
  console.log(numbers);

  removeFirstAndLast();


  let users = ['Ali', 'Vali', 'Hasan', 'Husan', 'Olim', 'Mirzo', 'Bunyod'];

  function checkUser(){
      console.log(users.includes('Hasan'));
  }
      
