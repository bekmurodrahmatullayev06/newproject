// let counter = 0;

// let interval =setInterval(()=>{
//     counter++
//     console.log('interval bajirildi',counter);
// } ,1000);

// setTimeout(()=>{
//     clearInterval(interval);
// },5000)



const data = [1,2,3,4,5,6,7,8,9,10];


const promise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        if(data){
            resolve(data);  
        }
        else{
            reject("somethings went wrong");
        }
    } ,2000)
})


promise
.then((value)=>{
    console.log(`1 then`, value);
    return value * value
})
.then((value)=>{
    console.log(`2 then` ,value);
    return value * value
})
.then((value)=>{
    console.log(`result is ${value}` ,value);
    
})




.catch((error)=>{
    console.log(error);
})