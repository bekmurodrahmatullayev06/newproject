//const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

// const result = nums.map(( value, index, array) => {
//     return value ** 2;
// });

// console.log( result);

// const nums = [
//   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
// ];
// const result = nums.filter(( value, index, array) => {
//     return value % 2 === 0;
// });

// console.log( result);

//


// narxi 85 ga teng bolgan prodaklarni toping
//2.narxlari 100 dan kichik bolgan va stockdan bolmagan producktlarni 








const products = [ 
    { id: 1, name: "iPhone 15", category: "Electronics", price: 999, inStock: true }, 
    { id: 2, name: "Samsung TV 55\"", category: "Electronics", price: 750, inStock: false }, 
    { id: 3, name: "Nike Air Max", category: "Shoes", price: 120, inStock: true }, 
    { id: 4, name: "Adidas Hoodie", category: "Clothing", price: 85, inStock: true }, 
    { id: 5, name: "MacBook Pro", category: "Electronics", price: 2499, inStock: true }, 
    { id: 6, name: "Coffee Maker", category: "Kitchen", price: 60, inStock: false }, 
    { id: 7, name: "Running Shoes", category: "Shoes", price: 95, inStock: true }, 
    { id: 8, name: "Wireless Mouse", category: "Electronics", price: 45, inStock: true }, 
    { id: 9, name: "Yoga Mat", category: "Sports", price: 30, inStock: false }, 
    { id: 10, name: "Denim Jacket", category: "Clothing", price: 110, inStock: true }, 
];

{
const result = products.find((value)=>{
    return value.price == 85
});
console.log(result);
}

{
const result = products.filter((value)=>{
    return value.price < 100 && !value.inStock
});
console.log(result);
}

{
const result = products.find((value) => {
  return value.price  < 100;
});
console.log(result);
}

// {
//     const result=products.map((inStock) =>{
//     return value.inStock
//   })

//   console.log(result)
// }


{
    const result=products.filter((value)=>{
        return value.id%2===0
    })

    console.log(result);
    
}






