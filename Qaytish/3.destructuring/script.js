// const user1 = {
//     fullname: "John Doe",
//     username: "johndoe",
//     email: "1Eo9s@example.com",
//     country: "USA",
//     age: 30,
//     isAdmin: false
// };

// const { fullname, username, email, country, age, isAdmin } = user1;

// console.log(fullname);
// console.log(username);
// console.log(email);
// console.log(country);
// console.log(age);
// console.log(isAdmin);


function calc() {
    return {
        sum1: function (a) {
            return a * 2;
        },
        sum2: function (a) {
            return a * 4;
        }
    };
}

const { sum1, sum2} = calc(); 



console.log(sum1(4));//8
console.log(sum2(4));//16