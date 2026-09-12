//ball = 59;
//if (ball >= 60) {//
 //   console.log("siz imtihondan o'tdingiz");
//} 
//else {
//    console.log("siz imtihondan o'tmadingiz");
//}


//const ball = prompt("ballingizni kiriting");
//if (ball > 95) {
//    alert("ota onanga rahmat");
//}
//else if (ball >= 80) {
//    alert("yaxshi");
//}
//else if (ball >= 70) {
 //   alert("o'rtacha");
//}
//else if (ball > 60) {
//    alert("qayta topshirish kerak");
//}
//
//else if (ball < 60) {
//    alert("siz imtihondan o'tmadingiz");
//}


for( let i = 1; i <= 100; i++) {
    console.log(i);
};


//let engkatta=0;
//i=1;
for (let i = 1; i <= 100; i++) {
    if (i % 2 == 0) {
        console.log(i);
    }
}





 //(1 holat)
   /*let x=5;
   let y = x++;
   console.log(x);
   console.log(y); */
  


   // (2 holat)
   let x=5;
   let y = ++x;
   console.log(x);
   console.log(y); 
   // teacher shu holatni tushunmadim chunki 1 holatda ishladi bunda esa ikkalsi ham birxil bolib qoldi
   

   /* and ,ni bita belgisini qoysak bitvays aperatirlari deyiladima*/


   let sum = 0;
   for (let i = 1; i <= 100; i++) {
       sum += i;
   }
   console.log( "1 dan 100 gacha sonlar yig'indisi:", +sum);
