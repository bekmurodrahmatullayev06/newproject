// class person {
//     constructor(name, age, city, hobbies) {
//         this.name = name;
//         this.age = age;
//         this.city = city;
//         this.hobbies = hobbies;
//     }

//     getPersonInfo() {
//         console.log('GetPersonInfo:', `Name: ${this.name}, Age: ${this.age}, City: ${this.city}, Hobbies: ${this.hobbies}`);
//     }
// }


// const person1 = new person('Ali', 35, 'Samarqand', ["swiming", "reading", "coding"]);
// const person2 = new person('Vali', 25, 'Tashkent', ["swiming", "reading", "coding"]);
// const person3 = new person('Sardor', 20, 'Fargona', ["swiming", "reading", "coding"]);

// console.log(person1);
// console.log(person2);
// console.log(person3);

// person1.getPersonInfo();
// person2.getPersonInfo();
// person3.getPersonInfo();



// class person {
//     constructor(name, age, city, hobbies) {
//         this.name = name;
//         this.age = age;
//         this.city = city;
//         this.hobbies = hobbies;
//     }

//     getPersonInfo() {
//         console.log('GetPersonInfo:', `Name: ${this.name}, Age: ${this.age}, City: ${this.city}, Hobbies: ${this.hobbies}`);
//     }
// }

// class Student extends Person {
//     constructor(name, age, city, hobbies, university, startDate, endDate) {
//         super(name, age, city, hobbies);

//         this.university = university;
//         this.startDate = startDate;
//         this.endDate = endDate;
//     }
//         getUnversityInfo() {
//         console.log('getUnversityInfo:', `Name: ${this.name}, Age: ${this.age}, City: ${this.city}, Hobbies: ${this.hobbies}`);
//     }

   
//         getAllInfo() {
//         this.getPersonInfo();
//         this.getUnversityInfo();
//     }
// }


// const student =new Student("Ali", 35, "Samarqand", ["swiming", "reading", "coding"], "TATU", "2022-01-01", "2025-01-01");
// const student2 =new Student("Vali", 25, "Tashkent", ["swiming", "reading", "coding"], "TATU", "2022-01-01", "2025-01-01");

// student.getAllInfo();
// student2.getAllInfo();

// console.log(student);
// console.log(student2);



// shu yerdan pastgi qismini unchalik to'g'ri yozolmadim, tushunmadim


// class user {
//     constructor(name, age, city, hobbies) {
//         this.name = name;
//         this.age = age;
//         this.city = city;
//         this.hobbies = hobbies;
//     }

//     getPersonInfo() {
//         console.log('GetPersonInfo:', `Name: ${this.name}, Age: ${this.age}, City: ${this.city}, Hobbies: ${this.hobbies}`);
//     }
// }

// function createUser(name, age, city, hobbies) {
//     return new user(name, age, city, hobbies);
// }



// class BankAccount {
//     constructor(name, balance) {
//         this.name = name;
//         this.balance = balance;
//     }

//     deposit(amount) {
//         this.balance += amount;
//     }

//     withdraw(amount) {
//         if (this.balance >= amount) {
//             this.balance -= amount;
//         } else {
//             console.log("Not enough balance");
//         }
//     }
// }


class person {
    constructor(name, age, city, hobbies){
        this.name =name;
        this.age = age;
        this.city = city;
        this.hobbies = hobbies;
    }

    getPersonInfo(){ 
        console.log(`GetPersonInfo:`, `Name: ${this.name}, Age: ${this.age}, City: ${this.city}, Hobbies: ${this.hobbies}, Unversty${this.university} `);
    }
}

const person1 = new person('Bobir', 20, 'Samarqand', ['swiming', 'reading', 'coding'], 'Isft');
const person2 = new person('Vali',21, 'jizax',['swiming', 'reading', 'coding'], 'tatu');
const person3 = new person('bekruz', 18, 'Xorazm', ['swiming', 'reading', 'coding'], 'zarmet');

console.log(person1);
console.log(person2);
console.log(person3);

person1.getPersonInfo();
person2.getPersonInfo();
person3.getPersonInfo();


