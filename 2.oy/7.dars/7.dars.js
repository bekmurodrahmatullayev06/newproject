// // //javascript kutmaydi hech narsani.


// // const promise1 = new promise((resolve, reject) => {
// //     setTimeout(() => {
// //         resolve("something went wrong");
// //     }, 4000);
// // });

// // const promise2 = new promise((resolve, reject) => {
// //     setTimeout(() => {
// //         resolve("something went wrong");
// //     }, 4000);
// // });

// // async function main() {
// //     console.log("bajarilmoqda");
// //         const result1 = await promise1;
// //         const result2 = await promise2;


// //         console.log(result1);
// //         console.log(result2);
    
// //         console.log(bajarilmoqda2);
// //     };

// //     main();



// async function getProducts(){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             resolve("something went wrong1");
//         }, 2000);
//     });
// };

// async function getUsers() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("something went wrong2");
//     }, 2000);
//   });
// };

// async function getImages() {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve("something went wrong3");
//     }, 2000);
//   });
// };

// async function handlePromises(){
//     const promise = await Promise.all([getProducts(), getUsers(), getImages()]);


    
//     console.log(promise[0]);
//     console.log(promise[1]);
//     console.log(promise[2]);
// }

// handlePromises();



const container = document.getElementById("users-container");


async function fetchUsers() {
    const response = await fetch("https://dummyjson.com/users");
    const data = await response.json();


    data.users.forEach((user, index, array) => {
        container.innerHTML +=`
        <div>
            <h2>${user.name}</h2>
            <p>${user.email}</p>
            <p>${user.phone}</p>
        </div>`
        
    });
}

fetchUsers();