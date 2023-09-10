import  {useState , React, useEffect} from 'react'; 
import { Typography, Card , Button} from '@mui/material';
import { useParams } from 'react-router-dom';

export default function UserCourse(){

//    let {courseId} = useParams();

    const[courses, setCourses] = useState([]);
    useEffect(() => {
        function callback1(data){
           setCourses(data.courses) //added "courses" otherwise was showing map is not a function
        }
        function call(res){
            res.json().then(callback1);
        }
            // username,
            // password
            fetch("https://back-5wxx.onrender.com/users/courses",{
                method:"GET",
               
                headers:{
                    "Authorization":"Bearer " + localStorage.getItem("token")
                }
            }).then(call)
        },[])


    return <div style={{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"stretch",
        // gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        margin:"30px"
        }}>
        {courses.map(course => {
        return <Courses course={course}/>}
        )}      
        </div>  
}

function Courses(props){

    return<> <div >
    <Card style={{
        width:"260px",
        margin:"11px",
        minHeight:"250px",
        backgroundColor:'lightgray'
    }}>
    <div><img src={props.course.imgLink} style={{
        width:"275px",
        height:"150px"
    }}></img>
    </div>    
    <div >   
    <Typography textAlign={'center'} variant='h4'> 
    {props.course.title}</Typography>  {/*course and not courses because we are sending "course" in map function?! */}
    <Typography textAlign={'center'} variant='subtitle1'> 
    {props.course.description}</Typography>
    <Typography style={{
        display:'flex',
        justifyContent:'space-evenly',
        marginBottom:'6px'
    }}>
    <Button size='small' variant='outlined'>Purchase</Button>
    <Button size='small' variant='outlined'>More Info</Button>
    </Typography>
    </div>
    </Card> 
    </div>
</>
}
