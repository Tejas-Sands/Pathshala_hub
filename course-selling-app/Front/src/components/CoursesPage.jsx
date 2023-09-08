import {useState , useEffect} from  'react';
import { Typography, Card, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Coursesp from './CourseProp';

export default function CoursePage(){

    const navigate = useNavigate()
//    let {courseId} = useParams();

    const[courses, setCourses] = useState([]);
    useEffect(() => {

        fetch("http://localhost:3000/admin/courses",{
                method:"GET",               
                headers:{
                    "Authorization":"Bearer " + localStorage.getItem("token")
                }
            }).then(call)

        function callback1(data){
           setCourses(data.courses) //added "courses" otherwise was showing map is not a function
        }
        function call(res){
            res.json().then(callback1);
        }
            // username,
            // password
        
        },[setCourses])


    return<> <div style={{
        display:"flex",
        flexWrap:"wrap",
        justifyContent:"stretch",
        //gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        margin:"30px"
        }}>
        {courses.map(course => {
        return <Coursesp course={course} key={course.courseId}/>} // very imp :key={course.courseId}
        )}      
        </div>
        <center><div><Button variant='contained' onClick={()=>{
            navigate('/addcourses')}}>
            Add Courses
        </Button>
        </div>  

        </center>
        {/* <div><Button variant='contained' onClick={()=>{        
                fetch("http://localhost:3000/admin/courses",{
                            method:"GET",               
                            headers:{
                                "Authorization":"Bearer " + localStorage.getItem("token")
                            }
                        }).then(call)
            
                    function callback1(data){
                       setCourses(data.courses) //added "courses" otherwise was showing map is not a function
                    }
                    function call(res){
                        res.json().then(callback1);
                        navigate('/coursespage')
                    }
            }}>
            Add Courses
        </Button>
        </div>  */}
      {/* //did the above stuff for deleting courses?! */}
        </>
}

// function Courses(props){

//     return<> <div >
//     <Card style={{
//         width:"260px",
//         margin:"10px",
//         minHeight:"250px"
//     }}>
//     <div><img src={props.course.imgLink} style={{
//         width:"275px",
//         height:"150px"
//     }}></img>
//     </div>    
//     <div>   
//     <Typography textAlign={'center'} variant='h4'> 
//     {props.course.title}</Typography>  {/*course and not courses because we are sending "course" in map function?! */}
//     <Typography textAlign={'center'} variant='subtitle1'> 
//     {props.course.description}</Typography>
//     <Button variant='contained' onClick={()=>{
        
//     }}>
//     Update Course    
//     </Button>
//     </div>
//     </Card> 
//     </div>
// </>
// }