import Coursecard from "./coursecard";


function Home(){




    return(
        <div className="home">
            <Coursecard coursecard={"javascript course"} duration={"3 month"} price={"100$"} />
            <Coursecard coursecard={"python course"} duration={"6 month"} price={"200$"} />
            <Coursecard coursecard={"react course"} duration={"4 month"} price={"150$"} />
        </div>
    )
}