//   const users = [ `Ali`, `Vali`, `Hasan`, `Husan` ];

//   users.forEach((user, index, array) => {
//     console.log(array);
//   });


// const users =[ 
//     {id: 1, name: `Ali`},
//     {id: 2, name: `Vali`},
//     {id: 3, name: `Hasan`},
//     {id: 4, name: `Husan`},
//     {id: 5, name: `Husan`},
//     {id: 6, name: `Husan`},


// ];const newArrray = users.filter((user, index, array) => {
//     return value.id % 2 == 0;
// });

// console.log(`new array:`, newArrray);


const users = [
  {
    id: 1,
    name: "Anvar Aliyev",
    age: 25,
    email: "anvar@example.com",
    isActive: true,
  },
  {
    id: 2,
    name: "Malika Karimova",
    age: 30,
    email: "malika@example.com",
    isActive: false,
  },
  {
    id: 3,
    name: "Jasur Tursunov",
    age: 22,
    email: "jasur@example.com",
    isActive: true,
  },
  {
    id: 4,
    name: "Sherali Jorayev",
    age: 57,
    email: "sherali@example.com",
    isActive: false,
  },
  {
    id: 5,
    name: "Ismoilov Begzod",
    age: 17,
    email: "ismoil@example.com",
    isActive: true,
  },
  {
    id: 6,
    name: "Aliyev Tohir",
    age: 27,
    email: "aliyev@example.com",
    isActive: true,
  },
];

// const newArrray = users.filter((user, index, array) => {
//     return user.isActive === true;
// });

// console.log(`new array:`, newArrray);

 const newArrray = users.reduce((son, user) => {
     const age = user.age;
     return son + age;
 }, 0);

 console.log(`yoshlarni yig'indisi:`, newArrray);