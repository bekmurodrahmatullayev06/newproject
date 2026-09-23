// interface Person {
//     name: string;
//     username: string;
//     age: number;
//    getfullinfo: () =>void;

// };

// type User = {
//     name: string;
//     username: string;
//     age: number;
//     getfullinfo: () =>void;
// };

// type idType = number | string | symbol;

// const userId: idType = Symbol('salom');
// const userId: idType = Symbol("salom");
// const userId: idType = Symbol("salom");



// interface Person {
//     fullname: string;
//     job: string;
//     age: number;
//     hasFamily?: boolean;
//}

// interface student extends Person {
//     unversity: string;
// }



// type student = Person & {
//     unversity: string;
// }

// const student: student = {
//     fullname: "Rahmatullayev Bekmurod",
//     job: "Frontend Developer",
//     age: 20,
//     unversity: "TATU",
// };

// function shouDate(data: student){
//     console.log(data.fullname);
//     console.log(data.job);
//     console.log(data.age);
//     console.log(data.unversity);
// }



function test<T>(value: T): T[]{
  return [value];
}



























































































































































// 1. Umumiy mahsulot interfeysi
// interface BaseProduct {
//   id: number | string;
//   name: string;
//   price: number;
//   inStock: boolean;
//   rating: number; // 0..5
// }

// // 2. Kengaytirilgan maxsus interfeyslar
// interface PhoneProduct extends BaseProduct {
//   category: 'phone';
//   storage: string;
//   ram: string;
// }

// interface LaptopProduct extends BaseProduct {
//   category: 'laptop';
//   storage: string;
//   ram: string;
//   processor: string;
// }

// interface ClothingProduct extends BaseProduct {
//   category: 'clothing';
//   size: 'S' | 'M' | 'L' | 'XL' | 'XXL';
//   color: string;
// }

// // 3. Umumiy Product tipi
// type Product = PhoneProduct | LaptopProduct | ClothingProduct;

// // 4. Foydalanishga misollar
// const products: Product[] = [
//   {
//     id: "p1",
//     name: "iPhone 15",
//     price: 899,
//     category: "phone",
//     inStock: true,
//     rating: 4.8,
//     storage: "128GB",
//     ram: "6GB"
//   },
//   {
//     id: "l1",
//     name: "MacBook Air M2",
//     price: 1199,
//     category: "laptop",
//     inStock: true,
//     rating: 4.9,
//     storage: "512GB",
//     ram: "16GB",
//     processor: "M2"
//   },
//   {
//     id: "c1",
//     name: "Hoodie",
//     price: 45,
//     category: "clothing",
//     inStock: false,
//     rating: 4.3,
//     size: "XL",
//     color: "Black"
//   }
// ];