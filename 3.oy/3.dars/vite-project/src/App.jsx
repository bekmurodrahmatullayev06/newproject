// import { useState,  } from "react";

// function App() {
//   const [counter, setCounter] = useState(0);

//   const increment = () => {
//     setCounter(counter + 1);
//   };

//   console.log("Component  qayta rendered boldi");
//   console.log("counter: ", counter);

//     return (
//       <div>
//         <h1>Counter: {counter}</h1>
//         <button onClick={increment}>Increment</button>
//       </div>
//     );
// };

// export default App;



// import { use, useState } from "react";

// const ismlar = ["Ali", "Vali", "Hasan", "Husan", "Olim", "G'olib", "Shahzod", "Javohir", "Sardor", "Diyor"];

// function App() {
//   const [counter, setCounter] = useState(0);
//   const [curentName, setName] = useState(ismlar[counter]);


//   const changeName = () => {
//     setCounter (prev => prev + 1);
//   };

//   return (
//     <div>
//       <h1>Ism: {currentName }</h1>
//       <button onClick={changeName}>Change Name</button>
//     </div>
//   );
// }



import { use, useState } from "react";
import  CourseCard  from `./CourseCard`;

  function App() {
    const[ isDark, setIsDark] = useState(false);

    const changeTheme = () => {
      setIsDark(prev => !prev);
    };

    return (
      <div className={isDark ? "dark" : "Light"}>
        <button onClick={changeTheme}>Toggle Theme</button>

        {isDark ? <h1>Dark </h1> : <h1>Light </h1>}
        <CourseCard
        courseName={'Pyton'} 
        duration ={40}
        students={20}
        rating={4.5}
        price={10000}/>
      </div>
    );
  }

