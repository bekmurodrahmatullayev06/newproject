[
  {
    id: 1,
    title: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 59.99,
    stock: 120,
    rating: 4.5,
    inStock: true,
  },
  {
    id: 2,
    title: "Smart Watch Series 7",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    rating: 4.8,
    inStock: true,
  },
  {
    id: 3,
    title: "Ergonomic Office Chair",
    category: "Furniture",
    price: 149.5,
    stock: 15,
    rating: 4.2,
    inStock: true,
  },
  {
    id: 4,
    title: "Stainless Steel Water Bottle",
    category: "Accessories",
    price: 19.99,
    stock: 200,
    rating: 4.7,
    inStock: true,
  },
  {
    id: 5,
    title: "Running Shoes Sport",
    category: "Footwear",
    price: 79.99,
    stock: 0,
    rating: 4.4,
    inStock: false,
  },
  {
    id: 6,
    title: "Cotton Oversized Hoodie",
    category: "Clothing",
    price: 35.0,
    stock: 80,
    rating: 4.3,
    inStock: true,
  },
  {
    id: 7,
    title: "Mechanical Gaming Keyboard",
    category: "Electronics",
    price: 89.99,
    stock: 30,
    rating: 4.9,
    inStock: true,
  },
  {
    id: 8,
    title: "Non-Stick Frying Pan",
    category: "Kitchenware",
    price: 25.5,
    stock: 65,
    rating: 4.1,
    inStock: true,
  },
  {
    id: 9,
    title: "LED Desk Lamp with USB Port",
    category: "Home Decor",
    price: 29.99,
    stock: 50,
    rating: 4.6,
    inStock: true,
  },
  {
    id: 10,
    title: "Leather Backpack",
    category: "Accessories",
    price: 65.0,
    stock: 25,
    rating: 4.4,
    inStock: true,
  },
  {
    id: 11,
    title: "Yoga Mat with Carrying Strap",
    category: "Fitness",
    price: 22.0,
    stock: 90,
    rating: 4.7,
    inStock: true,
  },
  {
    id: 12,
    title: "Portable Power Bank 20000mAh",
    category: "Electronics",
    price: 45.0,
    stock: 110,
    rating: 4.8,
    inStock: true,
  },
  {
    id: 13,
    title: "Ceramic Coffee Mug Set",
    category: "Kitchenware",
    price: 18.5,
    stock: 40,
    rating: 4.2,
    inStock: true,
  },
  {
    id: 14,
    title: "Classic Denim Jacket",
    category: "Clothing",
    price: 55.0,
    stock: 10,
    rating: 4.5,
    inStock: true,
  },
  {
    id: 15,
    title: "Wireless Gaming Mouse",
    category: "Electronics",
    price: 49.99,
    stock: 75,
    rating: 4.6,
    inStock: true,
  },
];

// const price = products.filter((product) => {
//   return product.price > 50;
// });

// console.log(price);

// const filteredProducts = products.filter((product) => {
//   return product.price > 50;
// });

// console.log(filteredProducts);

console.log("--- 1. Qimmat mahsulotlar ---");
products
  .filter((item) => item.price > 50)
  .forEach((item) => {
    console.log(item.title + " - $" + item.price);
  });

// --- 2. Ombordagi umumiy tovarlar soni ---
let totalStock = 0;
products.forEach((item) => {
  totalStock += item.stock;
});
console.log("\n--- 2. Jami stock ---");
console.log(totalStock);

// --- 3. Barcha mahsulot nomlarini chiqarish ---
console.log("\n--- 3. Barcha mahsulot nomlari ---");
products.forEach((item) => {
  console.log(item.title);
});

// --- 4. Faqat nomlar massivi ---
console.log("\n--- 4. Faqat nomlardan iborat massiv ---");
const titles = products.map((item) => item.title);
console.log(titles);