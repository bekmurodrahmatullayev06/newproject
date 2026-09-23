   
   function CourseCard({ coursecard, duration, price }) {
    return (
      <div className="course">
        <h2>{coursecard}</h2>
        <h4>Duration <span>{props.duration}hours</span></h4>
        <h4>Price <span>{props.price}$</span></h4>
        <p>Duration: {duration}</p>
        <p>Price: {price}</p>
      </div>
    );
  }