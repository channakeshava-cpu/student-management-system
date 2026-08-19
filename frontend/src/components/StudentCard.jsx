function StudentCard(props){
    return(
        <div>
            <h3>{props.name}</h3>
            <p>Department: {props.department}</p>
            <p>CGPA:{props.cgpa}</p>
        </div>
    );
}

export default StudentCard;