const user={
    name:"John Doe",
    age:20,
    isMarried:false,
    university:"TATU"


    ,shouData: function(){

     console.log(this);

    
     console.log(`salom,mening ismim` ,this.name, `yoshim`, this.age, `yoshdaman`,this.university , `unverstituda o'qiyman`);


        /*console.log(this.name);
        console.log(this.age);
        console.log(this.isMarried);
        console.log(this.university);*/
    }

    

}

user.shouData();