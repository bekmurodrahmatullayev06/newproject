// 1-masala — Arrow Function
{
  const add = (a, b) => a + b;
  console.log("1-masala:", add(5, 7)); // 12
}

// 2-masala — Template Literal
{
  const name = "Temur";
  const age = 16;
  const city = "Samarqand";

  const text = `Mening ismim ${name}, yoshim ${age} da va men ${city}da yashayman.`;
  console.log("2-masala:", text);
}

// 3-masala — Array Destructuring
{
  const fruits = ["Apple", "Banana", "Orange"];
  const [first, , third] = fruits;

  console.log("3-masala:", first); // Apple
  console.log("3-masala:", third); // Orange
}

// 4-masala — Object Destructuring
{
  const user = {
    name: "Ali",
    age: 20,
    job: "Frontend Developer",
  };

  const { name, job } = user;
  console.log("4-masala:", name); // Ali
  console.log("4-masala:", job); // Frontend Developer
}

// 5-masala — Spread Operator
{
  const fruits = ["Apple", "Banana"];
  const vegetables = ["Carrot", "Potato"];

  const combined = [...fruits, ...vegetables];
  console.log("5-masala:", combined); // ["Apple", "Banana", "Carrot", "Potato"]
}

// 6-masala — Default Parameter
{
  const greet = (name = "Guest") => `Hello, ${name}!`;

  console.log("6-masala:", greet()); // Hello, Guest!
  console.log("6-masala:", greet("Temur")); // Hello, Temur!
}

// 7-masala — Arrow Function + Template Literal
{
  const introduce = (name, job) => `My name is ${name} and I am a ${job}.`;

  console.log("7-masala:", introduce("Temur", "Frontend Developer"));
}

// 8-masala — Destructuring + Template Literal
{
  const user = {
    name: "Temur",
    age: 16,
    country: "Uzbekistan",
  };

  const getInfo = ({ name, age, country }) =>
    `${name} is ${age} years old and lives in ${country}.`;

  console.log("8-masala:", getInfo(user));
}

// 9-masala — Spread Operator + Object
{
  const user = {
    name: "Ali",
    age: 20,
  };

  const updatedUser = { ...user, job: "Developer" };

  console.log("9-masala:", updatedUser);
}

// 10-masala — Spread Operator + Object Override
{
  const user = {
    name: "Ali",
    age: 20,
    city: "Tashkent",
  };

  const updatedUser = { ...user, age: 25 };

  console.log("10-masala:", updatedUser);
}

// 11-masala — Array Destructuring + Default Value
{
  const colors = ["red", "blue"];
  const [first, second, third = "green"] = colors;

  console.log("11-masala: first", first); // red
  console.log("11-masala: second", second); // blue
  console.log("11-masala: third", third); // green
}

// 12-masala — Function + Object Destructuring
{
  const createUser = ({ name, age, role }) =>
    `${name} is ${age} and works as ${role}.`;

  console.log(
    "12-masala:",
    createUser({
      name: "Temur",
      age: 16,
      role: "Frontend",
    }),
  );
}

// 13-masala — Spread Operator + Function
{
  const numbers = [10, 20, 30];
  const sum = (a, b, c) => a + b + c;

  console.log("13-masala:", sum(...numbers)); // 60
}

// 14-masala — Default Parameter + Template Literal
{
  const makeProduct = (name, price = 0) => `Product: ${name}, Price: $${price}`;

  console.log("14-masala:", makeProduct("Laptop", 1200));
  console.log("14-masala:", makeProduct("Laptop"));
}

// 15-masala — Object Destructuring + Rest Operator
{
  const user = {
    name: "Temur",
    age: 16,
    country: "Uzbekistan",
    job: "Frontend Developer",
    experience: 1,
  };

  const { name, age, ...rest } = user;

  console.log("15-masala (name):", name); // Temur
  console.log("15-masala (age):", age); // 16
  console.log("15-masala (rest):", rest);
}

// 16-masala — Array Destructuring + Rest Operator
{
  const numbers = [10, 20, 30, 40, 50];

  const [first, second, ...others] = numbers;

  console.log("16-masala (first):", first); // 10
  console.log("16-masala (second):", second); // 20
  console.log("16-masala (others):", others); // [30, 40, 50]
}

// 17-masala — Spread + Destructuring + Template Literal
{
  const user = {
    name: "Ali",
    age: 20,
  };

  const additionalInfo = {
    job: "Frontend Developer",
    city: "Tashkent",
  };

  const fullUser = { ...user, ...additionalInfo };
  const { name, age, job, city } = fullUser;

  const result = `${name} is ${age} years old, works as ${job} and lives in ${city}.`;

  console.log("17-masala:", result);
}

// 18-masala — Default Parameter + Object Destructuring
{
  const createProfile = ({ name, age = 18, job = "Student" }) =>
    `${name} is ${age} years old and is a ${job}.`;

  console.log("18-masala (1):", createProfile({ name: "Temur" }));
  console.log(
    "18-masala (2):",
    createProfile({ name: "Ali", age: 25, job: "Developer" }),
  );
}

// 19-masala — Bir nechta mavzuni birlashtirish
{
  const users = [
    { name: "Ali", age: 20, job: "Frontend" },
    { name: "Vali", age: 22, job: "Backend" },
    { name: "Hasan", age: 19, job: "Designer" },
  ];

  console.log("19-masala:");
  const formattedUsers = users.map(
    ({ name, age, job }) => `${name} — ${age} — ${job}`,
  );
  formattedUsers.forEach((info) => console.log(info));
}

// 20-masala — Boss Level
{
  const createProduct = (...args) => {
    const defaultDetails = { price: 0, brand: "Unknown" };

    const inputDetails = {
      name: args[0],
      ...(args[1] !== undefined && { price: args[1] }),
      ...(args[2] !== undefined && { brand: args[2] }),
    };

    const product = { ...defaultDetails, ...inputDetails };
    const { name, price, brand } = product;

    return `Product: ${name}\nPrice: $${price}\nBrand: ${brand}`;
  };

  console.log("20-masala (to'liq):");
  console.log(createProduct("iPhone", 1000, "Apple"));
  console.log("---");
  console.log("20-masala (standart qiymat):");
  console.log(createProduct("iPhone"));
}
